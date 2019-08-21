import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { connect } from "react-redux";
import { userActions } from "../../../function/actions";
import PropTypes from "prop-types";
import "./AddUser.css";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Card } from "../../../components/Card/Card.jsx";
import { FormInputs } from "../../../components/FormInputs/FormInputs.jsx";
import {
  required,
  emailMail,
  minLength,
  minFirstName,
  minLastName,
  minPhone,
  minAddress,
  maxPhone,
  maxAddress,
  maxLength,
  maxFirstName,
  maxLastName,
  specialValue
} from "../Validation/validation";
import { img_path } from "../../../function/constants";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
      email: "",
      password: "",
      date: new Date().toISOString().substr(0, 10),
      gender: "Male",
      selectedFile: null,
      selectedOption: "Manager",
      options: ["Developer", "Intern", "Manager"]
    };
  }
  static propTypes = {
    createUser: PropTypes.func.isRequired
  };

  setGender = e => {
    this.setState({
      gender: e.target.value
    });
  };
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangedHandler = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    };
  };

  // this.setState({
  //   selectedFile: event.target.files[0],
  //   imageName: event.target.files[0].name
  // });

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    const {
      email,
      password,
      phone,
      gender,
      lastname,
      address,
      firstname,
      date,
      selectedOption,
      selectedFile
    } = this.state;
    const user = {
      email: email,
      password: password,
      phone: phone,
      gender: gender,
      last_name: lastname,
      address: address,
      first_name: firstname,
      date_of_birth: date,
      role: selectedOption,
      avatar: selectedFile
    };

    if (this.checkBtn.context._errors.length === 0) {
      if (user) {
        this.props.createUser(user);
      }
    }
  }

  render() {
    const {
      gender,
      selectedOption,
      options,
      date,
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
          src={img_path + "default-avatar.png"}
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
                    onSubmit={e => this.onSubmit(e)}
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
                        name="avatar"
                        onChange={this.fileChangedHandler}
                        className="chooseFile"
                      />
                    </div>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Email address",
                          type: "text",
                          name: "email",
                          bsclass: "form-control",
                          placeholder: "Email",
                          onChange: this.onChangeHandler,
                          validations: [required, emailMail]
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          name: "firstname",
                          bsclass: "form-control",
                          placeholder: "First name",
                          onChange: this.onChangeHandler,
                          validations: [required, minFirstName, maxFirstName]
                        },
                        {
                          label: "Last name",
                          type: "text",
                          name: "lastname",
                          bsclass: "form-control",
                          placeholder: "Last name",
                          onChange: this.onChangeHandler,
                          validations: [required, minLastName, maxLastName]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Password",
                          type: "password",
                          name: "password",
                          bsclass: "form-control",
                          placeholder: "Password",
                          onChange: this.onChangeHandler,
                          validations: [minLength, maxLength, specialValue]
                        },
                        {
                          label: "Phone",
                          type: "number",
                          name: "phone",
                          onChange: this.onChangeHandler,
                          bsclass: "form-control",
                          placeholder: "Number phone",
                          validations: [minPhone, maxPhone]
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
                          onChange: this.onChangeHandler,
                          validations: [required, minAddress, maxAddress]
                        }
                      ]}
                    />

                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <label>Gender:</label>
                      <div className="gender">
                        <div className="male">
                          Male
                          <Input
                            type="radio"
                            checked={gender == "Male"}
                            onClick={this.setGender}
                            value="Male"
                          />
                        </div>
                        <div className="male">
                          Female
                          <Input
                            type="radio"
                            checked={gender == "Female"}
                            onClick={this.setGender}
                            value="Female"
                          />
                        </div>
                        <div>
                          Other
                          <Input
                            type="radio"
                            checked={gender == "Other"}
                            onClick={this.setGender}
                            value="Other"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Role:</label>
                        <select
                          name="selectedOption"
                          className="form-control"
                          value={selectedOption}
                          onChange={this.onChangeHandler}
                        >
                          {options.map((option, index) => (
                            <option key={index}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>DateOfBirth:</label>
                        <Flatpickr
                          options={{
                            dateFormat: "Y-m-d"
                          }}
                          data-enable-time
                          value={date}
                          onChange={(date, dateStr) => {
                            this.setState({ date: dateStr });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse"
                      }}
                    >
                      <Button bsStyle="success" type="submit">
                        Add User
                      </Button>

                      <Link to="/admin/table-user">
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

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(userActions.createUser(user))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AddUser);
