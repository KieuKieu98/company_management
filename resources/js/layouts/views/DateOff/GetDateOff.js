import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "../../../components/Card/Card.jsx";
import axios from "axios";
import { authHeader } from "../../../function/helpers";
import Pagination from "react-js-pagination";
import "./DateOff.css";

class GetDateOff extends React.Component {
  state = {
    dateOffADecline: [],
    dateOffs: [],
    activePage: 1,
    accepted: "Accepted",
    cancelApprove: "Declined",
    itemsCountPerPage: 1,
    totalItemsCount: 1,
    pageRangeDisplayed: 5,
    activePageApprove: 1,
    itemsCountPerPageApprove: 1,
    totalItemsCountApprove: 1,
    pageRangeDisplayedApprove: 5
  };

  componentDidMount() {
    axios
      .get("/api/day-offs", {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffs: response.data.data.data,
          activePage: response.data.data.current_page,
          itemsCountPerPage: response.data.data.per_page,
          totalItemsCount: response.data.data.total
        });
      });
    axios
      .get("/api/day-offs/all-status", {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffADecline: response.data.data.data,
          activePageApprove: response.data.data.current_page,
          itemsCountPerPageApprove: response.data.data.per_page,
          totalItemsCountApprove: response.data.data.total
        });
      });
  }

  handlePageChange = pageNumber => {
    axios
      .get("/api/day-offs?page=" + pageNumber, {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffs: response.data.data.data,
          activePage: response.data.data.current_page,
          itemsCountPerPage: response.data.data.per_page,
          totalItemsCount: response.data.data.total
        });
      });
  };

  handlePageChangeApprove = pageNumber => {
    axios
      .get("/api/day-offs/all-status?page=" + pageNumber, {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffADecline: response.data.data.data,
          activePageApprove: response.data.data.current_page,
          itemsCountPerPageApprove: response.data.data.per_page,
          totalItemsCountApprove: response.data.data.total
        });
      });
  };

  onAccept = id => {
    const data = {
      status: this.state.accepted
    };
    axios
      .post(`/api/day-offs/accepted/${id}`, data, {
        headers: authHeader()
      })
      .then(response => {
        let dateOffs = this.state.dateOffs;
        let result = dateOffs.filter(x => x.id != id);
        this.setState({ dateOffs: result });
      });
    axios
      .get("/api/day-offs/all-status", {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffADecline: response.data.data.data,
          activePageApprove: response.data.data.current_page,
          itemsCountPerPageApprove: response.data.data.per_page,
          totalItemsCountApprove: response.data.data.total
        });
      });
  };

  onCancelApprove = id => {
    const data = {
      status: this.state.cancelApprove
    };
    axios
      .post(`/api/day-offs/declined/${id}`, data, {
        headers: authHeader()
      })
      .then(response => {
        let dateOffs = this.state.dateOffs;
        let result = dateOffs.filter(x => x.id != id);
        this.setState({ dateOffs: result });
      });
    axios
      .get("/api/day-offs/all-status", {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          dateOffADecline: response.data.data.data,
          activePageApprove: response.data.data.current_page,
          itemsCountPerPageApprove: response.data.data.per_page,
          totalItemsCountApprove: response.data.data.total
        });
      });
  };

  render() {
    let indexNo = (this.state.activePage - 1) * this.state.itemsCountPerPage;
    let indexNoADecline =
      (this.state.activePageApprove - 1) * this.state.itemsCountPerPageApprove;
    return (
      <div className="container">
        <ul className="nav nav-pills" style={{ display: "flex" }}>
          <li className="active date-off tabApprove" style={{ width: "100%" }}>
            <a data-toggle="pill" className="text-tab" href="#home">
              Date off request
            </a>
          </li>
          <li className="date-off tabApprove" style={{ width: "100%" }}>
            <a data-toggle="pill" className="text-tab" href="#menu1">
              Date off list
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="home" className="tab-pane fade in active">
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col md={12}>
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
                                <th>Email</th>
                                <th>Role</th>
                                <th>Reason</th>
                                <th>Date start</th>
                                <th>Hour</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.dateOffs.map((dateOff, index) => {
                                return (
                                  <tr key={dateOff.id}>
                                    <td>{indexNo + index + 1}</td>
                                    <td>
                                      {dateOff.first_name +
                                        " " +
                                        dateOff.last_name}
                                    </td>
                                    <td>{dateOff.email}</td>
                                    <td>{dateOff.role}</td>
                                    <td>{dateOff.reason}</td>
                                    <td>{dateOff.from_date}</td>
                                    <td>{dateOff.hour}</td>
                                    <td
                                      style={{
                                        color: "#f44336"
                                      }}
                                    >
                                      {dateOff.status}
                                    </td>
                                    <td>
                                      <button
                                        className="w3-button w3-green button-approve"
                                        onClick={() =>
                                          this.onAccept(dateOff.id)
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="w3-button w3-red"
                                        onClick={() =>
                                          this.onCancelApprove(dateOff.id)
                                        }
                                      >
                                        Decline
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.itemsCountPerPage}
                              totalItemsCount={this.state.totalItemsCount}
                              pageRangeDisplayed={this.state.pageRangeDisplayed}
                              onChange={this.handlePageChange}
                            />
                          </div>
                        </div>
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
                  <Col md={12}>
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
                                <th>Email</th>
                                <th>Role</th>
                                <th>Reason</th>
                                <th>Date start</th>
                                <th>Hour</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.dateOffADecline.map(
                                (dateOff, index) => {
                                  return (
                                    <tr key={dateOff.id}>
                                      <td>{indexNoADecline + index + 1}</td>
                                      <td>
                                        {dateOff.first_name +
                                          " " +
                                          dateOff.last_name}
                                      </td>
                                      <td>{dateOff.email}</td>
                                      <td>{dateOff.role}</td>
                                      <td>{dateOff.reason}</td>
                                      <td>{dateOff.from_date}</td>
                                      <td>{dateOff.hour}</td>
                                      {dateOff.status === "Declined" ? (
                                        <td
                                          style={{
                                            color: "#f44336"
                                          }}
                                        >
                                          {dateOff.status}
                                        </td>
                                      ) : (
                                        <td
                                          style={{
                                            color: "#4caf50"
                                          }}
                                        >
                                          {dateOff.status}
                                        </td>
                                      )}
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <Pagination
                              activePage={this.state.activePageApprove}
                              itemsCountPerPage={
                                this.state.itemsCountPerPageApprove
                              }
                              totalItemsCount={
                                this.state.totalItemsCountApprove
                              }
                              pageRangeDisplayed={
                                this.state.pageRangeDisplayedApprove
                              }
                              onChange={this.handlePageChangeApprove}
                            />
                          </div>
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

export default GetDateOff;
