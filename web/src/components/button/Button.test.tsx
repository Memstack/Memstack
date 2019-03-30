import { shallow } from "enzyme";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    shallow(<Button />);
  });

  it("sets link to # by default", () => {
    const expectedLinkAddress = "#";
    const wrapper = shallow(<Button />);

    const linkElement = wrapper.find(Link);
    expect(linkElement.length).toBe(1);

    const link = linkElement.first().props().to;
    expect(link).toEqual(expectedLinkAddress);
  });

  it("renders text", () => {
    const expectedText = "Button Text";
    const wrapper = shallow(<Button text={expectedText} />);

    const buttonElement = wrapper.find(".Button");
    expect(buttonElement.length).toBe(1);
    expect(buttonElement.text()).toBe(expectedText);
  });
});
