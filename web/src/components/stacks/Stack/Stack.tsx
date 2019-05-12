import React from "react";
import { Link } from "react-router-dom";
import "./Stack.scss";
import defaultCoverImage from "../../../logo.png";

interface StackProps {
  id: string;
  img?: string;
  name: string;
  meta: string;
  description: string;
}

const Stack: React.SFC<StackProps> = ({ img, name, meta, description, id }) => {
  const imgSrc = img || defaultCoverImage;
  return (
    <Link to={`/stacks/${id}`}>
      <div className="Stack">
        <div className="cover-image">
          <img src={imgSrc} alt={`${name} cover`} />
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
