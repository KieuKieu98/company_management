import React, { Component } from "react";

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.email}</small>
                <br />
                <small>{this.props.DOB}</small>
                <br />
                <small>{this.props.phone}</small>
                <br />
                <small>{this.props.gender}</small>
              </h4>
            </a>
          </div>
          <div className="description text-center">
            {this.props.description}
          </div>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
