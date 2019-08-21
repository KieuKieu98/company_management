import React from "react";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import Card from "../../../components/Card/Card.jsx";
import { img_path } from "../../../function/constants";
import Pagination from "react-js-pagination";

// let user = JSON.parse(localStorage.getItem("user"));
// let user_id = user.data.id;

class ShowOTMember extends React.Component {
  componentDidMount() {
    this.props.getOTMember(1);
  }

  handlePageChange = pageNumber => {
    this.props.getOTMember(pageNumber);
  };

  render() {
    const { getAllOTMember, pagination } = this.props;
    const { activePage: currentPage, itemsCountPerPage: perPage } = pagination;
    const offset = (currentPage - 1) * perPage;
    return (
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
                          <th>Avatar</th>
                          <th>Full name</th>
                          <th>Team</th>
                          <th>Date</th>
                          <th>Hour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllOTMember.data &&
                          getAllOTMember.data.map((user, index) => (
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
                              <td>{user.first_name + user.last_name}</td>
                              <td>{user.name}</td>
                              <td>{user.date}</td>
                              <td>{user.hour}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <div style={{ display: "flex", justifyContent: "center" }}>
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
    getAllOTMember: state.overtimes.allMemberOT || [],
    pagination: state.overtimes.pages
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOTMember: pageNumber => dispatch(overtimeActions.getOTMember(pageNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowOTMember);
