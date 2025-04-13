import React from "react";
import { Link } from "react-router-dom";


export default function HorizontalCards({ data }) {
  return (

      <div className="w-[100%] flex  overflow-y-hidden mb-5 p-5">
        {data.map((d, i) => (
          <div key={i} className="min-w-[15%] bg-zinc-900 mr-5 mb-5">
            <img
              className="w-full h-[55%] object-cover "
              src={`https://image.tmdb.org/t/p/original${
                d.backdrop_path || d.poster_path
              }`}
              alt=""
            />
            <div className="text-white p-3 h-[45%] ">
            <h1 className="text-xl font-semibold">
              {d.name ||
                d.title ||
                d.original_name ||
                d.original_title}
            </h1>
            <p className="">
              {d.overview.slice(0, 50) || d.biography}..
              <span to="" className="text-zinc-400">
                More
              </span>
            </p>
            </div>
           
          </div>
        ))}
      </div>
  );
}
