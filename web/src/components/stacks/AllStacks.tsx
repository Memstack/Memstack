import React from "react";
import Stack from "./Stack/Stack";
import SpanishCover from "./assets/spanish-card-image.png";
import ItalianCover from "./assets/italian-card-background.jpg";
import MachineLearningCover from "./assets/machine-learning-card-background.jpg";
import PhysicsCover from "./assets/physics-card-background.jpg";
import UXCover from "./assets/ux-card-background.png";
import "./AllStacks.scss";
import { Link } from "react-router-dom";
import Schedule from "../schedule/Schedule";

const stacks = [
  {
    name: "Spanish",
    img: SpanishCover,
    meta: "100 Cards - Proficiency: 60%",
    description: "Useful words and phrases"
  },
  {
    name: "Italian",
    img: ItalianCover,
    meta: "50 Cards - Proficiency: 73%",
    description: "Basic words and phrases"
  },
  {
    name: "Machine Learning",
    img: MachineLearningCover,
    meta: "67 Cards - Proficiency: 85%",
    description: "SVMs, Neural Networks and Random Forests"
  },
  {
    name: "Physics",
    img: PhysicsCover,
    meta: "1300 Cards - Proficiency: 68%",
    description: "Revision cards for physics"
  },
  {
    name: "UX",
    img: UXCover,
    meta: "12 Cards - Proficiency: 99%",
    description: "User experience 101"
  }
];

const AllStacks = () => (
  <div className="AllStacks centered">
    <Schedule />
    <div className="stacks">
      <Link to="/create-stack" className="new-stack">
        <div className="text">
          Add Stack
          <i className="fas fa-plus" />
        </div>
      </Link>
      {stacks.map((stack, idx) => (
        <Stack
          id={(idx + 1).toString()}
          name={stack.name}
          img={stack.img}
          meta={stack.meta}
          description={stack.description}
          key={idx}
        />
      ))}
    </div>
  </div>
);

export default AllStacks;
