import React, { Component } from "react";
import "../../../../public/css/dashboard.css";

export class Card extends Component {
  render() {
    return (
      <div
        className={
          "card" +
          (this.props.plain ? " card-plain" : "") +
          (this.props.classScroll ? " scroll" : "") +
          (this.props.classContainer ? " classContainer" : "")
        }
      >
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.paddingTopOT ? " paddingTopOT" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.TableResponsiveDashboard
              ? " table-responsive-dashboard"
              : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
