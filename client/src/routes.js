import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { isAuthenticated } from "~/services/auth";

import Error404 from "./pages/404.react";

import LoginPage from "~/pages/Login";

import HomePage from "~/pages/Home";

import UserPage from "~/pages/Users";
import CreateUserPage from "~/pages/Users/CreateUser";
import EditUserPage from "./pages/Users/UpdateUser";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />

        <PrivateRoute exact path="/home" component={HomePage} />

        <PrivateRoute exact path="/usuarios" component={UserPage} />
        <PrivateRoute exact path="/usuarios/cadastrar" component={CreateUserPage} />
        <PrivateRoute exact path="/usuarios/editar/:id" component={EditUserPage} />
        
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
