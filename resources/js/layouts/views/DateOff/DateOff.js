import React, { Component } from "react";
import { Grid, Row, Col, Button, Table } from "react-bootstrap";
import { Card } from "../../../components/Card/Card.jsx";
import { FormInputs } from "../../../components/FormInputs/FormInputs.jsx";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import "./DateOff.css";
import { required } from "../Validation/validation";
import { connect } from "react-redux";
import { dateOffActions } from "../../../function/actions";
import SweetAlert from "react-bootstrap-sweetalert";
import Radio from "../../../components/CustomRadio/CustomRadio";
import { async } from "q";

class DateOff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      role: "",
      reason: "",
      alert: false,
      hour: "4",
      dateOffId: null,
      from_date: new Date(),
      isActive: false
    };
  }

  componentDidMount() {
    this.props.getWaitingDateOff();
    this.props.getAcceptDateOff();
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.email) {
      return {
        first_name: props.user.data.first_name,
        last_name: props.user.data.last_name,
        role: props.user.data.role
      };
    }
    return null;
  }

  handleChange = event => {
    const { name, value, type } = event.target;
    let st = {
      [event.target.name]: event.target.value
    };
    if (type === "radio") {
      st.isActive = +value === 1;
    }
    this.setState(st);
  };

  deleteProject(e, dateOff) {
    this.setState({
      alert: true,
      dateOffId: dateOff.id
    });
  }
  deleteFile() {
    this.props.deleteDateOff(this.state.dateOffId);
    this.setState({
      alert: false
    });
  }
  onCancelDelete() {
    this.setState({
      alert: false
    });
  }

  onSubmitForm = e => {
    e.preventDefault();
    this.setState({
      hour: "4",
      isActive: false,
      reason: ""
    });
    this.form.validateAll();
    const from_date = new Date(this.state.from_date)
      .toISOString()
      .substr(0, 10);
    const dateOff = {
      from_date: from_date,
      reason: this.state.reason,
      hour: this.state.hour
    };

    if (this.checkBtn.context._errors.length === 0) {
      if (dateOff) {
        this.props.createDateOff(dateOff);
      }
    }
  };
  render() {
    const {
      from_date,
      first_name,
      last_name,
      role,
      reason,
      hour,
      isActive
    } = this.state;
    const { dateoffs, dateOffAccept } = this.props;
    return (
      <div className="container">
        <ul className="nav nav-pills" style={{ marginTop: "20px" }}>
          <li className="active date-off create-do">
            <a data-toggle="pill" className="text-tab" href="#home">
              Create Request
            </a>
          </li>
          <li className="date-off waiting">
            <a data-toggle="pill" className="text-tab" href="#menu1">
              Waiting accept
            </a>
          </li>
          <li className="date-off accept">
            <a data-toggle="pill" className="text-tab" href="#menu2">
              Accepted
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="home" className="tab-pane fade in active">
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col lg={12} md={9}>
                    <Card
                      classContainer
                      title="Date Off request"
                      content={
                        <Form
                          className="form-profile"
                          onSubmit={e => this.onSubmitForm(e)}
                          ref={c => {
                            this.form = c;
                          }}
                          encType="multipart/form-data"
                        >
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "Full Name",
                                type: "text",
                                name: "first_name",
                                bsclass: "form-control",
                                value: first_name + " " + last_name,
                                placeholder: "Full Name",
                                disabled: true
                              },
                              {
                                label: "Role",
                                type: "text",
                                name: "role",
                                bsclass: "form-control",
                                placeholder: "Role",
                                value: role,
                                disabled: true
                              }
                            ]}
                          />
                          <div className="row">
                            <div className="col-md-12">
                              <label>Reason:</label>
                              <Textarea
                                name="reason"
                                className="reason"
                                value={reason}
                                onChange={this.handleChange}
                                validations={[required]}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>From:</label>
                              <Flatpickr
                                options={{
                                  dateFormat: "Y-m-d H:i",
                                  time_24hr: true
                                }}
                                data-enable-time
                                value={from_date}
                                onChange={(selectedDates, dateStr) => {
                                  this.setState({ from_date: dateStr });
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <label>Total hours:</label>
                              <div className="row">
                                <div className="col-lg-6 col-md-6 hour">
                                  <Radio
                                    number="1"
                                    option="4"
                                    name="hour"
                                    onChange={this.handleChange}
                                    checked={hour === "4" && !isActive}
                                    label="4 hours"
                                  />
                                  <Radio
                                    number="2"
                                    option="8"
                                    name="hour"
                                    onChange={this.handleChange}
                                    checked={hour === "8" && !isActive}
                                    label="1 day"
                                  />
                                </div>
                                <div className="col-lg-6 col-md-6 hour">
                                  <Radio
                                    number="3"
                                    option="16"
                                    name="hour"
                                    onChange={this.handleChange}
                                    checked={hour === "16" && !isActive}
                                    label="2 days"
                                  />

                                  <Radio
                                    number="4"
                                    option="1"
                                    name="hour"
                                    onChange={this.handleChange}
                                    checked={isActive}
                                    label="Other"
                                  />
                                  {isActive ? (
                                    <FormInputs
                                      ncols={["col-md-12 rowHour"]}
                                      properties={[
                                        {
                                          type: "number",
                                          name: "hour",
                                          bsclass: "form-control",
                                          value: hour,
                                          onChange: this.handleChange,
                                          placeholder: "Enter hours"
                                        }
                                      ]}
                                    />
                                  ) : null}
                                </div>
                              </div>
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
                              Create
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
          </div>
          <div id="menu1" className="tab-pane fade">
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col lg={12} md={9}>
                    <Card
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <div>
                          <Table striped hover>
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Full name</th>
                                <th>Role</th>
                                <th>Reason Off</th>
                                <th>Date Start</th>
                                <th>Hour</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dateoffs &&
                                dateoffs.map((dataeOff, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{first_name + " " + last_name}</td>
                                    <td>{role}</td>
                                    <td>{dataeOff.reason}</td>
                                    <td>{dataeOff.from_date}</td>
                                    <td>{dataeOff.hour}</td>
                                    <td className="approve">
                                      {dataeOff.status}
                                    </td>
                                    <td>
                                      <button
                                        className="btn delete"
                                        type="submit"
                                        onClick={e =>
                                          this.deleteProject(e, dataeOff)
                                        }
                                      >
                                        {this.state.alert}
                                        <i className="glyphicon glyphicon-trash" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                          <SweetAlert
                            show={this.state.alert}
                            warning
                            showCancel
                            confirmBtnText="Yes!"
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="default"
                            title=""
                            onConfirm={() => this.deleteFile()}
                            onCancel={() => this.onCancelDelete()}
                          >
                            Are you sure you want to delete this user?
                          </SweetAlert>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          />
                        </div>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
          <div id="menu2" className="tab-pane fade">
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col lg={12} md={9}>
                    <Card
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <div>
                          <Table striped hover>
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Full name</th>
                                <th>Role</th>
                                <th>Reason Off</th>
                                <th>Date Start</th>
                                <th>Hour</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dateOffAccept &&
                                dateOffAccept.map((dateoff, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{first_name + " " + last_name}</td>
                                    <td>{role}</td>
                                    <td>{dateoff.reason}</td>
                                    <td>{dateoff.from_date}</td>
                                    <td>{dateoff.hour}</td>
                                    <td
                                      className={
                                        dateoff.status === "Accepted"
                                          ? "appr"
                                          : "igr"
                                      }
                                    >
                                      {dateoff.status}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          />
                        </div>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { dateOffs } = state;
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
    dateoffs: dateOffs.data || [],
    dateOffAccept: dateOffs.dateOffAccept || []
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getWaitingDateOff: () => dispatch(dateOffActions.getWaitingDateOff()),
    getAcceptDateOff: () => dispatch(dateOffActions.getAcceptDateOff()),
    createDateOff: dateOff => dispatch(dateOffActions.createDateOff(dateOff)),
    deleteDateOff: dateOffId =>
      dispatch(dateOffActions.deleteDateOff(dateOffId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateOff);
