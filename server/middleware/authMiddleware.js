// middleware/authMiddleware.js
import { clerkClient } from '@clerk/clerk-sdk-node'; // Add this
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        let user = await User.findById(userId);

        // If user not found in DB, create from Clerk directly
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);
            const newUser = {
                _id: clerkUser.id,
                username: clerkUser.firstName + clerkUser.lastName,
                email: clerkUser.emailAddresses[0].emailAddress,
                image: clerkUser.imageUrl,
                role: "user",
                recentSearchedCities: []
            };
            user = await User.create(newUser);
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
