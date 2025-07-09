// npm i express dotenv cors mongoose cloudinary multer svix
import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'

connectDB()

const app =express();
app.use(cors()); // Enable cross origin resource shairing

// Middleware
app.use(express.json())
app.use(clerkMiddleware())



app.get('/', (req, res)=>res.send("API is working !"))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));