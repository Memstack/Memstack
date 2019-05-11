import { normaliseCardId, denormaliseCardId } from "../utils/uuid";
import { DynamoCard } from "./schema";
import { Card, IncomingCard } from "../../../schema";
import { Id } from ".";

/**
 * Convert a DynamoCard to a Card
 */
export const mapItemToCard = ({ pkey, data }: DynamoCard): Card => {
  const id = normaliseCardId(pkey);

  const { front, back } = JSON.parse(data);

  return {
    id,
    front,
    back
  };
};

export const mapToCardsList = (cards: DynamoCard[]): Card[] =>
  cards.map(mapItemToCard);

/**
 * Convert an IncomingCard to a DynamoCard
 */
export const mapCardToItem = ({
  id,
  front,
  back
}: Id & IncomingCard): DynamoCard => ({
  pkey: denormaliseCardId(id),
  skey: "UserId:DummyUser#StackId:Stack-All",
  data: JSON.stringify({ front, back })
});
