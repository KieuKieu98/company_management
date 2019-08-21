import React from "react";
// import { connect } from "react-redux";
import { history } from "../function/helpers";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import Login from "../layouts/views/Login/Login";
import SendEmail from "../layouts/views/Login/SendEmail";
import ResetPassword from "../layouts/views/Login/ResetPassword";
import Notification from "../components/Notification/Notification";

class App extends React.Component {
  render() {
    return (
      <div>
        <Notification />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/reset" component={SendEmail} />
            <Route path="/change-password/" component={ResetPassword} />
            <PrivateRoute path="/admin" component={AdminLayout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
