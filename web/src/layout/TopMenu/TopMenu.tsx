import React from "react";
import Logo from "../../logo.png";
import "./TopMenu.scss";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

interface ITopMenuState {
  isActive: boolean;
}

const actionMenuItems = [
  { to: "/add-card", text: "", icon: "fas fa-plus", extraClass: "" },
  { to: "/", text: "", icon: "fas fa-book-open", extraClass: "" },
  { to: "/explore", text: "", icon: "fas fa-chart-bar", extraClass: "" }
];
const menuItems = [
  { to: "/account", text: "Account", icon: "fas fa-user", extraClass: "" },
  { to: "/settings", text: "Settings", icon: "fas fa-cog", extraClass: "" }
];

class TopMenu extends React.Component<{}, ITopMenuState> {
  state = {
    isActive: false
  };

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  };

  render() {
    return (
      <nav className="Navbar">
        <div className="main">
          <div className="logo">
            <Link to="/">
              <div className="item">
                <img src={Logo} alt="Memstack" />
              </div>
            </Link>
          </div>
          <div className="menu left">
            {actionMenuItems.map((item, idx) => (
              <MenuItem
                icon={item.icon}
                to={item.to}
                text={item.text}
                key={idx}
              />
            ))}
          </div>

          <div className="menu right">
            {menuItems.map((item, idx) => (
              <MenuItem
                icon={item.icon}
                to={item.to}
                text={item.text}
                key={idx}
              />
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default TopMenu;
