import React from "react";
//import "./sidebar.css"
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Sidebar({ onSectionChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };


  const userEmail = JSON.parse(localStorage.getItem('currentUser'))?.email;





  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem" onClick={() => onSectionChange("feed")}>
            <DynamicFeedIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <PersonIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Profile</span>
          </li>
          {userEmail === "admin@gmail.com" && (
            <li className="sidebarListItem" onClick={() => onSectionChange("manageUsers")}>
              <ManageAccountsIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Manage Users</span>
            </li>
          )}
          
          {userEmail === "admin@gmail.com" && (
            <li
            className="sidebarListItem"
            onClick={() => onSectionChange("reports")}>
            <CloudDownloadIcon className="sidebarIcon"/>
            <span className="sidebarListItemText"> Reports</span>
            </li>
          )}
          
          <li className="sidebarListItem" onClick={handleLogout}>
            <LogoutIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}