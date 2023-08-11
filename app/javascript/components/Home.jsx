
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";

export default () => {
  const [activeSection, setActiveSection] = useState("feed"); // Default active section is "feed"

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

 

  return (
    <>
      
      <Topbar />
      <div className="welcomeContainer">
      <Sidebar onSectionChange={handleSectionChange} />
        {/* Render the appropriate component based on the active section */}
        {activeSection === "feed" && <Feed />}
        {activeSection === "reports" && <Reports />}
        {activeSection === "manageUsers" && <ManageUsers />}
        <Rightbar />
      </div>
    </>
  );
};