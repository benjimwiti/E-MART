import path from 'path'
import fs, { promises as fsPromises } from 'fs'
import { dirname1, dirname2 } from "../utils/dirname.js";

export const configureUploadPath = async (folderName) => {
    const __dirname = dirname2()
    console.log(__dirname)
    const uploadPath = path.join(__dirname, 'src', 'uploads', folderName)
    try {
        if (!fs.existsSync(uploadPath)) {
            await fsPromises.mkdir(uploadPath)
        }
    } catch (err) {
        console.log(err)
    }
    return uploadPath
}

export const unlinkImageFile = async (image) => {
    try {
        const __dirname = dirname1(import.meta.url)
        const productImageFileDir = path.join(__dirname, "..", "uploads", "product-images")
        const productImageFilepath = path.join(productImageFileDir, image)
        await fsPromises.unlink(productImageFilepath)
        console.log(`deleting`, image)
        return `successfull`
    } catch (error) {
        return `unsuccessfull ; ${error.message}`
    }
}