import { Input, Button } from "antd";
import React from "react";
import BookTable from "./data/BookTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {
  PlusOutlined
} from "@ant-design/icons";
import AddNewBookForm from './AddNewBookForm'


const BookLists = () => {
  const { Search } = Input;
  //visible addNewBookForm popup
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values from form: ', values);
    setVisible(false);
  };

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
          <div className="row-btn-add">
            
            
            <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />} 
            onClick={() => setVisible(true)}
            >
              Add New Book
            </Button>
            <AddNewBookForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
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
            <BookTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLists;
