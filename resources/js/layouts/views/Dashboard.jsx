import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";
import { connect } from "react-redux";
import { overtimeActions } from "../../function/actions";
import { userActions } from "../../function/actions";
import axios from "axios";
import { authHeader } from "../../function/helpers";
import UserCard from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../../variables/Variables.jsx";
import { img_path } from "../../function/constants/user";

class Dashboard extends Component {
  state = {
    documents: [],
    acceptedDateOff: 0,
    declinedDateOff: 0,
    waitingDateOff: 0
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  getDocuments = async () => {
    let response = await axios.get("/api/documents", {
      headers: authHeader()
    });
    this.setState({
      documents: response.data.data
    });
  };

  getDeclinedDateOff = async () => {
    let response = await axios.get("/api/day-offs/declined", {
      headers: authHeader()
    });

    this.setState({
      acceptedDateOff: parseInt(response.data.data)
    });
  };

  getAcceptedDateOff = async () => {
    let response = await axios.get("/api/day-offs/accepted", {
      headers: authHeader()
    });
    this.setState({
      declinedDateOff: parseInt(response.data.data)
    });
  };

  getWaitingDateOff = async () => {
    let response = await axios.get("/api/day-offs/waiting", {
      headers: authHeader()
    });
    this.setState({
      waitingDateOff: parseInt(response.data.data)
    });
  };

  componentDidMount() {
    this.props.getTeam();
    // this.props.getAllOT();
    this.props.getAllUser();
    this.props.getOne(this.props.idAuthentication);
    this.getDocuments();
    this.getAcceptedDateOff();
    this.getDeclinedDateOff();
    this.getWaitingDateOff();
  }

  add3Dots(string, limit) {
    let dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  render() {
    const { acceptedDateOff, declinedDateOff, waitingDateOff } = this.state;
    const sumDateOff = acceptedDateOff + declinedDateOff + waitingDateOff;
    const acceptedStatistical = ((acceptedDateOff / sumDateOff) * 100).toFixed(
      0
    );
    const declinedStatistical = ((declinedDateOff / sumDateOff) * 100).toFixed(
      0
    );
    const waitingStatistical = ((waitingDateOff / sumDateOff) * 100).toFixed(0);
    const e = {
      labels: [
        waitingStatistical + "%",
        declinedStatistical + "%",
        acceptedStatistical + "%"
      ],
      series: [waitingStatistical, declinedStatistical, acceptedStatistical]
    };
    const r = {
      names: ["Waiting", "Declined", "Accepted"],
      types: ["info", "danger", "warning"]
    };
    const OTStatistical = {
      names: ["2018 Overtime", "2019 Overtime"],
      types: ["info", "danger"]
    };
    const { teams, user, users } = this.props;
    // const { data } = overtimes;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {(teams || []) &&
              (teams || []).slice(0, 4).map((item, index) => (
                <Col lg={3} sm={6} key={index}>
                  <StatsCard
                    bigIcon={<i className="fa fa-users edit-width icon-add" />}
                    statsIconText={item.name}
                  />
                </Col>
              ))}
          </Row>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                TableResponsiveDashboard
                content={
                  <div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Avatar</th>
                          <th>First name</th>
                          <th>Last name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Gender</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.slice(0, 2).map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>
                                <Image
                                  src={
                                    user.avatar
                                      ? img_path + user.avatar
                                      : "images/default-avatar.png"
                                  }
                                  width="100px"
                                  height="100px"
                                />
                              </td>
                              <td>{user.first_name}</td>
                              <td>{user.last_name}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>{this.add3Dots(user.address, 55)}</td>
                              <td>{user.gender}</td>
                              <td>{user.role}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            {(this.state.documents || []).slice(0, 4).map((document, index) => (
              <Col lg={3} md={4} sm={6} key={index}>
                <div className="card-document">
                  <img
                    width="100%"
                    height="auto"
                    src={"/images/" + document.image}
                  />
                  <div className="content-document">
                    <h4>{document.title}</h4>
                    <p>{this.add3Dots(document.content, 110)}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {/* <Row>
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
                          <th>Avatar</th>
                          <th>Full name</th>
                          <th>Team</th>
                          <th>Date</th>
                          <th>Hour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.slice(0, 2).map((user, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <Image
                                  src={
                                    img_path +
                                    (user.avatar || "/default-avatar.png")
                                  }
                                  width="100px"
                                  height="100px"
                                />
                              </td>
                              <td>{user.first_name + " " + user.last_name}</td>
                              <td>{user.name}</td>
                              <td>{user.date}</td>
                              <td>{user.hour}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row> */}

          <Row>
            <Col md={8}>
              <Card
                id="chartActivity"
                title="2019 Overtime"
                category="All Overtime Statistical"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(OTStatistical)}
                  </div>
                }
              />
            </Col>

            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Date off statistical"
                category="Last Date off Performance"
                stats="Date off now a day"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={e} type="Pie" />
                  </div>
                }
                legend={<div className="legend">{this.createLegend(r)}</div>}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={img_path + user.avatar}
                name={user.first_name + " " + user.last_name}
                email={user.email}
                DOB={"Date of birth:" + " " + user.date_of_birth}
                phone={user.phone}
                gender={user.gender}
                description={<span>{user.address}</span>}
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>

            <Col md={8}>
              <Card
                title="Tasks"
                category="Internship development"
                stats="Updated 12 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { teams, overtimes, users } = state;
  const { authentication } = state;
  return {
    // overtimes: overtimes.allMemberOT || {},
    teams: teams.items || null,
    idAuthentication: authentication.user.data.id,
    user: state.users.user || {},
    users: users.items
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTeam: () => dispatch(overtimeActions.getTeam()),
    getOne: id => dispatch(userActions.getOne(id, true)),
    // getAllOT: () => dispatch(overtimeActions.getAllOT()),
    getAllUser: () => dispatch(userActions.getAll())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
