import { mount, shallow } from "enzyme";
import React from "react";
import AddCard from "./AddCard";

describe("AddCard", () => {
  it("renders without crashing", () => {
    mount(<AddCard />);
  });
});
