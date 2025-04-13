import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
function Movies() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("now_playing");
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
    document.title = "Movieflix | Movies";

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [
            ...prevState,
            ...data.results,
          ]);
            setPage((prevState) => prevState + 1);
        } 
    else {
        setHasMore(false);
    }   
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if(movies.length === 0) {
        GetMovies();
    } else {
        setMovies([]);
        setPage(1);
        GetMovies();
    }
    };

    React.useEffect(() => {
    refreshHandler();
  }, [category]);


  return movies.length>0? (
    <div className="px-[3%] w-screen ">

      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className=" hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => navigate(-1)}
          ></i>{" "}
          Movies 
          <small>
            <i className="text-[#6556CD] text-sm font-semibold ml-2">({category})</i>
          </small>
        </h1>
        <div className="flex items-center w-[80%]"> 
        <TopNav />
        <Dropdown
          title="Category"
          options={[ "now_playing", "upcoming", "top_rated" ,"popular",]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={GetMovies}
        hasMore={hasMore}
        scrollThreshold={0.9}
        className="w-full h-full flex flex-wrap justify-start items-center overflow-auto overflow-x-hidden"
        endMessage={<h1 className="text-2xl text-zinc-400">No more data</h1>}
      loader={<h1>Loading...</h1>}
      >
      <Cards data={movies} title={category} />
      </InfiniteScroll>
       

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default Movies;
