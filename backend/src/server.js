/* ================= DEPENDANCIES ==================== */
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

/* ================= UTILS ==================== */
import connectDB from "./config/db.js";
import { registerRoutes } from "./routes/index.js";

/* ================= APP-CONFIG ==================== */
dotenv.config();
connectDB();

//VARIABLES
const port = process.env.PORT || 5000;
const app = express();


/* ================= MIDDLEWARE ==================== */
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= ROUTES ==================== */
registerRoutes(app);

/* ================= APP-LISTENER ==================== */
app.listen(port, () => console.log(`Server's up on port: ${port}`));
