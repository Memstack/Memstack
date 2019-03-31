import React, { useState, useEffect } from "react";
import { RouteChildrenProps } from "react-router";
import axios from "axios";

type DeckByIdProps = RouteChildrenProps<{ id: string }>;

interface Card {
  DeckId: string;
  CardDeckInfo: string;
  Front: string;
  Back: string;
}

type Cards = Card[];

const DeckById: React.FC<DeckByIdProps> = ({ match }) => {
  const [cards, setCards] = useState<Cards>([]);

  const getCards = async () => {
    if (match) {
      try {
        const result = await axios.get<Cards>(`/api/decks/${match.params.id}`);

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
    <div>
      <h1>Deck {match && match.params.id}</h1>
      <ul>
        {cards.map(c => (
          <li key={c.CardDeckInfo}>
            <b>{c.Front}</b>: {c.Back}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckById;
