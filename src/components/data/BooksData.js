import React from "react";
import { Table, Divider, Tag } from "antd";
import axios from 'axios';
import { useState, useEffect } from 'react'


const BooksData = () => {
    const [data, setData] = useState([]);


    //get data from server

    useEffect(() =>{
        axios.get(`https://60c86676afc88600179f6f3e.mockapi.io/books/1`)
        .then(res => {
            
            const books = res.data;
            
            //setData(books)
            console.log(books)
        })
    })


  const columns = [
  {
    title: 'Book Title',
    dataIndex: data.title,
    key: data.title,
    render: text => <p>{data.title}</p>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    // render: tags => (
    //   <span>
    //     {tags.map(tag => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </span>
    // ),
  },
  {
    title: 'Action',
    key: 'action',
    // render: (text, record) => (
    //   <span>
    //     <button>Invite {record.name}</button>
    //     <Divider type="vertical" />
    //     <button>Delete</button>
    //   </span>
    // ),
  },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];



  return <Table dataSource={data} columns={columns} />;
};

export default BooksData;
