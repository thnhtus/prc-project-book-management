import React from "react";
import { Table, Divider, Tag } from "antd";
import axios from 'axios';
import { useState, useEffect } from 'react'


const BookTable = () => {

const [data, setData] = useState([]);

useEffect(() => {
  getData();
}, [])

const getData = async () => {
  await axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
          setData(res.data.map(row => ({
            key: row.id,
            name: row.name,
            username: row.username,
            email: row.email,
            
            
          })))
        })
}





const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    key: 'username',
    sorter: {
      compare: (a, b) => a.username.length - b.username.length,
      multiple: 3,
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];


  return <Table dataSource={data} columns={columns} bordered ></Table>;
};

export default BookTable;
