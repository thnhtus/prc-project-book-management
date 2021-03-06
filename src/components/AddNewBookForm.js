import {
  Input,
  Form,
  InputNumber,
  Select,
  message,
  Modal,
  DatePicker,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";

const AddNewBookForm = ({ visible, onCancel }) => {
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
        `https://bookmanagement-api.azurewebsites.net/api/categories/search-categories`
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
        `https://bookmanagement-api.azurewebsites.net/api/languages/search-languages`
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
  const onCreate = async (values) => {
    await axios
      .put(
        `https://bookmanagement-api.azurewebsites.net/api/languages/add-book`,
        {
          categoryId: values.category,
          title: values.bookTitle,
          author: values.author,
          price: values.price,
          amount: values.amount,
          printLength: values.printLength,
          releaseYear: values.releaseYear !== 0 ? parseInt(moment(values.releaseYear).format("YYYY")) : 0,
          publisher: values.publisher,
          description: values.description,
          languageId: values.language,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Add book success!");
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error("Cannot add book!");
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
      title="Add a new book"
      okText="Add Book"
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
          title: "",
          author: "",
          price: 0,
          amount: 0,
          printLength: 0,
          releaseYear: 0,
          publisher: "",
          description: "",
          languageId: "",
        }}
      >
        <Form.Item
          name="bookTitle"
          label="Book Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="printLength"
          label="Print Length"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="releaseYear" label="Release Year">
          <DatePicker picker="year" mode="year" />
        </Form.Item>
        <Form.Item
          name="category"
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
          name="language"
          label="Language"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Language..." style={{ width: "30%" }}>
            {languages.map((language) => (
              <Option key={language.key}>{language.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="publisher" label="Publisher">
          <Input style={{ width: "40%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewBookForm;
