import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
    const navigate = useNavigate();
  const [category, setCategory] = React.useState("popular");
  const [person, setPeople] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
    document.title = "Movieflix | People";

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prevState) => [
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
    if(person.length === 0) {
        GetPeople();
    } else {
        setPeople([]);
        setPage(1);
        GetPeople();
    }
    };

    React.useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length>0? (
    <div className="px-[3%] w-screen ">

      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className=" hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => navigate(-1)}
          ></i>{" "}
          People 
          <small>
            <i className="text-[#6556CD] text-sm font-semibold ml-2">({category})</i>
          </small>
        </h1>
        <div className="flex items-center w-[80%]"> 
        <TopNav />
        <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPeople}
        hasMore={hasMore}
        scrollThreshold={0.9}
        className="w-full h-full flex flex-wrap justify-start items-center overflow-auto overflow-x-hidden"
        endMessage={<h1 className="text-2xl text-zinc-400">No more data</h1>}
      loader={<h1>Loading...</h1>}
      >
      <Cards data={person} title="person" />
      </InfiniteScroll>
       

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default People