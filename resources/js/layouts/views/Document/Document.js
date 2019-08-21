import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import { authHeader } from "../../../function/helpers";
import { Link } from "react-router-dom";

class Document extends React.Component {
  state = {
    documents: []
  };

  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = async () => {
    let response = await axios.get("/api/documents", {
      headers: authHeader()
    });
    this.setState({
      documents: response.data.data
    });
  };

  add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      // you can also use substr instead of substring
      string = string.substring(0, limit) + dots;
    }

    return string;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {this.state.documents.map((document, index) => (
              <Link
                to={"/admin/document/" + document.id + "/detail"}
                key={index}
              >
                <Col lg={3} md={4} sm={6}>
                  <div
                    className="thumbnail"
                    style={{ width: "100%", height: "400px" }}
                  >
                    <img
                      width="300px"
                      height="200px"
                      src={"/images/" + document.image}
                    />
                    <div className="caption">
                      <h4 style={{ textAlign: "center" }}>
                       <strong>{document.catelog}</strong> 
                      </h4>
                      <h6>{document.title}</h6>
                      <p>{this.add3Dots(document.content, 110)}</p>
                    </div>
                  </div>
                </Col>
              </Link>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Document;
