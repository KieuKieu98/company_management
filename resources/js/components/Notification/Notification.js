import React from "react";
import { connect } from "react-redux";
import { alertActions } from "../../function/actions";
import { Alert } from "react-bootstrap";
import "./Notify.css";

class Notification extends React.Component {
  state = {};
  onClose = () => {
    this.props.clear();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.alert.message) {
      setTimeout(() => {
        props.clear();
      }, 3000);
    }
    return null;
  }

  render() {
    const { alert } = this.props;
    return (
      <div id="alert" className="alert">
        {alert.message && (
          <Alert bsStyle={alert.type} className="errorAuth">
            <button
              type="button"
              aria-hidden="true"
              className="close"
              onClick={this.onClose}
            >
              &#x2715;
            </button>
            <span dangerouslySetInnerHTML={{ __html: alert.message }} />
          </Alert>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}
const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch(alertActions.clear())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
