
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import ManageUsers from "./ManageUsers";

export default () => {
  const [isManageUsersPage, setIsManageUsersPage] = useState(false);
  console.log("isManageUsersPage:", isManageUsersPage);

  return (
    <>
      
      <Topbar />
      <div className="welcomeContainer">
        <Sidebar setIsManageUsersPage={setIsManageUsersPage} />
        {isManageUsersPage ? <ManageUsers /> : <Feed />}
        <Rightbar />
      </div>
    </>
  );
};