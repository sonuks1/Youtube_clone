import React from "react";
import "../css/MovieStream.css";
import MovieCards from "../components/MovieCards";
import PlayVideo from "../components/PlayVideo";

const MovieStream = () => {
  return (
    <>
      <div className="moviestream">
        <div className="row">
          <PlayVideo />
          <div className="right-sidebar">
            <MovieCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieStream;
