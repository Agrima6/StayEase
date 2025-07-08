import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/StayEase`)
    } catch(error){
        console.log(error.)
    }
}