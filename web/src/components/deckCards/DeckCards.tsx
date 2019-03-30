import axios from "axios";
import React, { useState } from "react";

interface Card {
  DeckId: string;
  CardDeckInfo: string;
  Front: string;
  Back: string;
}

const DeckCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string>("");

  const loadCards = async () => {
    setError(null);

    try {
      const response = await axios.get<Card[]>("/api/decks/{id}", {
        params: { id: 1 }
      });

      setCards(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    loadCards();
  }, []);

  return (
    <div>
      Hello World
      {error && <p>{error}</p>}
      {cards.map(c => (
        <div key={c.CardDeckInfo}>
          <h5>{c.Front}</h5>
          <h5>{c.Back}</h5>
        </div>
      ))}
    </div>
  );
};

export default DeckCards;
