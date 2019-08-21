import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const CheckRoleRoute = props => {
  let role = props.role;
  if (role) {
    if (props.routeType.includes(role)) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/admin/dashboard" />;
    }
  }
  return <></>;
};

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  const {
    data: { role }
  } = user || { data: { role: null } };
  return {
    role
  };
}

export default connect(
  mapStateToProps,
  null
)(CheckRoleRoute);
