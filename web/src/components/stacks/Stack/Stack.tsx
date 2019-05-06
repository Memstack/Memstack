import React from "react";
import { Link } from "react-router-dom";
import "./Stack.scss";

interface StackProps {
  id: string;
  img?: string;
  name: string;
  meta: string;
  description: string;
}

const Stack: React.SFC<StackProps> = ({ img, name, meta, description, id }) => {
  return (
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
  );
};

export default Stack;
