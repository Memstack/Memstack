import React, { useState, useEffect } from "react";
import { RouteChildrenProps } from "react-router";
import axios from "axios";
import "./StackById.scss";

type StackByIdProps = RouteChildrenProps<{ id: string }>;

interface Card {
  StackId: string;
  CardStackInfo: string;
  Front: string;
  Back: string;
}

type Cards = Card[];

const StackById: React.FC<StackByIdProps> = ({ match }) => {
  const [cards, setCards] = useState<Cards>([]);

  const getCards = async () => {
    if (match) {
      try {
        const result = await axios.get<Cards>(`/api/stacks/${match.params.id}`);

        setCards(result.data);
      } catch (err) {
        console.error("Failed to get cards", err);
      }
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="StackById centered">
      <h1>Stack {match && match.params.id}</h1>
      <ul>
        {cards.length ? (
          cards.map(c => (
            <li key={c.CardStackInfo}>
              <b>{c.Front}</b>: {c.Back}
            </li>
          ))
        ) : (
          <p>No cards in this stack</p>
        )}
      </ul>
    </div>
  );
};

export default StackById;
