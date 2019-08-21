import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { authActions } from "../../../function/actions";

import "./Login.css";
import logo from "../../../assets/img/user.png";
import {
  required,
  emailMail,
  minLength,
  maxLength,
  specialValue
} from "../Validation/validation";

class Login extends Component {
  constructor(props) {
    super(props);
    // reset login status
    this.props.dispatch(authActions.logout());
    this.state = {
      email: "",
      hidden: true,
      password: ""
    };
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      if (email && password) {
        // this.props.history.push("/");
        dispatch(authActions.login(email, password));
      }
    }
  }
  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    return (
      <div className="background">
      <div className="container">
        <div className="login-container">
          <div id="output" />
          <div className="avatar">
            <img className="img-user" src={logo} />
          </div>
          <div className="form-box login-form">
            <Form className="form"
              onSubmit={e => this.onSubmit(e)}
              ref={c => {
                this.form = c;
              }}
            >
              <Input
                name="email"
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Email"
                className="form-control"
                validations={[required, emailMail]}
              />
              <div className="icon-eye">
                <i className="fa fa-eye eye" onClick={this.toggleShow} />
              </div>
              <Input
                name="password"
                onChange={this.onChangeHandler}
                type={this.state.hidden ? "password" : "text"}
                placeholder="Password"
                className="form-control"
                validations={[required, minLength, maxLength, specialValue]}
              />
              <button className="btn btn-info btn-block login" type="submit">
                Login
              </button>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
              <Link to="/reset" className="forgot-pass">
                Forgot your password?{" "}
              </Link>
            </Form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}
function mapdispatch(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapdispatch
)(Login);
