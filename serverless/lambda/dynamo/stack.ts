import { normaliseStackId, denormaliseStackId } from "../uuid";
import { Stack, IncomingStack } from "../../../schema";
import { DynamoStack } from "./schema";
import { Id } from ".";

/**
 * Convert a DynamoStack to a Stack
 */
export const mapItemToStack = ({
  pkey,
  data,
  description,
  image
}: DynamoStack): Stack => {
  const id = normaliseStackId(pkey);

  return {
    id,
    title: data,
    description: description,
    image: image,
    href: `/stacks/${id}`
  };
};

export const mapToStacksList = (stacks: DynamoStack[]): Stack[] =>
  stacks.map(mapItemToStack);

/**
 * Convert an IncomingStack to a DynamoStack
 */
export const mapStackToItem = ({
  id,
  title
}: Id & IncomingStack): DynamoStack => ({
  pkey: denormaliseStackId(id),
  skey: "UserId:DummyUser#Stack",
  data: title,
  description: "Placeholder description",
  image: "https://example.com/image.jpg"
});
