import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate} from 'react-router-dom'




const FeaturedDestination = () => {
  const navigate= useNavigate()

  return (
    <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 py-10'>

   <Title title='Featured Destination' subTitle ='Discover the perfect getaway for your next adventure' />

   <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
{roomsDummyData.slice(0,4).map((room, index)=>  (
  <HotelCard key={room._id} room={room} index={index} />  
))}
   </div>

   <button onClick={() => {
  navigate('/rooms');
  setTimeout(() => scrollTo(0, 0), 50); // Give time for navigation
}}

   className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>
    View All Destinations
   </button>
    </div>
  )
}

export default FeaturedDestination

