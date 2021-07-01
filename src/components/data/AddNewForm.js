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

const AddNewForm = ({ visible, onCancel, selectedRow }) => {
  //data
  const [data, setData] = useState({
    key: selectedRow[0].historyId,
  });

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

  const { Option } = Select;

  //category
  const [categories, setCategories] = useState([]);
  //language

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getCategories();
    getLanguages();
  }, []);

  //get categories from api
  const getCategories = async () => {
    await axios
      .get(
        `https://bookmanagementapi.azurewebsites.net/api/categories/search-categories`
      )
      .then((res) => {
        setCategories(
          res.data.map((row) => ({
            key: row.categoryId,
            name: row.categoryName,
          }))
        );
      })
      .then(() => {
        console.log("DATA", categories);
      });
  };

  //get languages from api
  const getLanguages = async () => {
    await axios
      .get(
        `https://bookmanagementapi.azurewebsites.net/api/languages/search-languages`
      )
      .then((res) => {
        setLanguages(
          res.data.map((row) => ({
            key: row.languageId,
            name: row.languageName,
          }))
        );
      })
      .then(() => {
        console.log("LANG", languages);
      });
  };

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
    console.log("Passed Data", selectedRow);
    console.log(typeof data);
  };

  return (
    <Modal
      width={1000}
      visible={visible}
      title="Add a new book"
      okText="Add Book"
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
      {/* <Form
        form={form}
        {...layout}
        name="add-new-book-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["book", "book-title"]}
          label="Book Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["book", "author"]}
          label="Author"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={["book", "price"]}
          label="Price"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["book", "amount"]}
          label="Amount"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["book", "release-year"]} label="Release Year">
          <DatePicker picker="year" mode="year" />
        </Form.Item>
        <Form.Item
          name={["book", "category"]}
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Category..." style={{ width: "30%" }}>
            {categories.map((category) => (
              <Option key={category.key}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["book", "language"]}
          label="Language"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Language..." style={{ width: "30%" }}>
            {languages.map((language) => (
              <Option key={language.key}>{language.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={["book", "publisher"]} label="Publisher">
          <Input style={{ width: "40%" }} />
        </Form.Item>
        <Form.Item name={["book", "description"]} label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form> */}
      <Button onClick={onClick}>Click!</Button>
    </Modal>
  );
};

export default AddNewForm;
