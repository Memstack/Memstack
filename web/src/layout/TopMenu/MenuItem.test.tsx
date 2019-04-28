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

    const iconElements = wrapper.find("i");
    expect(iconElements.length).toBe(1);

    const icon = iconElements.first().props().className;
    expect(icon).toEqual(expectedIcon);
  });

  it("sets text", () => {
    const expectedText = "menu item text";
    const wrapper = shallow(<MenuItem icon={""}text={expectedText} />);

    const menuTextElements = wrapper.find(".menu-text");
    expect(menuTextElements.length).toBe(1);

    const html = menuTextElements.first().html();
    expect(html).toContain(expectedText);
  });
});
