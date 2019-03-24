import React from "react";
import Logo from "../../logo.png";
import "./TopMenu.scss";
import { Link } from "react-router-dom";

interface ITopMenuState {
  isActive: boolean;
}

const menuItems = [
  // { to: "/all-decks", text: "All Decks", icon: "fas fa-server", extraClass: "mobile-only" },
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
                <img src={Logo} />
              </div>
            </Link>
          </div>

          <div className="right">
            {menuItems.map((item, idx) => (
              <Link to={item.to} key={idx}>
                <div className={"item"}>
                  <span className="icon">
                    <i className={item.icon} />
                  </span>
                  <span className={"menu-text"}>{item.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default TopMenu;
