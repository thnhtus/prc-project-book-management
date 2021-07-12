import { Input, Form, message, Modal } from "antd";
import React from "react";

import axios from "axios";

const AddNewLanguageForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  //addbook to api
  const onCreate = async (values) => {
    await axios
      .put(
        `https://bookmanagement-api.azurewebsites.net/api/languages/add-language?languageName=` +
          values.languageName
      )
      .then((res) => {
        if (res.status === 200) {
          message.success("Add language success!");
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error("Erorr while adding new language...");
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
      title="Add a new language"
      okText="Add Language"
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
        name="add-new-language-form"
        //onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          languageName: "",
        }}
      >
        <Form.Item
          name="languageName"
          label="Language Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewLanguageForm;
