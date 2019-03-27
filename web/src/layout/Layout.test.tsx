import { shallow } from "enzyme";
import React from "react";
import Layout from "./Layout";

it("renders without crashing", () => {
  shallow(<Layout/>);
});