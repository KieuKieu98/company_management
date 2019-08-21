import React from "react";
import { Grid, Row, Col, Table, Image, Button } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import { userActions } from "../../function/actions";
import { connect } from "react-redux";
import { img_path } from "../../function/constants";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

class UserTableList extends React.Component {
  state = {
    alert: false,
    idUser: null
  };
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      role: PropTypes.string
    }).isRequired,
    users: PropTypes.object.isRequired,
    getAll: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAll(1);
  }

  deleteProject(e, user) {
    this.setState({
      alert: true,
      idUser: user.id
    });
  }
  deleteFile() {
    this.props.deleteUser(this.state.idUser);
    this.setState({
      alert: false
    });
  }
  onCancelDelete() {
    this.setState({
      alert: false
    });
  }
  isEditDeleteButton = user => (
    <td>
      <Link to={"table-user/" + user.id + "/edit"}>
        <i className="glyphicon glyphicon-pencil" />
      </Link>
      <button
        className="btn delete"
        type="submit"
        onClick={e => this.deleteProject(e, user)}
      >
        {this.state.alert}
        <i className="glyphicon glyphicon-trash" />
      </button>
    </td>
  );

  handlePageChange = pageNumber => {
    this.props.getAll(pageNumber);
  };

  render() {
    const { user, users, pages } = this.props;
    const {
      activePage: currentPage,
      itemsCountPerPage: itemsCountPerPage
    } = pages;
    const offset = (currentPage - 1) * itemsCountPerPage;
    let isAddUSerButton = null;
    let isAction = null;
    let isEditDelete = false;
    if (user.data.email === "super_admin@gmail.com") {
      isAddUSerButton = (
        <Link to="table-user/addUser">
          <Button className="add_button">Add user</Button>
        </Link>
      );
      isAction = <th>Action</th>;
      isEditDelete = true;
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                classScroll
                content={
                  <div>
                    {isAddUSerButton}
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
                          {isAction}
                        </tr>
                      </thead>
                      <tbody>
                        {users.items &&
                          users.items.map((user, index) => (
                            <tr key={user.id}>
                              <td>{offset + index + 1}</td>
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
                              <td>
                                <span className="limitText">
                                  {user.address}
                                </span>
                              </td>
                              <td>{user.gender}</td>
                              <td>{user.role}</td>
                              {isEditDelete
                                ? this.isEditDeleteButton(user)
                                : null}
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Pagination
                        activePage={users.pages.activePage}
                        itemsCountPerPage={users.pages.itemsCountPerPage}
                        totalItemsCount={users.pages.totalItemsCount}
                        pageRangeDisplayed={users.pages.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                      />
                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { pages } = users;
  return {
    user,
    users,
    pages
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAll: pageNumber => dispatch(userActions.getAll(pageNumber)),
    deleteUser: id => dispatch(userActions.deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTableList);
