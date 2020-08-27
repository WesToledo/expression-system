import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Error404 from "./pages/404.react";

import HomePage from "~/pages/Home";
import LoginPage from "~/pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />

        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
