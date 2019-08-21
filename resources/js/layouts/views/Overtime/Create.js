import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import "./Overtime.css";
import { required, maxNumber, minNumber } from "../Validation/validation";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ShowAllOTInTeam from "./ShowAllOTInTeam";
import { Link } from "react-router-dom";

let timeOut;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      user_id: "",
      key: "",
      date: new Date().toISOString().substr(0, 10)
    };
  }

  search = event => {
    clearTimeout(timeOut);
    event.persist();
    timeOut = setTimeout(() => {
      this.setState({
        key: event.target.value
      });
      this.props.getMemberInTeam(this.props.match.params.id, this.state.key);
    }, 1000);
  };

  add = (e, member) => {
    this.setState({
      user_id: member.id,
      key: member.first_name + " " + member.last_name
    });
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async (event, pageNumber) => {
    event.preventDefault();
    this.form.validateAll();
    const overtime = {
      date: this.state.date,
      hour: this.state.hour,
      user_id: this.state.user_id
    };

    if (this.checkBtn.context._errors.length === 0) {
      if (overtime) {
        await this.props.addOvertime(overtime, this.props.match.params.id);
        await this.props.getMemberInTeamOT(
          this.props.match.params.id,
          pageNumber
        );
      }
    }
  };

  render() {
    const { resultSearch } = this.props;
    const { date, hour, key } = this.state;
    return (
      <div>
        <h2 className="add-over"> Overtime </h2>
        <div className="row" style={{ marginLeft: "0px", marginRight: "0px" }}>
          <div className="col-md-12">
            <div>
              <Form
                onSubmit={event => this.onSubmit(event)}
                ref={c => {
                  this.form = c;
                }}
              >
                <div
                  className="row"
                  style={{ display: "flex", padding: "6px" }}
                >
                  <div className="col-md-12 search_input">
                    <label className="labelTable"> Name </label>
                    <Input
                      type="text"
                      onChange={this.search}
                      value={key}
                      placeholder="Search member"
                      validations={[required]}
                      ref={input => (this.myinput = input)}
                    />
                    <ul style={{ paddingLeft: "0px" }}>
                      {resultSearch.items
                        ? resultSearch.items.map((member, index) => (
                            <div
                              className="result"
                              key={index}
                              onClick={e => this.add(e, member)}
                            >
                              <h5 className="card-title ">
                                {member.first_name} {member.last_name}
                              </h5>
                            </div>
                          ))
                        : ""}
                    </ul>
                  </div>

                  <div className="col-md-12">
                    <label className="labelTable"> Date </label>
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
                  <div className="col-md-12">
                    <label className="labelTable"> Hour </label>
                    <Input
                      name="hour"
                      type="number"
                      placeholder="Choose hours"
                      value={hour}
                      onChange={this.onChangeHandler}
                      validations={[required, maxNumber, minNumber]}
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className="col-md-6">
                    <Link to={"/admin/addMember/" + this.props.match.params.id}>
                      <button className="btAction">Back</button>
                    </Link>
                  </div>

                  <div className="col-md-6">
                    <button className="btAction" type="submit">
                      Create
                    </button>
                  </div>

                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-12">
            <ShowAllOTInTeam id={this.props.match.params.id} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resultSearch: state.memberInTeam || []
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getMemberInTeam: (id, key) =>
      dispatch(overtimeActions.getMemberInTeam(id, key)),
    getMemberInTeamOT: (id, pageNumber) =>
      dispatch(overtimeActions.getMemberInTeamOT(id, pageNumber)),
    addOvertime: (overtime, id) =>
      dispatch(overtimeActions.addOvertime(overtime, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
