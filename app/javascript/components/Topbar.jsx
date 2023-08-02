import React from "react";
import { Search } from "@mui/icons-material";
//import "./topbar.css";
import person from "./images/person.png";
import maze from "./images/maze.jpg";

function Topbar(props) {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <div>
        <img src={maze} alt="" className="topbarImg" />
      </div>
      <span className="logo">Maze</span>
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input placeholder="Search for posts" className="searchInput" />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Timeline</span>

        <img src={person} alt="" className="topbarrightImg" />
      </div>
    </div>
  </div>
);
}

export default Topbar;