import * as yup from "yup";
import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { dynamoCardSchema } from "../schema/card";
import { getDynamoClient } from "./client";
import { getEnv } from "./createStack";
import { getLogger } from "./logger";
import { created, serverError, clientError } from "./response";

interface CardToAdd {
  stackId: string;
  cardId: string;
}

const cardToAddSchema = yup.object<CardToAdd>({
  cardId: yup.string().required(),
  stackId: yup.string().required()
});

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = getLogger({ name: "addCardToStack" });

  let tableName;
  try {
    tableName = getEnv("TABLE_NAME");
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

  var getParams = {
    TableName: tableName,
    Key: {
      pkey: cardDetails.cardId,
      skey: "UserId:DummyUser#StackId:Stack-All"
    }
  };

  log.info({ cardId: cardDetails.cardId }, "Getting card by ID");

  let dynamoResponse;

  try {
    dynamoResponse = await documentClient.get(getParams).promise();
  } catch (err) {
    log.error({ err });

    return serverError({ error: "Failed to copy exising card" });
  }

  const card = await dynamoCardSchema.validate(dynamoResponse.Item);

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
