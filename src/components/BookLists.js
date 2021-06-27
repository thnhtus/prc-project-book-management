import {
  Input,
  Button,
  Table,
  Divider,
  Tag,
  Space,
  Form,
  Checkbox,
} from "antd";
import React from "react";
// import BookTable from "./data/BookTable";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlusOutlined, EditTwoTone } from "@ant-design/icons";
import AddNewBookForm from "./AddNewBookForm";
import axios from "axios";

const BookLists = () => {
  const [nameSearch, setNameSearch] = useState("");

  //book data
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

  const { Search } = Input;
  //visible addNewBookForm popup
  const [visible, setVisible] = useState(false);

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

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="row-search">
            <Input.Search
              placeholder="Search..."
              className="search-bar"
              size="large"
              allowClear
              // onSearch={(search) => {
              //   //set nameSearch
              //   console.log("curr", search);
              //   setNameSearch(search);
              //   console.log("ns", nameSearch);
              //   console.log("BD", books);
              //   console.log(typeof books);

              //   let i = 1;
              //   const resultSearch = books.map((row) => ({
              //     row.title.includes(nameSearch)
              //   }));

              //   console.log("SD", resultSearch);
              //   if (resultSearch.length === 0) {
              //     console.log("Arr Null!");
              //   }
              // }}
              style={{ width: 600 }}
              enterButton
            />
          </div>
          <div className="row-btn-add">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
            >
              Add New Book
            </Button>
            <AddNewBookForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
        <div className="main-content-row">
          <div className="books-list">
            <div></div>
            <p>Books List</p>
          </div>
        </div>

        <div className="main-content-row">
          <div className="books-table">
            <Table dataSource={books} columns={columns} bordered></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLists;
