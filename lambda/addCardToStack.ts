import { APIGatewayProxyHandler } from "aws-lambda";
import { createLogger, stdSerializers } from "bunyan";
import "source-map-support/register";
import { dynamoCardSchema } from "../schema/card";
import { getDynamoClient } from "./client";
import { created, serverError } from "./response";

interface CardToAdd {
  stackId: string;
  cardId: string;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = createLogger({
    name: "createCard",
    serializers: { err: stdSerializers.err }
  });

  log.info("This is working");

  const cardDetails: CardToAdd = {
    stackId: (event.pathParameters && event.pathParameters.stackid) || "",
    cardId: (event.pathParameters && event.pathParameters.cardid) || ""
  };

  const documentClient = getDynamoClient();

  const tableName = "Memstack";
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

    return serverError({ error: "OOOPS" });
  }

  log.fatal({ dynamoResponse });

  const card = await dynamoCardSchema.validate(dynamoResponse.Item);

  log.fatal({ card });

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
