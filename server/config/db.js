import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/StayEase`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected ✅");

  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1); 
  }
};

export default connectDB;
