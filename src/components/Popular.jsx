import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
function Popular() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("movie");
  const [popular, setPopular] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
    document.title = "Movieflix | Popular";

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setPopular((prevState) => [
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
    if(popular.length === 0) {
        GetPopular();
    } else {
        setPopular([]);
        setPage(1);
        GetPopular();
    }
    };

    React.useEffect(() => {
    refreshHandler();
  }, [category]);


  return popular.length>0? (
    <div className="px-[3%] w-screen ">

      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className=" hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => navigate(-1)}
          ></i>{" "}
          Popular
        </h1>
        <div className="flex items-center w-[80%]"> 
        <TopNav />
        <Dropdown
          title="Category"
          options={["tv", "movie",]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        scrollThreshold={0.9}
        className="w-full h-full flex flex-wrap justify-start items-center overflow-auto overflow-x-hidden"
        endMessage={<h1 className="text-2xl text-zinc-400">No more data</h1>}
      loader={<h1>Loading...</h1>}
      >
      <Cards data={popular} title={category} />
      </InfiniteScroll>
       

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default Popular;
