import React from "react";
import AddCard from "./AddCard";
import { shallow, mount } from "enzyme";

describe("AddCard", () => {
  it("renders without crashing", () => {
    mount(<AddCard />);
  });
});
