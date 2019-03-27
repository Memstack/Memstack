import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./BottomMenu.scss";
const menuItems = [
  {
    to: "/explore",
    name: "Explore",
    icon: "fas fa-chart-bar"
  },
  {
    to: "/",
    name: "Decks",
    icon: "fas fa-book-open"
  },
  {
    to: "/add-card",
    name: "Add Card",
    icon: "fas fa-plus"
  },
  {
    to: "/account",
    name: "Account",
    icon: "fas fa-user"
  },
  {
    to: "/settings",
    name: "Settings",
    icon: "fas fa-cog"
  }
];

const BottomMenu = () => (
  <div className="bottom-menu">
    {menuItems.map((item, idx) => (
      <Fragment key={item.name}>
        <Link to={item.to}>
          <div className="item">
            <i className={item.icon} />
            <span className="text">{item.name}</span>
          </div>
        </Link>
        {idx < (menuItems.length - 1) && <span className="separator" />}
      </Fragment>
    ))}
  </div>
);

export default BottomMenu;
