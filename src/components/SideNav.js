import React from "react";
import { Link } from "react-router-dom";
import {
  ReadOutlined,
  UserOutlined,
  AppstoreOutlined,
  BookOutlined,
  HistoryOutlined
} from "@ant-design/icons";
const SideNav = () => {
  return (
    <div className="side-nav">
      <h1 className="logo">
        <ReadOutlined />
        <span>BookDashboard</span>
      </h1>
      <div className="user-infor">
        <div className="user-image">
          <UserOutlined className="user-outlined" />
        </div>
        <div className="user-name">
          <p className="name">Admin</p>
          <p className="user-location">HCM city</p>
        </div>
      </div>
      <div className="sidebar-menu">
        <p className="page">PAGES</p>
        <ul className="sidebar-list">
          <Link to="/">
            <li>
              <AppstoreOutlined />
              <span>Overview</span>
            </li>
          </Link>
          <Link to="/booklists">
            <li>
              <BookOutlined />
              <span>Books List</span>
            </li>
          </Link>
          <Link to="/requestshistory">
            <li>
              <HistoryOutlined />
              <span>Requests History</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="logout">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default SideNav;
