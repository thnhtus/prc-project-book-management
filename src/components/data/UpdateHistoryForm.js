import {
  Input,
  Button,
  Form,
  InputNumber,
  Select,
  Popconfirm,
  message,
  Modal,
  DatePicker,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const UpdateHistoryForm = ({ visible, onCancel, fields }) => {
  //data
  //const [data, setData] = useState(fields);

  useEffect(() => form.resetFields(), []);

  //generate to store data from input
  const addBookData = [
    {
      categoryId: "",
      title: "",
      author: "",
      price: 0,
      amount: 0,
      printLength: 0,
      releaseYear: 0,
      publisher: "",
      description: "",
      languageId: "",
    },
  ];

  const [form] = Form.useForm();

  //addbook to api
  const onCreate = (values) => {
    console.log("Values: ", values);
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

  const onFinish = (values: any) => {
    console.log(values);
  };

  //show data
  const onClick = () => {
    console.log("Passed Data", fields);
    console.log(fields.key);
  };

  return (
    <Modal
      width={1000}
      visible={visible}
      title="Update Request History"
      okText="Update History"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate failed", info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="add-new-book-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={fields}
      >
        <Form.Item
          name="historyId"
          label="History Id"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item name="bookId" label="Book Id" rules={[{ required: true }]}>
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name="bookTitle"
          label="Book Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerId"
          label="Customer Id"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input style={{ width: "45%" }} />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input style={{ width: "45%" }} />
        </Form.Item>
        <Form.Item
          name="managerUsername"
          label="Manager Username"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "45%" }} />
        </Form.Item>
        <Form.Item name={["book", "borrowDate"]} label="Borrow Date">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item name={["book", "returnDate"]} label="Return Date">
          <DatePicker picker="date" />
        </Form.Item>
      </Form>
      <button onClick={onClick}>Click me!</button>
    </Modal>
  );
};

export default UpdateHistoryForm;
