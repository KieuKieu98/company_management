import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col>
              <div
                className="numbers"
                style={{ position: "absolute", right: "29px" }}
              >
                <p>{this.props.statsText}</p>
                {this.props.statsValue}
              </div>
            </Col>
          </Row>
          <div className="footer" style={{ textAlign: "center" }}>
            <hr />
            <div className={"stats" + this.props.ellipText ? "ellip" : ""}>
              {this.props.statsIcon} {this.props.statsIconText}{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
