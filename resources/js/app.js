import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import { store } from "../js/function/helpers";
import  App  from "../js/App/App";

require("./bootstrap");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
