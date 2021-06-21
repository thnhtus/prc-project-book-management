import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  ReadOutlined,
  UserOutlined,
  AppstoreOutlined,
  BookOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const SideNav = () => {
  return (
    <div className="side-nav">
      <h1 className="logo">
        <ReadOutlined />
        <span>BOOKDASHBOARD</span>
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
          <Link to="/" >
            <li>
              <AppstoreOutlined />
              <span>Overview</span>
            </li>
          </Link>
          <Link to="/bookLists">
            <li>
              <BookOutlined />
              <span>Books List</span>
            </li>
          </Link>
          <Link to="/requestsHistory">
            <li>
              <HistoryOutlined />
              <span>Requests History</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="logout">
        <Button
          className="logout-btn"
          size="large"
          type="danger"
          icon={<LogoutOutlined />}
        >
          <span className="logout-btn-text">LOGOUT</span>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
