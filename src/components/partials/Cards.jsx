import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg"
function Cards({ data, title }) {
  return (
    <div className="w-full flex flex-wrap ">
      {data.map((item, index) => (
        <Link className="w-[25vh] mr-[5%] mb-[5%]" key={index}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh]  object-cover "
            src={ item.poster_path || item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path || item.profile_path}` : noimage}
            alt=""
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semifold">
            {item.name || item.title || item.original_name || item.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
