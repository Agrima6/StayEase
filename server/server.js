import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors()); // ✅ Enable CORS

// ✅ Stripe webhook route must be before express.json()
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ JSON parser for all other routes
app.use(express.json());

// ✅ Clerk middleware after express.json()
app.use(clerkMiddleware());

// ✅ Clerk webhook
app.use("/api/clerk", clerkWebhooks);

// ✅ Your normal routes
app.get('/', (req, res) => res.send("API is working!"));
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
