import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Header, Footer } from "./components";
import { Login, Notes } from "./pages";

const App = () => {
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

export default App;
