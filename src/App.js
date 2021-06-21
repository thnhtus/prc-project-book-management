import "./App.css";
import SideNav from "./components/SideNav";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BookListsPage from "./components/BookLists";
import RequestHistoryPage from "./components/RequestHistoryPage";
import FooterPage from "./components/FooterPage";
import AddNewBookPage from './components/AddNewBookPage'

function App() {
  return (
    <Router>
      <SideNav />
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/bookLists">
            <BookListsPage />
          </Route>
          <Route path="/requestsHistory">
            <RequestHistoryPage />
          </Route>
          <Route path="/addNewBook">
            <AddNewBookPage />
          </Route>
        </Switch>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;
