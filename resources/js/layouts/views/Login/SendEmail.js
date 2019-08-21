import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { authActions } from "../../../function/actions";

import logo from "../../../assets/img/user.png";
import { required, emailMail } from "../Validation/validation";

class SendEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
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
    const { email } = this.state;
    const { dispatch } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      if (email) {
        dispatch(authActions.sendEmail(email));
      }
    }
  }

  render() {
    return (
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
                <Input
                  name="email"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  validations={[required, emailMail]}
                />
                {this.props.loading ? (
                  <i className="fa fa-spinner" aria-hidden="true" />
                ) : (
                  <></>
                )}
                <button className="btn btn-info btn-block login" type="submit">
                  Send
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
    );
  }
}

function mapdispatch(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { loading } = authentication;
  return {
    loading
  };
}

export default connect(
  mapStateToProps,
  mapdispatch
)(SendEmail);
// export default SendEmail;
