import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Input, Form, message, Button } from "antd";
import image from "./logo/3630156.jpg";

const LoginPage = ({ setToken }) => {
  //call login api
  const handleLogin = async (username, password) => {
    await axios
      .post(`https://bookmanagementapi.azurewebsites.net/api/login`, {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("Login success!");
          setToken(res.data);
          window.location.reload();
        }
      })
      .catch((error) => {
        message.error("Cannot login, incorrect username or password!");
        console.log(error);
      });
  };

  const onFinish = (values) => {
    handleLogin(values.username, values.password);
  };

  return (
    <div className="login-container">
      <div className="inner">
        <img src={image} alt=""></img>
        <div className="inner-form">
          <h1>
            Sign in to <span>Dashboard</span>
          </h1>
          <Form className="login-form" onFinish={onFinish}>
            <label className="label-username">
              <p>Username</p>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </label>
            <label className="label-password">
              <p>Password</p>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </label>
            <div className="submit-btn">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginPage;
