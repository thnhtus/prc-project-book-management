import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Modal, message } from "antd";
import {
  ReadOutlined,
  UserOutlined,
  AppstoreOutlined,
  BookOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const SideNav = ({ token, setToken }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure to log out?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        message.success("Logout success");
        sessionStorage.clear();
        window.location.reload();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
          <p className="name">{token.managerUsername.toUpperCase()}</p>
          <p className="user-location">{token.fullname}</p>
        </div>
      </div>
      <div className="sidebar-menu">
        <p className="page">PAGES</p>
        <ul className="sidebar-list">
          <NavLink to="/home" activeClassName="active-link">
            <li>
              <AppstoreOutlined />
              <span>Overview</span>
            </li>
          </NavLink>
          <NavLink to="/bookLists" activeClassName="active-link">
            <li>
              <BookOutlined />
              <span>Books List</span>
            </li>
          </NavLink>
          <NavLink to="/requestsHistory" activeClassName="active-link">
            <li>
              <HistoryOutlined />
              <span>Requests History</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="logout">
        <Button
          className="logout-btn"
          size="large"
          type="danger"
          icon={<LogoutOutlined />}
          onClick={showDeleteConfirm}
        >
          <span className="logout-btn-text">LOGOUT</span>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
