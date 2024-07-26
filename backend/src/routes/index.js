import express from 'express'
import path from 'path'
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import orderRoutes from "./orderRoutes.js";
import { fileURLToPath } from 'url';

export const registerRoutes = (app) => {
    app.use("/", (req, res, next) => {
        console.log(req.method, req.url)
        next()
    })

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const productImagePath = path.join(__dirname, "..", "uploads", "product-images")

    app.use("/uploads/product-images", express.static(productImagePath));
    app.use("/api/users", userRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/orders", orderRoutes); /* aggregation by gpt */

    app.get("/health", (req, res) => {
        res.status(200).json({ message: "Server is running properly" });
    });

    app.get("/api/config/paypal", (req, res) => {
        res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
    });

} 