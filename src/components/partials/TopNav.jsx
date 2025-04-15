import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

function TopNav() {
  const [query, setQuery] = React.useState("");
  const [searches, setSearches] = React.useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[16%]">
      <i className=" text-zinc-400 text-3xl ri-search-2-line"></i>{" "}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className=" cursor-pointer text-zinc-400 text-3xl ri-close-line"
        ></i>
      )}
      <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto left-[5%]">
        {searches &&
          searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300  duration-300 text-zinc-600 font-semi-bold  w-[100%] p-10 flex justify-start item-center border-b-2 border-zinc-100 "
             
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-10 shadow-lg "
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className="mt-8 ">
                {s.name || s.title || s.original_name || s.original_title}{" "}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default TopNav;
