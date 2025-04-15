import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import noimage from "/noimage.jpg";
import Dropdown from "./partials/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("movie");
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-screen  bg-[#1F1E24] pb-[5%]">
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-100 flex gap-10 text-xl items-center">
        <Link
          className=" hover:text-[#6556CD] ri-arrow-left-line"
          onClick={() => navigate(-1)}
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part 2 image */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-35vh]  object-cover "
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : noimage
            }
            alt=""
          />

          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
          <div className=" text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-400 my-5">
              Personal Information
            </h1>
            <h1 className="text-lg font-semibold text-zinc-400 ">Known for</h1>
            <h1 className="text-zinc-400 ">
              {info.detail.known_for_department}
            </h1>

            <h1 className="text-lg font-semibold text-zinc-400  mt-3">
              Gender
            </h1>
            <h1 className="text-zinc-400 ">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-lg font-semibold text-zinc-400 mt-3">
              Birthday
            </h1>
            <h1 className="text-zinc-400 ">{info.detail.birthday}</h1>

            <h1 className="text-lg font-semibold text-zinc-400 ">Deathday</h1>
            <h1 className="text-zinc-400 ">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}{" "}
            </h1>

            <h1 className="text-lg font-semibold text-zinc-400 ">
              Place of Birth
            </h1>
            <h1 className="text-zinc-400 ">{info.detail.place_of_birth}</h1>

            <h1 className="text-lg font-semibold text-zinc-400 ">
              Also Known As
            </h1>
            <h1 className="text-zinc-400 ">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>
        {/* part 3 right info */}

        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl font-black text-zinc-400 my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl font-semibold text-zinc-400 ">Biography</h1>

          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-lg font-semibold text-zinc-400 ">Known For</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="text-lg font-semibold text-zinc-400 ">Acting</h1>

            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] mt-5 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                  <p className="inline">
                    {" "}
                    {c.name || c.title || c.original_name || c.original_title}
                  </p>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
