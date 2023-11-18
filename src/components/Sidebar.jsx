import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiMoviePlay, BiSolidBusiness } from "react-icons/bi";
import {
  BsFillFileEarmarkMusicFill,
  BsFillStopwatchFill,
} from "react-icons/bs";
import "../css/Sidebar.css";
import "../css/MovieList.css";
import { useDispatch, useSelector } from "react-redux";
import { FaGamepad } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";
import { fetchVideoBySearch } from "../store/youtubeReducer";

const Sidebar = () => {
  const sidebarData = [
    { icon: <AiFillHome />, title: "Home" },
    { icon: <BiMoviePlay />, title: "Movie" },
    { icon: <BsFillFileEarmarkMusicFill />, title: "Music" },
    { icon: <FaGamepad />, title: "Game" },
    { icon: <LiaSchoolSolid />, title: "Career" },
    { icon: <BiSolidBusiness />, title: "Business" },
  ];
  const openSidebar = useSelector((state) => state.sidebar.openSidebar);
  const dispatch = useDispatch();

  const handlelinkclick = (val) => {
    dispatch(fetchVideoBySearch(val));
  };

  useEffect(() => {
    handlelinkclick("react");
  }, []);

  return (
    <>
      <div className={`${openSidebar ? "sidebar small-sidebar" : "sidebar"}`}>
        <div className="sidebar_links">
          {sidebarData.map((data) => (
            <Link
              className="link"
              to="/"
              onClick={() =>
                handlelinkclick(data.title === "Home" ? "reactjs" : data.title)
              }
            >
              <span className="sidebar_icon"> {data.icon} </span>
              <p>{data.title}</p>
            </Link>
          ))}
          <Link className="link" to="/watchlist">
            <span className="sidebar_icon">
              {" "}
              <BsFillStopwatchFill />{" "}
            </span>
            <p>Watch List</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
