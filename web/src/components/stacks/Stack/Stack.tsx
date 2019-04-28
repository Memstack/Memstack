import React from "react";
import Palette from "react-palette";
import { IPalette } from "../../../utils/color";
import Button from "../../button/Button";
import "./Stack.scss";
import { Link } from "react-router-dom";

interface StackProps {
  id: string;
  img?: string;
  name: string;
  meta: string;
  description: string;
}

const Stack: React.SFC<StackProps> = ({ img, name, meta, description, id }) => {
  return (
    <Palette image={img}>
      {(palette: IPalette) => (
        <Link to={`/stacks/${id}`}>
          <div className="Stack">
            <div className="cover-image">
              <img src={img} />
            </div>
            <div className="info">
              <div className="stack-name">{name}</div>
              <div className="meta">{meta}</div>
              <div className="description">{description}</div>
            </div>
          </div>
        </Link>
      )}
    </Palette>
  );
};

export default Stack;
