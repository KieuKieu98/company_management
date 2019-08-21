import React from "react";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import Card from "../../../components/Card/Card.jsx";
import { img_path } from "../../../function/constants";
import Pagination from "react-js-pagination";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

let timeOut;
let i = 0;

class ShowAllOT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      sortDate: "",
      sortHour: "",
      sortIconDate: "fa-sort",
      sortIconHour: "fa-sort"
    };
  }
  componentDidMount() {
    this.props.getAllOT({
      page: this.props.allUserOT.current_page,
      key: this.state.key,
      sortDate: this.state.sortDate,
      sortHour: this.state.sortHour
    });
  }

  handlePageChange = pageNumber => {
    this.props.getAllOT({
      page: pageNumber,
      key: this.state.key,
      sortDate: this.state.sortDate,
      sortHour: this.state.sortHour
    });
  };

  search = event => {
    clearTimeout(timeOut);
    this.setState({
      key: event.target.value
    });
    timeOut = setTimeout(() => {
      this.props.getAllOT({
        page: 1,
        key: this.state.key,
        sortDate: this.state.sortDate,
        sortHour: this.state.sortHour
      });
    }, 1000);
  };

  toggleSortDate = async () => {
    if (this.state.sortIconDate === "fa-sort") {
      await this.setState({
        sortDate: "sortUpDate",
        sortIconDate: "fa-sort-asc",
        sortHour: "",
        sortIconHour: "fa-sort"
      });
    } else if (this.state.sortIconDate === "fa-sort-asc") {
      await this.setState({
        sortDate: "sortDownDate",
        sortIconDate: "fa-sort-desc",
        sortHour: "",
        sortIconHour: "fa-sort"
      });
    } else if (this.state.sortIconDate === "fa-sort-desc") {
      await this.setState({
        sortDate: "",
        sortIconDate: "fa-sort"
      });
    }
    await this.props.getAllOT({
      page: this.props.allUserOT.current_page,
      key: this.state.key,
      sortDate: this.state.sortDate,
      sortHour: this.state.sortHour
    });
  };

  toggleSortHour = async () => {
    if (this.state.sortIconHour === "fa-sort") {
      await this.setState({
        sortHour: "sortUpHour",
        sortIconHour: "fa-sort-asc",
        sortDate: "",
        sortIconDate: "fa-sort"
      });
    } else if (this.state.sortIconHour === "fa-sort-asc") {
      await this.setState({
        sortHour: "sortDownHour",
        sortIconHour: "fa-sort-desc",
        sortDate: "",
        sortIconDate: "fa-sort"
      });
    } else if (this.state.sortIconHour === "fa-sort-desc") {
      await this.setState({
        sortHour: "",
        sortIconHour: "fa-sort"
      });
    }

    await this.props.getAllOT({
      page: this.props.allUserOT.current_page,
      key: this.state.key,
      sortDate: this.state.sortDate,
      sortHour: this.state.sortHour
    });
  };

  render() {
    const { key, sortIconDate, sortIconHour } = this.state;
    const { allUserOT } = this.props;
    const { data, current_page: currentPage, per_page: perPage } = allUserOT;
    const { pagination } = this.props;
    const offset = (currentPage - 1) * perPage;
    const dateTooltip = <Tooltip id="edit_tooltip">Sort by date</Tooltip>;
    const hourTooltip = <Tooltip id="remove_tooltip">Sort by hours</Tooltip>;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="search">
                <div className="input-group">
                  <input
                    name="key"
                    type="text"
                    placeholder="Search..."
                    value={key}
                    className="form-control"
                    onChange={this.search}
                  />
                  <span className="input-group-addon">
                    <i className="pe-7s-search" />
                  </span>
                </div>
              </div>
              <Card
                ctTableFullWidth
                ctTableResponsive
                paddingTopOT
                // title=""
                // category=""
                content={
                  <div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Avatar</th>
                          <th>Full name</th>
                          <th>Team</th>
                          <th>
                            <OverlayTrigger
                              placement="top"
                              overlay={dateTooltip}
                            >
                              <button
                                className="btn-round btn btn-default"
                                onClick={this.toggleSortDate}
                              >
                                DATE{" "}
                                <i className={"fa fa-fw " + sortIconDate} />
                              </button>
                            </OverlayTrigger>
                          </th>
                          <th>
                            <OverlayTrigger
                              placement="top"
                              overlay={hourTooltip}
                            >
                              <button
                                className="btn-round btn btn-default"
                                onClick={this.toggleSortHour}
                              >
                                HOUR{" "}
                                <i className={"fa fa-fw " + sortIconHour} />
                              </button>
                            </OverlayTrigger>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((user, index) => (
                            <tr key={index}>
                              <td>{offset + index + 1}</td>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Pagination
                        activePage={pagination.activePage}
                        itemsCountPerPage={pagination.itemsCountPerPage}
                        totalItemsCount={pagination.totalItemsCount}
                        pageRangeDisplayed={pagination.pageRangeDisplayed}
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
    );
  }
}
function mapStateToProps(state) {
  return {
    allUserOT: state.overtimes.allMemberOT || [],
    pagination: state.overtimes.pages
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOT: (key, dataSort, pageNumber) =>
      dispatch(overtimeActions.getAllOT(key, dataSort, pageNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllOT);
