import { mount, shallow } from "enzyme";
import React from "react";
import TopMenu from "./TopMenu";
import { MemoryRouter } from "react-router";

describe("TopMenu", () => {
  it("renders without crashing", () => {
    shallow(<TopMenu />);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<TopMenu />);
    expect(wrapper).toMatchSnapshot();
  });

  it("sets active to true when burger is clicked", () => {
    const component = mount(
      <MemoryRouter>
        <TopMenu />
      </MemoryRouter>
    );
    const burger = component.find(".burger");

    const stateBeforeClick = (component.find(TopMenu).instance() as TopMenu)
      .state.isActive;
    burger.simulate("click");
    const stateAfterClick = (component.find(TopMenu).instance() as TopMenu)
      .state.isActive;

    expect(stateBeforeClick).toBe(false);
    expect(stateAfterClick).toBe(true);
  });
});
