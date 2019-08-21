import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import { connect } from "react-redux";

import logo from "../../assets/img/reactlogo.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      role: false
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    const { role } = this.props;
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div className="sidebar-background" style={sidebarBackground} />
        ) : null}
        <div className="logo">
          <a
            href="http://www.htactive.com/vi"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="http://www.htactive.com/vi"
            className="simple-text logo-normal"
          >
            HT Active
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (
                !prop.redirect &&
                !prop.noMenuItem &&
                prop.routeType.includes(role)
              ) {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

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
)(Sidebar);

// export default Sidebar;
