import User from "../models/User.js";

// middleware to check if user is authenticated


export const protect = async (req, res, next)=>{
    const{userId} = req.auth;
    if(!userId){
        res.jason({success: false, message: "Not Authenticated"} )
    }
    else{
        const user = await User.findById(userId);
        req.user = user;
        next();
       
    }
}