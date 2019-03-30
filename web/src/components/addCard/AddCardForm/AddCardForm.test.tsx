import { shallow } from "enzyme";
import React from "react";
import AddCardForm from "./AddCardForm";

describe("AddCardForm", () => {
  it("renders without crashing", () => {
    shallow(<AddCardForm />);
  });
});
