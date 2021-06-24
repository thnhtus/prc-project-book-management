import {
  Input,
  Button,
  Form,
  InputNumber,
  Select,
  Popconfirm,
  message,
  Modal,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const AddNewBookForm = ({ visible, onCreate, onCancel }) => {
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
        `https://cors-anywhere.herokuapp.com/https://bookmanagementapi.azurewebsites.net/api/categories/search-categories`
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
        `https://cors-anywhere.herokuapp.com/https://bookmanagementapi.azurewebsites.net/api/languages/search-languages`
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

  //popup function
  // const cancel = (e) => {
  //   console.log(e);
  //   message.error("Click on Cancel");
  // };

  // const confirm = (e) => {
  //   console.log(e);
  //   message.success("Click on Confirm");
  // };

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
      <Form
        form={form}
        {...layout}
        name="add-new-book-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "book-title"]}
          label="Book Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "author"]}
          label="Author"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "price"]}
          label="Price"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "amount"]}
          label="Amount"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "release-year"]}
          label="Release Year"
          rules={[{ type: "number", min: 0, max: 99999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "category"]}
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Category...">
            {categories.map((category) => (
              <Option key={category.key}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["user", "language"]}
          label="Language"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Language...">
            {languages.map((language) => (
              <Option key={language.key}>{language.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Publisher">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Description">
          <Input.TextArea />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default AddNewBookForm;
