import { Input, Button, Form, InputNumber, Select } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const AddNewBookPage = () => {
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
    labelCol: { span: 8 },
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
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="books-list">
            <div></div>
            <p>Add Book Form</p>
          </div>
        </div>

        <div className="main-content-row">
          <div className="add-book-form">
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "age"]}
                label="Age"
                rules={[{ type: "number", min: 0, max: 99 }]}
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
              <Form.Item name={["user", "website"]} label="Website">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "introduction"]} label="Introduction">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" style={{ margin: "0 8px" }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBookPage;
