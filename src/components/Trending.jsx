import React from "react";
import TopNav from "./partials/TopNav";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("all");
  const [duration, setDuration] = React.useState("day");
  const [trending, setTrending] = React.useState([]);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

    React.useEffect(() => {
    GetTrending();
  }, [category, duration]);


  return trending.length>0? (
    <div className="px-[3%] w-screen h-screen">

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

      <Cards data={trending} title={category} />

    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default Trending;
