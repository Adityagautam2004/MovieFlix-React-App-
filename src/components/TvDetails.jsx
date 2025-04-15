import React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvactions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";

function TvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${
          info.detail.backdrop_path || info.detail.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top-[10%]",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[140vh] px-[10%] "
    >
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-100 flex gap-10 text-xl items-center">
        <Link
          className=" hover:text-[#6556CD] ri-arrow-left-line"
          onClick={() => navigate(-1)}
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>
      {/* part 2 poster and details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh]  object-cover "
          src={
            info.detail.poster_path ||
            info.detail.backdrop_path ||
            info.detail.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.poster_path || info.detail.backdrop_path
                }`
              : noimage
          }
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mb-10 mt-3 flex items-center gap-x-5">
            <span className=" bg-yellow-600 text-white rounded-full p-1 text-xl font-semibold w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((genre) => genre.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mt-5">overiew</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-5">Languages</h1>
          <p className="mb-10">{info.translation.join(", ")}</p>

          <Link
            className="rounded-lg p-5 bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="mr-3 text-xl ri-play-fill"></i> {""}Play Trailer
          </Link>
        </div>
      </div>
      {/* part 3 watch options */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((item, index) => (
              <img
                key={index}
                title={item.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md mr-10 shadow-lg "
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent {"   "}</h1>
            {info.watchproviders.rent.map((item, index) => (
              <img
                title={item.provider_name}
                key={index}
                className="w-[5vh] h-[5vh] object-cover rounded-md mr-10 shadow-lg "
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.rent.map((item, index) => (
              <img
                title={item.provider_name}
                key={index}
                className="w-[5vh] h-[5vh] object-cover rounded-md mr-10 shadow-lg "
                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* part 4 Seasons*/}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className=" text-3xl font-bold text-white">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {info.detail.seasons.length > 0 ? (
        info.detail.seasons.map((season, index) => (
          <div className="w-[15vh] mr-[8%]" key={index}>
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[30vh] min-w-[14vw]  object-cover "
              src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
              alt=""
            />
            <h1 className="text-2xl text-zinc-300 mt-3 font-semifold">
              {season.name}
            </h1>
          </div>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing To Show
        </h1>
      )}
      </div>

      {/* part 5 Recomendation and similar stuff */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className=" text-3xl font-bold text-white">
        Recommendation & Similar
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
