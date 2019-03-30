import React from "react";
import Deck from "./Deck/Deck";
import SpanishCover from "./assets/spanish-card-image.png";
import ItalianCover from "./assets/italian-card-background.jpg";
import MachineLearningCover from "./assets/machine-learning-card-background.jpg";
import PhysicsCover from "./assets/physics-card-background.jpg";
import UXCover from "./assets/ux-card-background.png";
import "./AllDecks.scss";
import Button from "../button/Button";
import { Link } from "react-router-dom";

const decks = [
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

const AllDecks = () => (
  <div className="AllDecks">
    <Link to="/create-deck" className="new-deck">
        <div className="text">
          Add Deck
          <i className="fas fa-plus" />
        </div>
    </Link>
    {decks.map((deck, idx) => (
      <Deck
        name={deck.name}
        img={deck.img}
        meta={deck.meta}
        description={deck.description}
        key={idx}
      />
    ))}
  </div>
);

export default AllDecks;
