import React from "react";
import Sidebar from "../components/Sidebar";
import MovieList from "../components/MovieList";
import Header from "../components/Header";

const Homepage = () => {
  return (
    <>
      <Sidebar />
      <MovieList />
    </>
  );
};

export default Homepage;
