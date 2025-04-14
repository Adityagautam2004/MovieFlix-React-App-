import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Notfound from "../Notfound";

function Trailer() {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    console.log(ytvideo);
  return  (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
        
        <Link
          className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]"
          onClick={() => navigate(-1)}
        ></Link>
        {ytvideo?(
            <ReactPlayer 
            width={1300}       
            height={750}
            controls
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`} 
          />
        ):(
           <Notfound/>
        )}
       
    </div>
  )
}

export default Trailer;
