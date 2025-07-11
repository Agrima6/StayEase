import Hotel from "../models/Hotel";

// api to create a new room for hotel
export const createRoom = async (req, res)=> {
 try{
const {roomType, pricePerNight, amenities} = req.body;
const hotel = await Hotel.findOne({owner: req.auth.userId})

if(!hotel) return res.json({ success: false, message: "No Hotel Found"});



 }catch(error){

 }
}

// api to get all room

export const getRooms = async (req, res)=> {

}

// api to get room for specific hotel

export const getOwnerRooms = async (req, res)=> {

}

// api to toggle availability of a room

export const toggleRoomAvailability = async (req, res)=> {

}