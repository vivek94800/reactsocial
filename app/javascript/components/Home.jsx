
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";

export default () => {
  const [isManageUsersPage, setIsManageUsersPage] = useState(false);
  const [isReportsPage, setIsReportsPage] = useState(false); 
  console.log("isManageUsersPage:", isManageUsersPage);

  return (
    <>
      
      <Topbar />
      <div className="welcomeContainer">
      <Sidebar
          setIsManageUsersPage={setIsManageUsersPage}
          setIsReportsPage={setIsReportsPage} // Pass setIsReportsPage to Sidebar
        />
        {isManageUsersPage ? (
          <ManageUsers />
        ) : isReportsPage ? ( // Render Reports component when isReportsPage is true
          <Reports />
        ) : (
          <Feed />
        )}
        <Rightbar />
      </div>
    </>
  );
};