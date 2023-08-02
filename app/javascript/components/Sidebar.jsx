import React from "react";
//import "./sidebar.css"
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <DynamicFeedIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <PersonIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem">
            <ManageAccountsIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Manage Users</span>
          </li>
          <li className="sidebarListItem" onClick={handleLogout}>
            <LogoutIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}