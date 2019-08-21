import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Reset.css";
import { connect } from "react-redux";
import { authActions } from "../../../function/actions";

import logo from "../../../assets/img/user.png";
import {
  required,
  minLength,
  maxLength,
  specialValue
} from "../Validation/validation";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      new_password: ""
    };
  }

  componentDidMount() {
    var queryString = this.props.location.pathname
      ? this.props.location.pathname.split("/change-password/")[1]
      : this.props.location.pathname.slice(1);
    console.log(queryString, "kieu");
    this.props.validateToken(queryString);
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    var token = this.props.location.pathname
      ? this.props.location.pathname.split("/change-password/")[1]
      : this.props.location.pathname.slice(1);
    const { new_password } = this.state;
    if (this.checkBtn.context._errors.length === 0) {
      if (new_password) {
        this.props.resetPassword(token, new_password);
      }
    }
  }

  render() {
    const { success } = this.props;
    return success ? (
      <div className="background">
      <div className="container">
        <div className="login-container">
          <div id="output" />
          <div className="avatar">
            <img className="img-user" src={logo} />
          </div>
          <div className="form-box form-mail">
            <Form
              onSubmit={e => this.onSubmit(e)}
              ref={c => {
                this.form = c;
              }}
            >
               <div className="icon-eye">
                <i className="fa fa-eye eye" onClick={this.toggleShow} />
              </div>
                <Input
                  name="new_password"
                  onChange={this.onChangeHandler}
                  type={this.state.hidden ? "password" : "text"}
                  placeholder="New Password"
                  className="form-control"
                  validations={[required, minLength, maxLength, specialValue]}
                />
                
              <button className="btn btn-info btn-block login" type="submit">
                Change
              </button>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
      </div>
    ) : (
      <div className="avatar">Invalid Token </div>
    );
  }
}
function mapStateToProps(state) {
  const { authentication } = state;
  const { success } = authentication;
  return {
    success
  };
}
const mapDispatchToProps = dispatch => {
  return {
    validateToken: token => dispatch(authActions.validationToken(token)),
    resetPassword: (token, new_password) =>
      dispatch(authActions.resetPassword(token, new_password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

// export default ResetPassword;
