// npm i express dotenv cors mongoose cloudinary multer svix
import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js";

connectDB()

const app =express();
app.use(cors()); // Enable cross origin resource shairing

// Middleware
app.use(express.json())
app.use(clerkMiddleware())


// api to listen clerk webhook

app.use("/api/clerk", clerkWebhooks);


app.get('/', (req, res)=>res.send("API is working !"))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import User from "./models/User.js"; // correct relative path

app.get('/test-insert', async (req, res) => {
  try {
    const newUser = new User({
      _id: "test123",
      username: "TestUser",
      email: "test@example.com",
      image: "https://example.com/image.jpg",
      role: "user",
      recentSearchedCities: ["Delhi", "Mumbai"]
    });

    await newUser.save();
    res.send("User inserted and MongoDB is working!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});
