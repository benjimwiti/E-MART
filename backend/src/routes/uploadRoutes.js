import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { deletePreviousProductPhoto } from "../controllers/uploadController.js";

const router = express.Router();

router
    .post("/", uploadImage);

router
    .route('/:productId')
    .delete(deletePreviousProductPhoto)

export default router;
