import React, { Component } from "react";
import { NavItem, Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { img_path } from "../../function/constants";

class AdminNavbarLinks extends Component {
  render() {
    const { data } = this.props;
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav pullRight>
          <NavItem>Hi {data.email} ! </NavItem>
          <NavItem>
            <img
              className="user-img"
              src={
                data.avatar
                  ? img_path + data.avatar
                  : "/images/default-avatar.png"
              }
            />
          </NavItem>

          <LinkContainer to="/login">
            <NavItem>Logout</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );
  }
}

// export default AdminNavbarLinks;
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication ;
  const {
    data
  } = user || { data: {} };
  return {
    data
  };
}

export default connect(
  mapStateToProps,
  null
)(AdminNavbarLinks);
