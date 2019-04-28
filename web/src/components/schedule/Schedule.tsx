import React, { useEffect, useState } from "react";
import Review, { ReviewProps } from "./review/Review";
import "./Schedule.scss";

type Reviews = ReviewProps[];

const scheduledReviews: Reviews = [
  { stackName: "All", cardCount: 39 },
  { stackName: "Spanish", cardCount: 15 },
  { stackName: "Italian", cardCount: 10 },
  { stackName: "Machine Learning", cardCount: 8 },
  { stackName: "Physics", cardCount: 4 },
  { stackName: "UX", cardCount: 2 }
];

const Schedule: React.FC<{}> = () => {
  const [reviews, setReviews] = useState<Reviews>([]);

  const getReviews = async () => {
    setReviews(scheduledReviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="schedule">
      <h3>Review Schedule</h3>
      <div className="reviews">
        {reviews.length
          ? reviews.map(review => (
              <Review
                stackName={review.stackName}
                cardCount={review.cardCount}
                key={review.stackName}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Schedule;
