import React from "react";
import { truncate } from "../../../utils/strings";
import "./Review.scss";

export interface ReviewProps {
  cardCount: number;
  stackName: string;
  color?: string;
}

// const defaultBackgroundColor = "#3273dc";
const defaultBackgroundColor = "#f2fdff";
const orange = "#E8590C";

const getBorderColor = cardCount =>
  cardCount < 10 ? "white" : cardCount < 20 ? orange : "red";

const Review: React.FC<ReviewProps> = ({ cardCount, stackName, color }) => {
  const backgroundColor = color || defaultBackgroundColor;
  const borderColor = getBorderColor(cardCount);
  const stackNameFormatted = truncate(stackName, 12);

  return (
    <div className="review">
      <div className="review-icon" style={{ backgroundColor }}>
        <div className="card-count">{cardCount}</div>
      </div>
      <div className="review-text">{stackNameFormatted}</div>
    </div>
  );
};

export default Review;
