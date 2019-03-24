import { shallow } from "enzyme";
import React from "react";
import MenuItem from "./MenuItem";
import { Link } from 'react-router-dom';

describe("MenuItem", () => {
  it("renders without crashing", () => {
    shallow(<MenuItem icon="icon" />);
  });

  it("sets link", () => {
    const expectedLinkAddress = "/expectedLink";
    const wrapper = shallow(<MenuItem icon="icon" to={expectedLinkAddress} />);

    const linkElements = wrapper.find(Link);
    expect(linkElements.length).toBe(1);

    const link = linkElements.first().props().to;
    expect(link).toEqual(expectedLinkAddress);
  });

  it("sets link to # by default", () => {
    const expectedLinkAddress = "#";
    const wrapper = shallow(<MenuItem icon="icon" />);

    const linkElements = wrapper.find(Link);
    expect(linkElements.length).toBe(1);

    const link = linkElements.first().props().to;
    expect(link).toEqual(expectedLinkAddress);
  });


  it("sets icon", () => {
    const expectedIcon = "icon name";
    const wrapper = shallow(<MenuItem icon={expectedIcon} />);

    const linkElements = wrapper.find("i");
    expect(linkElements.length).toBe(1);

    const link = linkElements.first().props().className;
    expect(link).toEqual(expectedIcon);
  });
});
