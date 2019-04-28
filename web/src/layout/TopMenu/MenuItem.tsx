import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  to?: string;
  text?: string;
}

const MenuItem: React.SFC<MenuItemProps> = ({ icon, to, text }) => (
  <Link to={to || "#"}>
    <div className={"item"}>
      <span className="icon">
        <i className={icon} />
      </span>
      <span className={"menu-text"}>{text}</span>
    </div>
  </Link>
);

export default MenuItem;
