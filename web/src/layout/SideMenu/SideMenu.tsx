import React from "react";
import "./SideMenu.scss";
import MenuItem from "./MenuItem";

const SideMenu: React.FC<{}> = () => (
  <div className="side-menu hide-mobile">
    <MenuItem to="/add-card" icon="fas fa-plus" />
    <MenuItem to="/" icon="fas fa-book-open" />
    <MenuItem to="/explore" icon="fas fa-chart-bar" />
  </div>
);

export default SideMenu;