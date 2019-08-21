import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { overtimeActions } from "../../../function/actions";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormInputs } from "../../../components/FormInputs/FormInputs";
import { Card } from "../../../components/Card/Card.jsx";
import { Link } from "react-router-dom";
import { maxNumber, minNumber } from "../Validation/validation";
import { required } from "../Validation/validation";

const img_path = "/storage/uploads/";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      date: ""
    };
  }

  componentDidMount() {
    this.props.getOneMemberInTeamOT(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.date) {
      return {
        hour: props.oneMemberOT.hour,
        date: props.oneMemberOT.date
      };
    }
    return null;
  }

  onUpdateSubmit(event) {
    event.preventDefault();
    this.form.validateAll();
    const overtimeUpdateMember = {
      date: this.state.date,
      hour: this.state.hour,
      user_id: this.props.oneMemberOT.user_id,
      team_id: this.props.oneMemberOT.team_id
    };
    if (this.checkBtn.context._errors.length === 0) {
      if (overtimeUpdateMember) {
        this.props.updateOvertime(
          this.props.oneMemberOT.id,
          overtimeUpdateMember
        );
      }
    }
  }

  onUpdateHandleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { oneMemberOT } = this.props;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Card
                title=""
                content={
                  <Form
                    onSubmit={e => this.onUpdateSubmit(e)}
                    ref={c => {
                      this.form = c;
                    }}
                  >
                    <div className="author" style={{ textAlign: "center" }}>
                      <img
                        style={{ marginBottom: "30px" }}
                        className="avatar-user"
                        alt="..."
                        width="100px"
                        height="100px"
                        src={img_path + this.props.oneMemberOT.avatar}
                      />
                    </div>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Email address",
                          type: "text",
                          name: "email",
                          bsclass: "form-control",
                          placeholder: "Email",
                          value: oneMemberOT.email,
                          disabled: true
                        },
                        {
                          label: "Full name",
                          type: "text",
                          name: "fullName",
                          bsclass: "form-control",
                          placeholder: "Full name",
                          value: `${oneMemberOT.first_name} ${
                            oneMemberOT.last_name
                          }`,
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Date",
                          type: "date",
                          name: "date",
                          bsclass: "form-control",
                          placeholder: "Date",
                          value: oneMemberOT.date,
                          onChange: this.onUpdateHandleChange
                        },
                        {
                          label: "Hours",
                          type: "number",
                          name: "hour",
                          bsclass: "form-control",
                          placeholder: "Hours",
                          value: oneMemberOT.hour,
                          onChange: this.onUpdateHandleChange,
                          validations: [maxNumber, minNumber]
                        }
                      ]}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse"
                      }}
                    >
                      <Button bsStyle="success" type="submit">
                        Update User
                      </Button>
                      <Link
                        to={
                          "/admin/addMember/" +
                          oneMemberOT.team_id +
                          "/overtime"
                        }
                      >
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
    );
  }
}

function mapStateToProps(state) {
  return {
    oneMemberOT: state.overtimes.items.data[0] || {}
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOneMemberInTeamOT: id =>
      dispatch(overtimeActions.getOneMemberInTeamOT(id)),
    updateOvertime: (id, data) =>
      dispatch(overtimeActions.updateOvertime(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
