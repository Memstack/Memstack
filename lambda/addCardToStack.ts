import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as yup from "yup";
import { dynamoCardSchema } from "../schema/card";
import { getDynamoClient } from "./client";
import { getEnv } from "./createStack";
import { getLogger } from "./logger";
import { clientError, created, serverError, notFound } from "./response";
import { uuidRegex, denormaliseCardId } from "./uuid";

interface CardToAdd {
  stackId: string;
  cardId: string;
}

const uuidErrorMessage = "${path} should be a valid UUID";

const cardToAddSchema = yup.object<CardToAdd>({
  cardId: yup
    .string()
    .required()
    .matches(uuidRegex, uuidErrorMessage),
  stackId: yup
    .string()
    .required()
    .matches(uuidRegex, uuidErrorMessage)
});

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = getLogger({ name: "addCardToStack" });

  let tableName;
  try {
    tableName = getEnv("TABLE_NAME");

    log.info({ tableName }, "Table name is set");
  } catch (err) {
    log.error({ err });
    return serverError({ error: "TABLE_NAME not set" });
  }

  let cardDetails;
  try {
    cardDetails = await cardToAddSchema.validate(event.pathParameters);
  } catch (err) {
    return clientError({ error: (err as yup.ValidationError).message });
  }

  const documentClient = getDynamoClient();

  const cardId = denormaliseCardId(cardDetails.cardId);

  var getParams = {
    TableName: tableName,
    Key: {
      pkey: cardId,
      skey: "UserId:DummyUser#StackId:Stack-All"
    }
  };

  log.info({ cardId }, "Getting card by ID");

  let dynamoResponse;

  try {
    dynamoResponse = await documentClient.get(getParams).promise();
  } catch (err) {
    log.error({ err });

    return serverError({ error: "Failed to copy exising card" });
  }

  if (!dynamoResponse.Item) {
    return notFound({ error: "The specified card was not found" });
  }

  let card;
  try {
    card = await dynamoCardSchema.validate(dynamoResponse.Item);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate add card to stack");

    return clientError({
      error: `The specified card is not valid: ${message}`
    });
  }

  const params = {
    TableName: tableName,
    Item: {
      pkey: cardDetails.cardId,
      skey: `UserId:DummyUser#StackId:${cardDetails.stackId}`,
      front: card.front,
      back: card.back
    }
  };
  await documentClient.put(params).promise();

  return created();
};
