import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as yup from "yup";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { clientError, created, notFound, serverError } from "./response";
import { denormaliseCardId, uuidRegex } from "./uuid";
import { dynamoCardSchema } from "../../schema";
import { DynamoCard } from "../schema/types";

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

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "addCardToStack" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  let cardDetails;
  try {
    cardDetails = await cardToAddSchema.validate(event.pathParameters);
  } catch (err) {
    return clientError({ error: (err as yup.ValidationError).message });
  }

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

  let card: DynamoCard;
  try {
    card = await dynamoCardSchema.validate(dynamoResponse.Item);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate add card to stack");

    return clientError({
      error: `The specified card is not valid: ${message}`
    });
  }

  const newItem: DynamoCard = {
    pkey: cardId,
    skey: `UserId:DummyUser#StackId:${cardDetails.stackId}`,
    data: card.data
  };

  const params = {
    TableName: tableName,
    Item: newItem
  };
  await documentClient.put(params).promise();

  return created();
};
