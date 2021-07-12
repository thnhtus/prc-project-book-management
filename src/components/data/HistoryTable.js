import React from "react";
import { Table, Tag, Button, Space, Input, message, Modal } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  EditTwoTone,
  ExclamationCircleOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
//format date
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import Highlighter from "react-highlight-words";

const HistoryTable = () => {
  const { confirm } = Modal;

  //histories data
  const [histories, setHistories] = useState([]);

  //table loading
  const [bookTableLoading, setBookTableLoading] = useState(true);

  //search text
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    getData();
  }, []);

  //get histories from api
  const getData = async () => {
    await axios
      .get(
        `https://bookmanagementapi.azurewebsites.net/api/histories/search-histories`
      )
      .then((res) => {
        var i = 1;

        setHistories(
          res.data.map((row) => ({
            rowIndex: i++,
            key: row.historyId,
            historyId: row.historyId,
            bookId: row.bookId,
            bookTitle: row.bookTitle,
            customerId: row.customerId,
            email: row.email,
            phone: row.phone,
            managerUsername: row.managerUsername,
            borrowDate: row.borrowDate,
            returnDate: row.returnDate,
            status: row.returnDate !== null ? "Returned" : "Not Return Yet",
          }))
        );
      })
      .then(() => {
        setBookTableLoading(false);
        console.log("History", histories);
      });
  };

  //show confirm update history
  function showConfirm(record) {
    confirm({
      title: "Update Return Date",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to update return date for this history?",
      async onOk() {
        // bookTableLoading(true);
        let id = record.historyId;
        await axios
          .post(
            "https://bookmanagementapi.azurewebsites.net/api/histories/update-history?historyId=" +
              id
          )
          .then((res) => {
            if (res.status === 200) {
              message.success("Update return date success!");
              //window.location.reload();
              setBookTableLoading(true);
              getData();
            }
          })
          .catch((error) => {
            message.error("Error while updating return date!");
            console.log(error);
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  }

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
    },
    {
      title: "History ID",
      dataIndex: "historyId",
      key: "historyId",
      width: "22%",
      ...getColumnSearchProps("historyId"),
      render: (text) => <span style={{ fontWeight: 700 }}>{text}</span>,
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
      width: "17%",
      ...getColumnSearchProps("bookTitle"),
    },
    // {
    //   title: "Manager Username",
    //   dataIndex: "managerUsername",
    //   key: "managerUsername",
    //   width: "5%",
    //   // sorter: {
    //   //   compare: (a, b) => a.username.length - b.username.length,
    //   //   multiple: 3,
    //   // },
    //   render: (text) => (
    //     <span style={{ fontStyle: "italic", color: "#3377ff" }}>{text}</span>
    //   ),
    // },
    {
      title: "Customer Information",
      children: [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          ...getColumnSearchProps("email"),
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          ...getColumnSearchProps("phone"),
          render: (phone) => (
            <>
              {phone == null ? (
                <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
              ) : (
                <span>{phone}</span>
              )}
              {phone === "" && (
                <span style={{ color: "red", fontWeight: 700 }}>Unkown</span>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Borrow Date",
      dataIndex: "borrowDate",
      key: "borrowDate",
      sorter: (a, b) =>
        moment(a.borrowDate).unix() - moment(b.borrowDate).unix(),
      render: (date) => (
        <Moment format="YYYY-MM-DD" style={{ fontWeight: 700 }}>
          {date}
        </Moment>
      ),
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      sorter: (a, b) =>
        moment(a.returnDate).unix() - moment(b.returnDate).unix(),
      render: (date) => (
        <>
          {date !== null ? (
            <Moment format="YYYY-MM-DD" style={{ fontWeight: 700 }}>
              {date}
            </Moment>
          ) : (
            <span style={{ color: "red", fontWeight: 700 }}>Null</span>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Returned",
          value: "Returned",
        },
        {
          text: "Not Return Yet",
          value: "Not Return Yet",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text) => (
        <>
          {text === "Not Return Yet" ? (
            <Tag color="red">{text}</Tag>
          ) : (
            <Tag color="green">{text}</Tag>
          )}
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<EditTwoTone />}
            onClick={() => showConfirm(record)}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={histories}
        columns={columns}
        bordered
        loading={{ indicator: <LoadingOutlined />, spinning: bookTableLoading }}
      ></Table>
    </>
  );
};

export default HistoryTable;
