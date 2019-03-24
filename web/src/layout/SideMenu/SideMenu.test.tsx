import { shallow } from "enzyme";
import React from "react";
import SideMenu from "./SideMenu";

describe("SideMenu", () => {
  it("renders without crashing", () => {
    shallow(<SideMenu />);
  });
});
