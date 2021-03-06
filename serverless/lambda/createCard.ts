import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { IncomingCard, incomingCardSchema } from "../../schema";
import { getDynamoClient } from "./dynamo/client";
import { getEnv } from "./dynamo/getEnv";
import { getLogger } from "./utils/logger";
import { clientError, created } from "./utils/response";
import { defaultValidationOptions } from "./utils/validation";
import { mapCardToItem, mapItemToCard } from "./dynamo/card";

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "createCard" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  let card: IncomingCard = JSON.parse(event.body);

  try {
    card = await incomingCardSchema.validate(card, defaultValidationOptions);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate new card");

    return clientError({ error: message });
  }

  const id = uuid();

  const item = mapCardToItem({ id, ...card });

  const params = {
    TableName: tableName,
    Item: item
  };

  await documentClient.put(params).promise();

  return created(mapItemToCard(item));
};
