import path from "path";
import multer from "multer";
import { configureUploadPath, unlinkImageFile } from "../services/imageServices.js";
import { dirname1 } from "../utils/dirname.js";
import { findProductById } from "../services/productServices.js"
import { fileURLToPath } from "url";
import { promises as fsPromises } from 'fs'


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadPath = await configureUploadPath(`product-images`)
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});
const uploadSingleImage = upload.single("image");

export const uploadImage = async (req, res) => {
    await uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(500).send({ message: `mutler error; ${err.message}` });
        } else if (req.file) {
            // console.log(req)
            // const deleteConfirmation = await deletePreviousProductPhoto(req.query.productId)
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `${req.file.filename}`,
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    });
}

export const deletePreviousProductPhoto = async (req, res) => {
    const { productId } = req.params
    const product = await findProductById(productId)
    const { name, image } = product
    const status = await unlinkImageFile(image)
    res
        .status(200)
        .json({
            message: `deleting previous ${name} photo is ${status}`
        })
}