import React from "react";
import { shallow } from "enzyme";
import Stack from "./Stack";

describe("Stack", () => {
  it("renders without crashing", () => {
    shallow(<Stack id="1" name="stack" description="description" meta="meta" img="/" />);
  });
});
