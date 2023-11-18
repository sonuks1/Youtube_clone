import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/sidebarReducer";
import { useNavigate } from "react-router-dom";
import { fetchVideoBySearch } from "../store/youtubeReducer";
import { logout } from "../store/authReducer";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSidebarMenu = () => {
    navigate("/");
    setOpenSidebar(!openSidebar);
    dispatch(toggleSidebar(openSidebar));
  };

  const handleclick = () => {
    navigate("/");
    dispatch(fetchVideoBySearch(searchValue));
  };

  useEffect(() => {
    handleclick();
  }, []);

  return (
    <>
      <nav className="flex-div">
        <div className="nav_left flex-div">
          <AiOutlineMenu
            className="menu_icon icon"
            onClick={toggleSidebarMenu}
          />
          <BsYoutube className="logo_icon icon" onClick={() => navigate("/")} />
        </div>
        <div className="nav_middle">
          <div className="search_box flex-div">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <AiOutlineSearch onClick={handleclick} />
          </div>
        </div>
        <div className="nav_right flex-div">
          <AiOutlineUser className="icon" />
          <FiLogOut
            className="icon"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
