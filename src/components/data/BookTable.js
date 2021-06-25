import React from "react";
import { Table, Divider, Tag, Button, Space } from "antd";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const BookTable = () => {
//book data
const [books, setBooks] = useState([]);

useEffect(() => {
  getData();
}, [])

const getData = async () => {
  await axios.get(`https://bookmanagementapi.azurewebsites.net/api/books/search-books`)
        .then(res => {
          setBooks(res.data.map(row => ({
            key: row.bookId,
            title: row.title,
            category: row.categoryName,
            author: row.author,
            price: row.price,
            amount: row.amount,
            releaseYear: row.releaseYear,
            publisher: row.publisher,
            language: row.languageName
            
          })))
        })
        .then(() => {
          console.log('Book', books)
        })
}





const columns = [
  {
    title: 'Book Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    // sorter: {
    //   compare: (a, b) => a.username.length - b.username.length,
    //   multiple: 3,
    // },
  },
  {
    title: 'Categories',
    dataIndex: 'category',
    key: 'category',
    render: (category) => (
      <>
        {category === 'Romance' && <Tag color="red">{category}</Tag>}
      </>
    ),
  },
  {
    title: 'Languages',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
    render: (publisher) => (
      <>
        {publisher === null ? 
        (<span style={{ color: "red" }} >Unkown</span>) :
        (<span >{publisher}</span>)
        }
      </>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => <p>${text}</p>
  },
  {
    title: 'Amounts',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="danger" icon={<DeleteOutlined />}></Button>
      </Space>
    ),
  },
];


  return <Table dataSource={books} columns={columns} bordered ></Table>;
};

export default BookTable;
