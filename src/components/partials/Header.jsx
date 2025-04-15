import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top-[10%]",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end p-[5%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] text-white mt-3 mb-3">
        {data.overview.slice(0, 200) || data.biography}..
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">
          More
        </Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || data.first_air_date || "No Information "}
        <i className="text-yellow-500 ri-album-fill ml-5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className=" mt-5  text-white ">
        <span className=" p-3 rounded bg-[#6556CD]"> <i className="ri-play-fill"></i> Watch Now</span>
      </Link>
    </div>
  );
}

export default Header;
