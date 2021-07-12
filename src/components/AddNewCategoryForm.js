import { Input, Form, message, Modal } from "antd";
import React from "react";

import axios from "axios";

const AddNewCategoryForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  //addbook to api
  const onCreate = async (values) => {
    await axios
      .put(
        `https://bookmanagement-api.azurewebsites.net/api/categories/add-category?categoryName=${values.categoryName}`
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Add category success!");
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error("Error while adding category...");
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
      width={600}
      visible={visible}
      title="Add a category"
      okText="Add Category"
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
        name="add-new-category-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          categoryName: "",
        }}
      >
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCategoryForm;
