import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
function Tvshows() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("airing_today");
  const [tv, setTv] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
    document.title = "Movieflix | Tv";

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevState) => [
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
    if(tv.length === 0) {
        GetTv();
    } else {
        setTv([]);
        setPage(1);
        GetTv();
    }
    };

    React.useEffect(() => {
    refreshHandler();
  }, [category]);


  return tv.length>0? (
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
          options={["on_the_air", "top_rated" ,"popular", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        scrollThreshold={0.9}
        className="w-full h-full flex flex-wrap justify-start items-center overflow-auto overflow-x-hidden"
        endMessage={<h1 className="text-2xl text-zinc-400">No more data</h1>}
      loader={<h1>Loading...</h1>}
      >
      <Cards data={tv} title={category} />
      </InfiniteScroll>
       

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default Tvshows;
