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
} from "@ant-design/icons";
//format date
import Moment from "react-moment";
import "moment-timezone";

const HistoryTable = () => {
  const { confirm } = Modal;

  //selected row data
  const [fields, setFields] = useState();
  //histories data
  const [histories, setHistories] = useState([]);

  //visible modal
  const [visible, setVisible] = useState(false);

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
          }))
        );
      })
      .then(() => {
        console.log("History", histories);
      });
  };

  //update return date
  const updateReturnDate = (historyId) => {
    // await axios
    //   .post(
    //     `https://bookmanagementapi.azurewebsites.net/api/histories/update-history`,
    //     {
    //       historyId: historyId,
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       message.success("Update return date success!");
    //     }
    //   })
    //   .catch((error) => {
    //     message.error("Error while updating return date!");
    //     console.log(error);
    //   });
    console.log(historyId);
  };

  //show confirm update history
  function showConfirm(record) {
    confirm({
      title: "Update Return Date",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to update return date for this history?",
      async onOk() {
        await axios
          .post(
            `https://bookmanagementapi.azurewebsites.net/api/histories/update-history`,
            {
              historyId: record.historyId,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              message.success("Update return date success!");
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
      width: "20%",
      render: (text) => <span style={{ fontWeight: 700 }}>{text}</span>,
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
      // sorter: {
      //   compare: (a, b) => a.username.length - b.username.length,
      //   multiple: 3,
      // },
    },
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
      render: (date) => <Moment format="YYYY-MM-DD">{date}</Moment>,
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (date) => (
        <>
          {date !== null ? (
            <Moment format="YYYY-MM-DD">{date}</Moment>
          ) : (
            <span style={{ color: "red", fontWeight: 700 }}>Null</span>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (date) => (
        <>
          {date === null ? (
            <Tag color="red">Not Returned Yet</Tag>
          ) : (
            <Tag color="green">Returned</Tag>
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
      <Table dataSource={histories} columns={columns} bordered></Table>
    </>
  );
};

export default HistoryTable;
