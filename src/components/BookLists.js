import { Input } from "antd";
import React from "react";
import BooksData from "./data/BooksData";
//
const BookLists = () => {
  const { Search } = Input;

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="row-search">
            <Search
              placeholder="Search..."
              className="search-bar"
              size="large"
              allowClear
              //onSearch={}
              style={{ width: 600 }}
              enterButton
            />
          </div>
        </div>
        <div className="main-content-row">
          <div className="books-list">
            <div></div>
            <p>Books List</p>
          </div>
        </div>

        <div className="main-content-row">
          <div className="books-table">
            <BooksData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLists;
