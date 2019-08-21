import React from "react";
import axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";
import { authHeader } from "../../../function/helpers";

class Detail extends React.Component {
  state = {
    documentDetail: []
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(`/api/documents/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        this.setState({
          documentDetail: response.data.data
        });
      });
  }

  render() {
    const { documentDetail } = this.state;
    return (
      <div className="container">
        <Grid fluid>
          <Row
            className="thumbnail"
            style={{ width: "80%", margin: "0 auto", padding: "50px" }}
          >
            <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
              <strong>{documentDetail.title}</strong>
            </h2>
            <Col lg={6} md={6} sm={12} style={{ marginTop: "15px" }}>
              <img
                width="100%"
                height="400px"
                src={"/images/" + documentDetail.image}
              />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="caption">
                <p style={{ textAlign: "justify" }}>{documentDetail.content}</p>
              </div>
            </Col>
            <h6 style={{ textAlign: "center", textTransform: "none" }}>
              <strong>
                <i>by: Pham Vu Huy Hoang </i>
              </strong>
            </h6>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Detail;
