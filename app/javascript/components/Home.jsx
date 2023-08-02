import React from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import Login from "./Login";
import Register from "./Register";

export default () => (
    <>
    {/* <Login/> */}
    {/* <Register/> */}
    <Topbar />
    <div className="welcomeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  </>
);