import { Input, Form, message, Modal } from "antd";
import React from "react";

import axios from "axios";

const AddNewCustomerForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  //addbook to api
  const onCreate = async (values) => {
    await axios
      .put(
        `https://bookmanagement-api.azurewebsites.net/api/customers/add-customer`,
        {
          email: values.email,
          phone: values.phone,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Add new customer success!");
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error("Erorr while adding new customer...");
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
      pattern: /^[\d]{0,10}$/,
      range: "${label} must be less than 10 digits",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <Modal
      width={1000}
      visible={visible}
      title="Add new customer information"
      okText="Add Customer"
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
        name="add-new-customer-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          email: "",
          phone: "",
        }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true, max: 10 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              pattern: /^[\d]{0,10}$/,
              message: "Phone number must be less than 10 digits",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCustomerForm;
