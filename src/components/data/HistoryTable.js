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
  message,
  Modal,
} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateHistoryForm from "./UpdateHistoryForm";
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
//format date
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";

const HistoryTable = () => {
  const { confirm } = Modal;

  //selected row data
  const [fields, setFields] = useState();
  //histories data
  const [histories, setHistories] = useState([]);

  //visible modal
  const [visible, setVisible] = useState(false);

  //table loading
  const [bookTableLoading, setBookTableLoading] = useState(true);

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
      title: "History ID",
      dataIndex: "historyId",
      key: "historyId",
      width: "22%",
      render: (text) => <span style={{ fontWeight: 700 }}>{text}</span>,
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
      width: "17%",
      // sorter: {
      //   compare: (a, b) => a.username.length - b.username.length,
      //   multiple: 3,
      // },
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
          //   render: (category) => (
          //     <>
          //       {category !== null && (
          //         <Tag color="volcano">{category.toUpperCase()}</Tag>
          //       )}
          //     </>
          //   ),
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
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
