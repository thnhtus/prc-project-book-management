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
import UpdateBookForm from "./UpdateBookForm";

const BookTable = () => {
  //book data fet from api
  const [books, setBooks] = useState([]);

  //selected record data
  const [fields, setFields] = useState();

  //visible modal
  const [visible, setVisible] = useState(false);

  //category tag color
  const antdColor = [
    "red",
    "volcano",
    "orange",
    "gold",
    "yellow",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
    "magenta",
  ];

  //category list
  const cateList = {};

  const getRandomColor = () => {
    const random = Math.floor(Math.random() * antdColor.length);
    return `${antdColor[random]}`;
  };

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
            bookId: row.bookId,
            title: row.title,
            category: row.categoryName,
            author: row.author,
            price: row.price,
            amount: row.amount,
            printLength: row.printLength,
            releaseYear: row.releaseYear,
            publisher: row.publisher,
            language: row.languageName,
            description: "",
          }))
        );
      })
      .then((res) => {
        console.log("Book", books);
      });
  };

  const onCreate = (values) => {
    console.log("Received values from form: ", values);
    setVisible(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "rowIndex",
      key: "rowIndex",
      width: "1%",
      render: (text) => <span style={{ fontWeight: 700 }}>{text}</span>,
    },
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",

      render: (text) => <span style={{ color: "blue" }}>{text}</span>,
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
      // render: (category) => (
      //   <>
      //     {/* {category !== null && (
      //       <Tag color="volcano">{category.toUpperCase()}</Tag>
      //     )} */}
      //     {() => {
      //       let color = "";
      //       if (category !== null) {
      //         color = getRandomColor();
      //       }
      //       return <Tag color={color}>{category.toUpperCase()}</Tag>;
      //     }}
      //   </>
      // ),
      render: (category) => {
        let color = "";
        if (category !== null) {
          color = getRandomColor();
        }
        return <Tag color={color}>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
      render: (releaseYear) => (
        <>
          {releaseYear === 0 ? (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          ) : (
            <span>{releaseYear}</span>
          )}
          {releaseYear === "" && (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          )}
          {releaseYear === null && (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
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
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          ) : (
            <span>{publisher}</span>
          )}
          {publisher === "" && (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          )}
        </>
      ),
    },
    {
      title: "Print Length",
      dataIndex: "printLength",
      key: "printLength",
      render: (printLength) => (
        <>
          {printLength === 0 ? (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          ) : (
            <span>{printLength}</span>
          )}
          {printLength === "" && (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          )}
          {printLength === null && (
            <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
          )}
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
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
          <Button
            type="default"
            icon={<EditTwoTone />}
            onClick={() => {
              setFields(record);
              setVisible(true);
            }}
          >
            Update
          </Button>
          {/* <Button
            onClick={() => {
              const randomColor = getRandomColor();
              console.log(randomColor);
            }}
          >
            Click me!
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={books} columns={columns} bordered></Table>
      <UpdateBookForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        fields={fields}
      />
    </>
  );
};

export default BookTable;
