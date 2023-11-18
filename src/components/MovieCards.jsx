import React, { useEffect } from "react";
import "../css/MovieCards.css";

import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoBySearch } from "../store/youtubeReducer";

const MovieCards = () => {
  const videos = useSelector((state) => state.youtube.videos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideoBySearch("new hollywood movie"));
  }, []);

  return (
    <>
      {videos?.map((video) => {
        return <MovieCard video={video} />;
      })}
    </>
  );
};

export default MovieCards;
