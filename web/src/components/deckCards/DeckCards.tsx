import React, { useState } from "react";

interface Card {
  DeckId: string;
  CardDeckInfo: string;
  Front: string;
  Back: string;
}

const DeckCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  React.useEffect(() => {
    console.log("componentDidMount");
  }, []);

  return (
    <div>
      {cards.map(c => (
        <div>
          <h5>{c.Front}</h5>
          <h5>{c.Back}</h5>
        </div>
      ))}
    </div>
  );
};
