import React from "react";
//import TotalChart from "./charts/TotalChart";

const HomePage = () => {
  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="main-content-row">
          <div className="total-statistics">
            <div></div>
            <p>Total Statistics</p>
          </div>
        </div>

        <div className="main-content-row">
          <div className="main-content-total">
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">1234</h1>
                <p>BOOKS</p>
              </div>
              <div className="main-content-total-component-chart"></div>
            </div>
          </div>

          <div className="main-content-total">
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">456</h1>
                <p>BOOKS FOR RENT</p>
              </div>
              <div className="main-content-total-component-chart"></div>
            </div>
          </div>

          <div className="main-content-total">
            <div className="main-content-total-component">
              <div className="main-content-total-component-number">
                <h1 className="total-number">367</h1>
                <p>BOOK RENTERS</p>
              </div>
              <div className="main-content-total-component-chart"></div>
            </div>
          </div>
        </div>
        <div className="main-content-row">
          <div className="main-content-chart">
            {/* <TotalChart /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
