import { Input, Button } from "antd";
import React from "react";
import BookTable from "./data/BookTable";
import { Link } from "react-router-dom";
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
            <Link to="/addNewBook">
            <Button type="primary" size="default" >
              Add New Book
            </Button>
            </Link>
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
            <BookTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLists;
