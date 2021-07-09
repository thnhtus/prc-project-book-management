import { Button } from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddNewHistoryForm from "./AddNewHistoryForm";
import HistoryTable from "./data/HistoryTable";

const RequestHistoryPage = () => {
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
              Add New History
            </Button>
            <AddNewHistoryForm
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
            <p>Histories List</p>
          </div>
        </div>

        <div className="main-content-row">
          <div className="books-table">
            <HistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHistoryPage;
