import React from "react";
import "./SideMenu.scss";
import MenuItem from "../TopMenu/MenuItem";

const SideMenu: React.SFC<{}> = () => (
  <div className="side-menu hide-mobile">
    <MenuItem to="/add-card" icon="fas fa-plus" />
    <MenuItem to="/" icon="fas fa-book-open" />
    <MenuItem to="/explore" icon="fas fa-chart-bar" />
  </div>
);

export default SideMenu;