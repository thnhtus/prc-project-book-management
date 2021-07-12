import React from "react";
import { Table, Tag, Button, Space, Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  EditTwoTone,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import UpdateBookForm from "./UpdateBookForm";

const BookTable = () => {
  //book data fet from api
  const [books, setBooks] = useState([]);

  //selected record data
  const [fields, setFields] = useState();

  //category list
  const [categories, setCategories] = useState([]);

  //language list
  const [languages, setLanguages] = useState([]);

  //visible modal
  const [visible, setVisible] = useState(false);

  //table loading
  const [bookTableLoading, setBookTableLoading] = useState(true);

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

  //search text
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getRandomColor = () => {
    const random = Math.floor(Math.random() * antdColor.length);
    return `${antdColor[random]}`;
  };

  useEffect(() => {
    getData();
    getCategories();
    getLanguages();
  }, []);

  //get books form api
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
        setBookTableLoading(false);
        console.log("Book", books);
      });
  };

  //get category from api
  const getCategories = async () => {
    await axios
      .get(`https://bookmanagementapi2.azurewebsites.net/api/category/all/0/0`)
      .then((res) => {
        setCategories(
          res.data.map((row) => ({
            categoryId: row.categoryId,
            categoryName: row.categoryName,
          }))
        );
      })
      .then((res) => {
        console.log("Cate", categories);
      });
  };

  //get languages from api
  const getLanguages = async () => {
    await axios
      .get(`https://bookmanagementapi2.azurewebsites.net/api/language/all/0/0`)
      .then((res) => {
        setLanguages(
          res.data.map((row) => ({
            languageId: row.languageId,
            languageName: row.languageName,
          }))
        );
      })
      .then((res) => {
        console.log("Lang", languages);
      });
  };

  const onCreate = (values) => {
    console.log("Received values from form: ", values);
    setVisible(false);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={(node) => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
      ...getColumnSearchProps("title"),

      render: (text) => <span style={{ color: "blue" }}>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      ...getColumnSearchProps("author"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: categories.map((category) => ({
        text: category.categoryName,
        value: category.categoryName,
      })),

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
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      render: (category) => {
        let color = "";
        switch (category) {
          case "Politics & Government":
            color = "gold";
            break;
          case "Arts & Photography":
            color = "green";
            break;
          case "Children's Books":
            color = "purple";
            break;
          case "Mystery":
            color = "geekblue";
            break;
          case "Fantasy":
            color = "volcano";
            break;
          case "Romance":
            color = "magenta";
            break;
          default:
            color = "blue";
            break;
        }
        return <Tag color={color}>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
      sorter: (a, b) => a.releaseYear - b.releaseYear,
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
      filters: languages.map((language) => ({
        text: language.languageName,
        value: language.languageName,
      })),
      onFilter: (value, record) => record.language.indexOf(value) === 0,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
      ...getColumnSearchProps("publisher"),
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
      sorter: (a, b) => a.printLength - b.printLength,
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
      sorter: (a, b) => a.price - b.price,
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
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
      <Table
        dataSource={books}
        columns={columns}
        bordered
        loading={{ indicator: <LoadingOutlined />, spinning: bookTableLoading }}
      ></Table>
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
