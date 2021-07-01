import React from "react";
import {
  Table,
  Divider,
  Tag,
  Button,
  Space,
  Form,
  Input,
  Checkbox,
} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";

const BookTable = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`https://bookmanagementapi.azurewebsites.net/api/books/search-books`)
      .then((res) => {
        var i = 1;

        setBooks(
          res.data.map((row) => ({
            rowIndex: i++,
            key: row.bookId,
            title: row.title,
            category: row.categoryName,
            author: row.author,
            price: row.price,
            amount: row.amount,
            releaseYear: row.releaseYear,
            publisher: row.publisher,
            language: row.languageName,
          }))
        );
      })
      .then(() => {
        console.log("Book", books);
      });
  };

  const columns = [
    {
      title: "",
      dataIndex: "rowIndex",
      key: "rowIndex",
      width: "1%",
    },
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      // sorter: {
      //   compare: (a, b) => a.username.length - b.username.length,
      //   multiple: 3,
      // },
    },
    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <>
          {category !== null && (
            <Tag color="volcano">{category.toUpperCase()}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Languages",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      render: (publisher) => (
        <>
          {publisher == null ? (
            <span style={{ color: "red" }}>Unkown</span>
          ) : (
            <span>{publisher}</span>
          )}
          {publisher === "" && <span style={{ color: "red" }}>Unkown</span>}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Amounts",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <>
          {text === 0 ? (
            <span style={{ fontWeight: 700, color: "red" }}>{text}</span>
          ) : (
            <span style={{ fontWeight: 700 }}>{text}</span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          <Button type="default" icon={<EditTwoTone />}>
            Update
          </Button>
          {/* <Button type="danger" icon={<DeleteOutlined />}></Button> */}
        </Space>
      ),
    },
  ];

  return <Table dataSource={books} columns={columns} bordered></Table>;
};

export default BookTable;
