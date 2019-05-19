import React from "react";
import AddCard from "./AddCard";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";

describe("AddCard", () => {
  it("renders without crashing", () => {
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <AddCard />
      </MemoryRouter>
    );
  });
});
