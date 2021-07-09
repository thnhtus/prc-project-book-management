import { Input, Form, InputNumber, message, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const UpdateBookForm = ({ visible, onCancel, fields }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [fields]);

  //addbook to api
  const onCreate = async (values) => {
    await axios
      .post(
        `https://bookmanagementapi.azurewebsites.net/api/languages/update-book`,
        {
          bookId: values.bookId,
          price: values.price,
          amount: values.amount,
          description: values.description,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Update book success!");
          window.location.reload();
        }
      })
      .catch((error) => {
        message.error("Error while updating book!");
        console.log("Error: ", error.response);
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
      title="Update Book Information"
      okText="Update Book"
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={(e) => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            e.preventDefault();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate failed", info);
          });
      }}
      forceRender
    >
      <Form
        form={form}
        {...layout}
        name="update-book-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={fields}
      >
        <Form.Item name="bookId" label="Book Id" rules={[{ required: true }]}>
          <Input style={{ width: "50%" }} disabled />
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
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBookForm;
