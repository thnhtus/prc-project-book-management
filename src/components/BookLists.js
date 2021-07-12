import { Button } from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import {} from "react-router-dom";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddNewBookForm from "./AddNewBookForm";
import AddNewCategoryForm from "./AddNewCategoryForm";
import AddNewLanguageForm from "./AddNewLanguageForm";
import BookTable from "./data/BookTable";

const BookLists = () => {
  //visible addNewBookForm popup
  const [addNewBookvisible, setAddNewBookVisible] = useState(false);
  //visible addNewCategoryForm popup
  const [addNewCategoryvisible, setAddNewCategoryVisible] = useState(false);
  //visible addNewLanguageForm popup
  const [addNewLanguagevisible, setAddNewLanguageVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values from form: ", values);
    setAddNewBookVisible(false);
  };

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="row-btn-add-container">
            <div className="row-btn-add">
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setAddNewBookVisible(true)}
              >
                Add New Book
              </Button>
              <AddNewBookForm
                visible={addNewBookvisible}
                onCreate={onCreate}
                onCancel={() => {
                  setAddNewBookVisible(false);
                }}
              />
            </div>
            <div className="row-btn-add">
              <Button
                type="default"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setAddNewCategoryVisible(true)}
              >
                Add Category
              </Button>
              <AddNewCategoryForm
                visible={addNewCategoryvisible}
                onCreate={onCreate}
                onCancel={() => {
                  setAddNewCategoryVisible(false);
                }}
              />
            </div>
            <div className="row-btn-add">
              <Button
                type="default"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setAddNewLanguageVisible(true)}
              >
                Add Language
              </Button>
              <AddNewLanguageForm
                visible={addNewLanguagevisible}
                onCreate={onCreate}
                onCancel={() => {
                  setAddNewLanguageVisible(false);
                }}
              />
            </div>
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
