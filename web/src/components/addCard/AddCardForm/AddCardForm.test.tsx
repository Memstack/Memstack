import React from "react";
import AddCardForm from "./AddCardForm";
import { shallow } from "enzyme";

describe("AddCardForm", () => {
  it("renders without crashing", () => {
    shallow(<AddCardForm />);
  });
});
