import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Error404 from "./pages/404.react";

import HomePage from "~/pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
