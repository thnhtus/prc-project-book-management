import React from "react";
import { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";

const NavBar = () => {
  var date = new Date();
  const [dateTime, setDateTime] = useState(
    date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  return (
    <div className="nav-bar">
      <div className="nav-bar-link">
        <span>
          {/* <a href="#">Link</a> */}
        </span>
      </div>
      <div className="nav-bar-date-time">
        <CalendarOutlined />
        <span>{dateTime}</span>
      </div>
    </div>
  );
};

export default NavBar;
