import React from "react";
import Banner from "./Banner";
import "../css/MovieList.css";
import MovieCards from "./MovieCards";
import { useSelector } from "react-redux";

const MovieList = () => {
  const openSidebar = useSelector((state) => state.sidebar.openSidebar);
  return (
    <>
      <div
        className={`${openSidebar ? "container large-container" : "container"}`}
      >
        <Banner />
        <div className="list_container">
          <MovieCards />
        </div>
      </div>
    </>
  );
};

export default MovieList;
