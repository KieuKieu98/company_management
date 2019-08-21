import React from "react";
import { shallow } from "enzyme";
import Login from "../layouts/views/Login/Login";

describe("Test case for testing login", () => {
  let wrapper;
  test("email check", () => {
    wrapper = shallow(<Login />);
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "super_admin@gmail.com" }
    });
    expect(wrapper.state("email")).toEqual("super_admin@gmail.com");
  });
  it("password check", () => {
    wrapper = shallow(<Login />);
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "superadmin" }
    });
    expect(wrapper.state("password")).toEqual("superadmin");
  });
  it("login check with right data", () => {
    wrapper = shallow(<Login />);
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "super_admin@gmail.com" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "superadmin" }
    });
    wrapper.find("button").simulate("click");
    expect(wrapper.state("loggingIn")).toBe(true);
  });
  it("login check with wrong data", () => {
    wrapper = shallow(<Login />);
    wrapper.find('input[type="text"]').simulate("change", {
      target: { name: "email", value: "super_admin@gmail.com" }
    });
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "superadmin4" }
    });
    wrapper.find("button").simulate("click");
    expect(wrapper.state("loggingIn")).toBe(false);
  });
});
