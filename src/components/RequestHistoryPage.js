import { Button } from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddNewHistoryForm from "./AddNewHistoryForm";
import AddNewCustomerForm from "./AddNewCustomerForm";
import HistoryTable from "./data/HistoryTable";

const RequestHistoryPage = () => {
  //visible addNewHistoryForm popup
  const [addNewHistoryVisible, setAddNewHistoryVisible] = useState(false);
  //visible addNewCustomerForm popup
  const [addNewCustomerVisible, setaddNewCustomerVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values from form: ", values);
    setAddNewHistoryVisible(false);
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
                onClick={() => setAddNewHistoryVisible(true)}
              >
                Add New History
              </Button>
              <AddNewHistoryForm
                visible={addNewHistoryVisible}
                onCreate={onCreate}
                onCancel={() => {
                  setAddNewHistoryVisible(false);
                }}
              />
            </div>
            <div className="row-btn-add">
              <Button
                type="default"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setaddNewCustomerVisible(true)}
              >
                Add New Customer
              </Button>
              <AddNewCustomerForm
                visible={addNewCustomerVisible}
                onCreate={onCreate}
                onCancel={() => {
                  setaddNewCustomerVisible(false);
                }}
              />
            </div>
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
