import React from "react";
import "./Create.css";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { Link } from "react-router-dom";
import { StatsCard } from "../../../components/StatsCard/StatsCard.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
// import { maxTeam } from "../Validation/validation";

class CreateTeam extends React.Component {
  state = {
    alert: null,
    delete: false,
    idTeam: null
  };

  componentDidMount() {
    this.props.getTeam();
  }
  showAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          input
          name="name"
          showCancel
          title="Enter Team Name"
          placeHolder="Write something"
          onConfirm={this.onRecieveInput}
          onCancel={this.onCancel}
          // validations={[maxTeam]}
        />
      )
    });
  };

  onRecieveInput = e => {
    const name = e;
    // this.form.validateAll();
    // if (this.checkBtn.context._errors.length === 0) {
    this.props.createTeamName(name);
    // }
    this.setState({
      alert: null
    });
  };
  onCancel = () => {
    this.setState({
      alert: null
    });
  };

  deleteTeam = (e, team) => {
    this.setState({
      delete: true,
      idTeam: team.id
    });
  };
  deleteFile() {
    this.props.deleteTeam(this.state.idTeam);
    this.setState({
      delete: false
    });
  }
  onCancelDelete() {
    this.setState({
      delete: false
    });
  }

  render() {
    const { teams } = this.props;
    return (
      <div className="container content_team">
        <div className="team">
          <div className="row row-team">
            {teams.items &&
              teams.items.map((team, index) => (
                <div
                  className="col-lg-3 col-xs-12 col-md-4 col-sm-6"
                  key={index}
                >
                  <StatsCard
                    bigIcon={
                      <Link to={"/admin/addMember/" + team.id}>
                        <i className="fa fa-users icon-add edit-width" />{" "}
                      </Link>
                    }
                    statsText={
                      <i
                        className="fa fa-window-close delete_team"
                        aria-hidden="true"
                        onClick={e => this.deleteTeam(e, team)}
                      />
                    }
                    statsIconText={team.name}
                    ellipText
                  />
                </div>
              ))}
            <SweetAlert
              show={this.state.delete}
              warning
              showCancel
              confirmBtnText="Yes!"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title=""
              onConfirm={() => this.deleteFile()}
              onCancel={() => this.onCancelDelete()}
            >
              Are you sure you want to delete this team?
            </SweetAlert>
            <div className="col-lg-3 col-xs-12 col-md-4 col-sm-6">
              <div className="item">
                <div className="card-body">
                  <a href="#" className="plus" onClick={this.showAlert}>
                    <i className="fa fa-plus icon_plus" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.alert}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { teams } = state;
  return {
    teams
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTeam: () => dispatch(overtimeActions.getTeam()),
    createTeamName: name => dispatch(overtimeActions.createTeam(name)),
    deleteTeam: id => dispatch(overtimeActions.deleteTeam(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeam);
