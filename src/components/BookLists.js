import {
  Input,
  Button,
  Table,
  Divider,
  Tag,
  Space,
  Form,
  Checkbox,
} from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlusOutlined, EditTwoTone } from "@ant-design/icons";
import AddNewBookForm from "./AddNewBookForm";
import BookTable from "./data/BookTable";

const BookLists = () => {
  const [nameSearch, setNameSearch] = useState("");

 

  const { Search } = Input;
  //visible addNewBookForm popup
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values from form: ", values);
    setVisible(false);
  };

  

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="row-search">
            <Input.Search
              placeholder="Search..."
              className="search-bar"
              size="large"
              allowClear
              // onSearch={(search) => {
              //   //set nameSearch
              //   console.log("curr", search);
              //   setNameSearch(search);
              //   console.log("ns", nameSearch);
              //   console.log("BD", books);
              //   console.log(typeof books);

              //   let i = 1;
              //   const resultSearch = books.map((row) => ({
              //     row.title.includes(nameSearch)
              //   }));

              //   console.log("SD", resultSearch);
              //   if (resultSearch.length === 0) {
              //     console.log("Arr Null!");
              //   }
              // }}
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
