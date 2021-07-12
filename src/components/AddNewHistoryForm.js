import { Input, Form, Select, message, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const AddNewHistoryForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  //category
  const [books, setBooks] = useState([]);
  //language

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getBooks();
    getCustomer();
  }, []);

  //get books from api
  const getBooks = async () => {
    await axios
      .get(`https://bookmanagementapi2.azurewebsites.net/api/book/all/0`)
      .then((res) => {
        setBooks(
          res.data.map((row) => ({
            key: row.bookId,
            bookId: row.bookId,
            title: row.title,
          }))
        );
      })
      .then(() => {
        console.log("DATA", books);
      });
  };

  //get customers from api
  const getCustomer = async () => {
    await axios
      .get(`https://bookmanagementapi2.azurewebsites.net/api/customer/all/0`)
      .then((res) => {
        setCustomers(
          res.data.map((row) => ({
            key: row.customerId,
            customerId: row.customerId,
            email: row.email,
          }))
        );
      })
      .then(() => {
        console.log("LANG", customers);
      });
  };

  //add history to api
  const onCreate = async (values) => {
    await axios
      .put(
        `https://bookmanagementapi.azurewebsites.net/api/histories/add-history`,
        {
          bookId: values.bookId,
          customerId: values.customerId,
          managerUsername: values.managerUsername,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Add history success!");
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error("Error while adding new history!");
        console.log(err.response);
      });
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be greater than ${min}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <Modal
      width={1000}
      visible={visible}
      title="Add a history record"
      okText="Add History"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={(e) => {
        form.validateFields().then((values) => {
          form.resetFields();
          e.preventDefault();
          onCreate(values);
        });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="add-new-book-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          categoryId: "",
          customerId: "",
          mamagerUsername: "",
        }}
      >
        <Form.Item
          name="bookId"
          label="Book Title"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Book Title..." style={{ width: "70%" }}>
            {books.map((book) => (
              <Option key={book.key}>{book.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="customerId"
          label="Customer Email"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Customer Email..." style={{ width: "60%" }}>
            {customers.map((customer) => (
              <Option key={customer.key}>{customer.email}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="managerUsername" label="Manger Username">
          <Input style={{ width: "40%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewHistoryForm;
