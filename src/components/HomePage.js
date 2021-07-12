import React from "react";
import TotalChart from "./data/charts/TotalChart";
import TotalBookChart from "./data/charts/TotalBookChart";
import TotalBookForRentChart from "./data/charts/TotalBookForRent";
import TotalBookRenterChart from "./data/charts/TotalBookRenter";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
  //total books
  const [totalBook, setTotalBook] = useState(0);

  //total books for rent
  const [totalBookForRent, setTotalBookForRent] = useState(0);

  //total book renter
  const [totalBookRenter, setTotalBookRenter] = useState(0);

  useEffect(() => {
    getTotalBooks();
    getTotalBookForRent();
    getTotalBookRenter();
  }, []);

  //get books from api
  const getTotalBooks = async () => {
    await axios
      .get(`https://bookmanagement-api2.azurewebsites.net/api/book/count`)
      .then((res) => {
        setTotalBook(res.data);
      })
      .then(() => {
        console.log("DATA", totalBook);
      });
  };

  //get bookForRent from api
  const getTotalBookForRent = async () => {
    await axios
      .get(`https://bookmanagement-api2.azurewebsites.net/api/history/count`)
      .then((res) => {
        setTotalBookForRent(res.data);
      })
      .then(() => {
        console.log("DATA", totalBookForRent);
      });
  };

  //get bookRenter from api
  const getTotalBookRenter = async () => {
    await axios
      .get(`https://bookmanagement-api2.azurewebsites.net/api/customer/count`)
      .then((res) => {
        setTotalBookRenter(res.data);
      })
      .then(() => {
        console.log("DATA", totalBookRenter);
      });
  };

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="total-statistics">
            <div></div>
            <p>Total Statistics</p>
          </div>
        </div>

        <div className="main-content-row total-statistics-row">
          <div className="main-content-total" style={{ marginLeft: "60px" }}>
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">{totalBook}</h1>
                <p>BOOKS</p>
              </div>
              <div className="main-content-total-component-chart totalBookChart">
                <TotalBookChart />
              </div>
            </div>
          </div>

          <div className="main-content-total">
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">{totalBookForRent}</h1>
                <p>BOOKS FOR RENT</p>
              </div>
              <div className="main-content-total-component-chart totalBookForRentChart">
                <TotalBookForRentChart />
              </div>
            </div>
          </div>

          <div className="main-content-total" style={{ marginRight: "60px" }}>
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">{totalBookRenter}</h1>
                <p>BOOK RENTERS</p>
              </div>
              <div className="main-content-total-component-chart totalBookRenterChart">
                <TotalBookRenterChart />
              </div>
            </div>
          </div>
        </div>
        <div className="main-content-row">
          <div className="main-content-chart">
            <TotalChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
