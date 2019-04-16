import React from "react";
import Palette from "react-palette";
import { IPalette } from "../../../utils/color";
import Button from "../../button/Button";
import "./Deck.scss";
import { Link } from "react-router-dom";

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
        <Link to={`/decks/${id}`}>
          <div className="Deck">
            <div className="cover-image">
              <img src={img} />
            </div>
            <div className="info">
              <div className="deck-name">{name}</div>
              <div className="meta">{meta}</div>
              <div className="description">{description}</div>
            </div>
          </div>
        </Link>
      )}
    </Palette>
  );
};

export default Deck;
