import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated, logout } from "./service/auth";

import Singup from "./pages/Singup";
import Login from "./pages/Login";
import Courses from "./pages/Course";
import newCourse from "./pages/Course/new";
import editCourse from "./pages/Course/edit";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/singin" component={Login} />
        <Route path="/signup" component={Singup} />
        <PrivateRoute path="/courses" component={Courses} />
        <PrivateRoute path="/course/new" component={newCourse} />
        <PrivateRoute path="/course/:id/edit" component={editCourse} />
        <Route
          path="/sair"
          component={() => {
            logout();
            return <Redirect to={{ pathname: "/" }} />;
          }}
        />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
