import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { Header, Footer } from "./components";
import { Login, Notes } from "./pages";

const App = ({ isUserAuthenticated }) => {
  console.log(isUserAuthenticated);
  return (
    <Router>
      <div className="appContainer">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/notes" component={Notes} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.notes.isUserAuthenticated,
  };
};
export default connect(mapStateToProps)(App);
