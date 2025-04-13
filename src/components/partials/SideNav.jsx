import React from 'react'
import { Link } from 'react-router-dom'



function SideNav() {

  return (
    <div className='w-[20%] h-full  border-r-2 border-zinc-400 p-3 ' >
        <h1 className='text-2xl text-white font-bold m'>
            <i className="text-[#6556CD] ri-tv-fill text-2xl mr-2 "></i>
            <span className='text-2xl'>MovieFlix</span>
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds </h1>
            <Link  to={"/trending"} className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"> <i className="ri-fire-fill"></i>Trending</Link>
            <Link  to={"/popular"} className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"> <i className="ri-bard-fill"></i> Popular</Link>
            <Link  to={"/movie"} className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="ri-movie-2-fill"></i> Movies</Link>
            <Link to={"/tv"} className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="ri-tv-2-fill"></i> Tv Shows</Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"> <i className="ri-team-fill"></i> People </Link>
        </nav>
        <hr className='border-none h-[1px] bg-zinc-400'/>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information </h1>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"> <i className="ri-information-fill"></i> About MovieFlix</Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="ri-phone-fill"></i>Contact</Link>
           
        </nav>
    </div>
  )
}

export default SideNav