import React from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import "../css/MovieList.css";
import MovieCard from "../components/MovieCard";

const WatchList = () => {
  const openSidebar = useSelector((state) => state.sidebar.openSidebar);
  const watchlist = useSelector((state) => state.watchlist.watchList);

  return (
    <div>
      <Sidebar />
      <>
        <div
          className={`${
            openSidebar ? "container large-container" : "container"
          }`}
        >
          <div className="list_container">
            {watchlist?.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "70vh",
                }}
              >
                Add video to Watch Later
              </div>
            )}
            {watchlist?.map((video) => (
              <>
                <MovieCard video={video} />
              </>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default WatchList;
