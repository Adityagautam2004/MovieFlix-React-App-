import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("all");
  const [duration, setDuration] = React.useState("day");
  const [trending, setTrending] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [
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
    if(trending.length === 0) {
        GetTrending();
    } else {
        setTrending([]);
        setPage(1);
        GetTrending();
    }
    };

    React.useEffect(() => {
    refreshHandler();
  }, [category, duration]);


  return trending.length>0? (
    <div className="px-[3%] w-screen ">

      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className=" hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => navigate(-1)}
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]"> 
        <TopNav />
        <Dropdown
          title="Category"
          options={["tv", "movie", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>

        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        scrollThreshold={0.9}
        className="w-full h-full flex flex-wrap justify-start items-center overflow-auto overflow-x-hidden"
        endMessage={<h1 className="text-2xl text-zinc-400">No more data</h1>}
      loader={<h1>Loading...</h1>}
      >
      <Cards data={trending} title={category} />
      </InfiniteScroll>
       

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default Trending;
