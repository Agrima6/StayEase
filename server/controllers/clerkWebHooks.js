import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try{
        //created a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        // getting header
        const header = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],



        };
        // verifying header
        await whook.verify(JSON.stringify(req.body), header);
        // getting data from request body
        const {data , type} = req.body;

      const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        username: data.first_name + " " + data.last_name,
        image: data.image_url,
      }
      // Switch case for difefrent events
// getting these events in case from clerk
      switch(type) {
        case "user.created":{
            await User.create(userData)
            break;
        }

         case "user.updated":{
            await User.findByIdAndUpdate(data.id, userData)
            break;
        }

          case "user.deleted":{
            await User.findByIdAndDelete(data.id)
            break;
        }
        res.json({success: true, message: "WebHook Recieved"})

        default:
            break;
      }

    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message })

    }
}

export default clerkWebhooks