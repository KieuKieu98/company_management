import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../../function/actions";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Card } from "../../../components/Card/Card.jsx";
import { FormInputs } from "../../../components/FormInputs/FormInputs.jsx";

import { img_path } from "../../../function/constants/user";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {
  required,
  emailMail,
  minFirstName,
  minLastName,
  minPhone,
  minAddress,
  maxPhone,
  maxAddress,
  maxFirstName,
  maxLastName
} from "../../../layouts/views/Validation/validation";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      imagePreviewUrl: "",
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      gender: "",
      date_of_birth: "",
      role: "",
      optionsState: ["Manager", "Developer", "Intern"],
      genderRadio: ["Male", "Female", "Other"]
    };
  }

  async componentDidMount() {
    await this.props.getOne(this.props.idAuthentication);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.email) {
      return {
        avatar: props.user.avatar,
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        address: props.user.address,
        gender: props.user.gender,
        phone: props.user.phone,
        date_of_birth: props.user.date_of_birth,
        role: props.user.role
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _handleImageChange(e) {
    e.preventDefault();

    if (window.FileReader) {
      let reader = new FileReader();
      let file = e.target.files[0];

      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        this.setState({
          avatar: file,
          imagePreviewUrl: reader.result
        });
      };
    }
  }

  onSubmitForm = async e => {
    e.preventDefault();
    this.form.validateAll();
    const userUpdateState = {
      id: this.props.user.id,
      avatar: this.state.avatar,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      phone: this.state.phone,
      gender: this.state.gender,
      date_of_birth: this.state.date_of_birth,
      role: this.state.role
    };

    if (this.checkBtn.context._errors.length === 0) {
      if (userUpdateState) {
        await this.props.updateUser(userUpdateState);
        await this.props.getOne(this.props.idAuthentication);
      }
    }
  };

  render() {
    const {
      date_of_birth,
      email,
      address,
      avatar,
      first_name,
      last_name,
      gender,
      phone,
      role,
      genderRadio,
      imagePreviewUrl
    } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          style={{ marginBottom: "30px" }}
          className="avatar-user"
          alt="..."
          width="100px"
          height="100px"
          src={imagePreviewUrl}
        />
      );
    } else {
      $imagePreview = (
        <img
          style={{ marginBottom: "30px" }}
          className="avatar-user"
          alt="..."
          width="100px"
          height="100px"
          src={img_path + (avatar || "default-avatar.png")}
        />
      );
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Card
                title=""
                content={
                  <Form
                    className="form-profile"
                    onSubmit={e => this.onSubmitForm(e)}
                    ref={c => {
                      this.form = c;
                    }}
                    encType="multipart/form-data"
                  >
                    <div className="author" style={{ textAlign: "center" }}>
                      {$imagePreview}
                    </div>
                    <div className="">
                      <input
                        type="file"
                        onChange={e => this._handleImageChange(e)}
                      />
                    </div>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Email address",
                          type: "text",
                          name: "email",
                          bsclass: "form-control",
                          placeholder: "Email",
                          value: email,
                          onChange: this.handleChange,
                          validations: [required, emailMail],
                          disabled: true
                        },
                        {
                          label: "Role",
                          type: "text",
                          name: "role",
                          bsclass: "form-control",
                          value: role,
                          onChange: this.handleChange,
                          disabled: true
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          name: "first_name",
                          bsclass: "form-control",
                          placeholder: "First name",
                          value: first_name,
                          onChange: this.handleChange,
                          validations: [required, minFirstName, maxFirstName]
                        },
                        {
                          label: "Last name",
                          type: "text",
                          name: "last_name",
                          bsclass: "form-control",
                          placeholder: "Last name",
                          value: last_name,
                          onChange: this.handleChange,
                          validations: [required, minLastName, maxLastName]
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          name: "address",
                          bsclass: "form-control",
                          placeholder: "Home adress",
                          value: address,
                          onChange: this.handleChange,
                          validations: [required, minAddress, maxAddress]
                        }
                      ]}
                    />
                    <div style={{ display: "flex" }}>
                      <label>Gender:</label>
                      {genderRadio.map((genderState, index) => (
                        <React.Fragment key={index}>
                          <input
                            type="radio"
                            name="gender"
                            value={genderState}
                            checked={genderState === gender ? true : false}
                            onChange={this.handleChange}
                          />
                          <label>{genderState}</label>
                        </React.Fragment>
                      ))}
                    </div>

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Phone",
                          type: "number",
                          name: "phone",
                          value: phone,
                          onChange: this.handleChange,
                          bsclass: "form-control",
                          placeholder: "Number phone",
                          validations: [minPhone, maxPhone]
                        },
                        {
                          label: "Date Of Birth",
                          type: "date",
                          name: "date_of_birth",
                          value: date_of_birth,
                          onChange: this.handleChange,
                          bsclass: "form-control",
                          placeholder: "Phone Number"
                        }
                      ]}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse"
                      }}
                    >
                      <Button bsStyle="success" type="submit">
                        Update User
                      </Button>
                      <Link to="/admin/dashboard">
                        <Button bsStyle="danger">Cancel</Button>
                      </Link>
                    </div>

                    <div className="clearfix" />
                    <CheckButton
                      style={{ display: "none" }}
                      ref={c => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user: state.users.user || {},
    idAuthentication: authentication.user.data.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: data => dispatch(userActions.updateUser(data)),
    getOne: id => dispatch(userActions.getOne(id, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);
