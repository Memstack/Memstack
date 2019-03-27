import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";
import { IPalette, getColor } from "../../utils/color";

interface ButtonProps {
  text?: string;
  href?: string;
  icon?: string;
  secondary?: boolean;
  bold?: boolean;
  palette?: IPalette;
}

const Button: React.SFC<ButtonProps> = ({
  text,
  href,
  secondary,
  icon,
  bold,
  palette
}) => {
  const color = getColor(palette);

  return (
    <Link to={href || "#"}>
      <div
        className={"Button " + (icon ? " labelled" : "")}
        style={{
          backgroundColor: secondary ? "white" : color,
          border: secondary ? `1px solid ${color}` : "none"
        }}
      >
        <span
          className={"text" + (bold ? " bold" : "")}
          style={{ color: secondary ? `${color}` : "white" }}
        >
          {text}
        </span>
        {icon && (
          <span className="icon">
            <i className={icon} />{" "}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Button;
