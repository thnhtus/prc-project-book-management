import { Button } from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import {} from "react-router-dom";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddNewBookForm from "./AddNewBookForm";
import BookTable from "./data/BookTable";

const BookLists = () => {
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
          <div className="row-search"></div>
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
