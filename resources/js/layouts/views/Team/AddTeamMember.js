import React from "react";
import "./Create.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { img_path } from "../../../function/constants";
import SweetAlert from "react-bootstrap-sweetalert";

let timeOut;

class AddTeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      key: "",
      idUser: null,
      alert: false
    };
  }

  componentDidMount() {
    this.props.getOne(this.props.match.params.id);
  }

  search = event => {
    clearTimeout(timeOut);
    this.setState({
      key: event.target.value
    });
    // event.persist();
    timeOut = setTimeout(() => {
      this.props.getMember(this.props.match.params.id, this.state.key);
    }, 1000);
  };

  add = async (e, member) => {
    await this.props.addMember(member, this.props.match.params.id);
    await this.props.getMember(this.props.match.params.id, "");
    this.setState({ key: "" });
  };

  deleteMember(e, user) {
    this.setState({
      alert: true,
      idUser: user.id
    });
  }
  deleteFile() {
    this.props.deleteMember(this.props.match.params.id, this.state.idUser);
    this.setState({
      alert: false
    });
  }
  onCancelDelete() {
    this.setState({
      alert: false
    });
  }
  render() {
    const { key } = this.state;
    const { resultSearch } = this.props;
    const { teams } = this.props;
    const quatityMember = teams.members ? Object(teams.members).length : "";
    const teamName = teams.teamArray ? teams.teamArray.name : "";
    const teamID = teams.teamArray ? teams.teamArray.id : "";
    return (
      <div className="container content_team">
        <div className="team">
          <h1 className="team_name">{teamName} </h1>
          <h4 className="number_team">{quatityMember} members in team</h4>
          <div className="row overtime-button-overtime">
            <div className="col-md-8 col-sm-8">
              <Link to={teamID + "/overtime"}>
                <button className="overtime-button width">OVER TIME</button>
              </Link>
              <input
                type="text"
                className="search-input"
                onChange={this.search}
                value={key}
                placeholder="Search..."
              />
              <ul className="mRight-ul">
                {resultSearch
                  ? resultSearch.map((member, index) => (
                      <div
                        className="result"
                        key={index}
                        onClick={e => this.add(e, member)}
                      >
                        <h5 className="card-title ">
                          {member.first_name} {member.last_name} -{" "}
                          {member.email}
                        </h5>
                      </div>
                    ))
                  : ""}
              </ul>
            </div>
          </div>

          <div className="row row-team">
            {teams.members
              ? teams.members.map((user, index) => (
                  <div className="col-md-6 col-xs-12 col-sm-12" key={index}>
                    <div className="row item-member">
                      <div className="col-xs-2 col-md-4 col-sm-4 ">
                        <img
                          className="card-img-top"
                          src={
                            img_path + (user.avatar || "/default-avatar.png")
                          }
                          alt="Card image cap"
                        />
                      </div>
                      <div className="col-xs-8 col-md-5 col-sm-4">
                        <h5 className="card-title name">
                          {user.first_name} {user.last_name}
                        </h5>
                        <h5 className="card-title name">{user.email}</h5>
                      </div>
                      <div className="col-xs-2 col-md-3 col-sm-4">
                        <i
                          className="fa fa-window-close close"
                          aria-hidden="true"
                          onClick={e => this.deleteMember(e, user)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : ""}
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    resultSearch: state.members.items || "",
    teams: state.teams.detail || {}
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOne: id => dispatch(overtimeActions.getOne(id)),
    getMember: (id, key) => dispatch(overtimeActions.getMember(id, key)),
    addMember: (member, id) => dispatch(overtimeActions.addMember(member, id)),
    deleteMember: (id, idU) => dispatch(overtimeActions.deleteMember(id, idU))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTeamMember);
