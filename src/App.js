import "./App.css";
import SideNav from "./components/SideNav";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BookListsPage from "./components/BookLists";
import RequestHistoryPage from "./components/RequestHistoryPage";
import FooterPage from "./components/FooterPage";
import { useState } from "react";
import LoginPage from "./components/LoginPage";

function App() {
  //set token into sessionStorage
  const setToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  //get token from sessionStorage
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  //token
  const token = getToken();

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <Router>
      <SideNav token={token} setToken={setToken} />
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage}>
            {/* <HomePage /> */}
          </Route>
          <Route exact path="/home" component={HomePage}>
            {/* <HomePage /> */}
          </Route>
          <Route path="/bookLists" component={BookListsPage}>
            {/* <BookListsPage /> */}
          </Route>
          <Route path="/requestsHistory" component={RequestHistoryPage}>
            {/* <RequestHistoryPage /> */}
          </Route>
        </Switch>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;
