import React from "react";
import Palette from "react-palette";
import { IPalette } from "../../../utils/color";
import Button from "../../button/Button";
import "./Deck.scss";

interface DeckProps {
  id: string;
  img?: string;
  name: string;
  meta: string;
  description: string;
}

const Deck: React.SFC<DeckProps> = ({ img, name, meta, description, id }) => {
  return (
    <Palette image={img}>
      {(palette: IPalette) => (
        <div className="Deck">
          <div className="cover-image">
            <img src={img} />
          </div>
          <div className="deck-name">{name}</div>
          <div className="meta">{meta}</div>
          <div className="description">{description}</div>
          <div className="controls">
            <Button text="Edit" secondary />
            <Button text="Review" href={`/decks/${id}`} />
          </div>
        </div>
      )}
    </Palette>
  );
};

export default Deck;
