import React, { Component } from "react";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { Image } from "react-bootstrap";
import { img_path } from "../../../function/constants";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { authHeader } from "../../../function/helpers";
import { alertActions } from "../../../function/actions/alert";
import { async } from "q";

class ShowAllOTInTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      alert: false,
      message: ""
    };
  }

  onConfirm = () => {
    this.setState({
      alert: !this.state.alert
    });
  };

  componentDidMount() {
    this.props.getMemberInTeamOT(this.props.id, 1);
  }

  onDelete = async (id, pageNumber) => {
    const del = await axios.delete(`/api/OTs/delete/${id}`, {
      headers: authHeader()
    });
    this.setState({
      alert: !this.state.alert,
      message: del.data.message
    });
    await this.props.getMemberInTeamOT(this.props.id, pageNumber);
  };

  handlePageChange = pageNumber => {
    this.props.getMemberInTeamOT(this.props.id, pageNumber);
  };

  render() {
    const { allMemberOTInTeam, pagination } = this.props;
    const {
      data,
      current_page: currentPage,
      per_page: perPage
    } = allMemberOTInTeam;
    const offset = (currentPage - 1) * perPage;
    return (
      <>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Image</th>
              <th>Full name</th>
              <th>email</th>
              <th>Time</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((member, index) => (
                <tr key={index}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <Image
                      src={img_path + (member.avatar || "/default-avatar.png")}
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>{member.first_name + " " + member.last_name} </td>
                  <td>{member.email}</td>
                  <td>{member.date}</td>
                  <td>{member.hour}</td>
                  <td onClick={this.isUpdateOvertime}>
                    <Link to={"/admin/editMember/" + member.id + "/overtime"}>
                      <i className="glyphicon glyphicon-pencil" />
                    </Link>
                    <button
                      className="btn delete"
                      type="submit"
                      onClick={() => this.onDelete(member.id)}
                    >
                      {this.state.alert}
                      <i className="glyphicon glyphicon-trash" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <SweetAlert
          show={this.state.alert}
          success
          title=""
          onConfirm={this.onConfirm}
        >
          {this.state.message}
        </SweetAlert>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            activePage={pagination.activePage}
            itemsCountPerPage={pagination.itemsCountPerPage}
            totalItemsCount={pagination.totalItemsCount}
            pageRangeDisplayed={pagination.pageRangeDisplayed}
            onChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log("object", state.overtimes.items.data);
  return {
    allMemberOTInTeam: state.overtimes.items || [],
    pagination: state.overtimes.pages
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getMemberInTeamOT: (id, pageNumber) =>
      dispatch(overtimeActions.getMemberInTeamOT(id, pageNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllOTInTeam);
