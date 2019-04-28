import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { createLogger, stdSerializers } from "bunyan";
import { DynamoDB } from "aws-sdk";
import { created } from "./response";
import { dynamoCardSchema } from "../schema/card";

interface CardToAdd {
  stackId: string;
  cardId: string;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = createLogger({
    name: "createCard",
    serializers: { err: stdSerializers.err }
  });

  const cardDetails: CardToAdd = {
    stackId: (event.pathParameters && event.pathParameters.stackid) || "",
    cardId: (event.pathParameters && event.pathParameters.cardid) || ""
  };
  let documentClient: DynamoDB.DocumentClient;
  if (process.env.NODE_ENV === "development") {
    documentClient = new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET"
    });
  } else {
    documentClient = new DynamoDB.DocumentClient();
  }
  const tableName = "Memstack";
  var getParams = {
    TableName: tableName,
    Key: {
      HashKey: cardDetails.cardId
    }
  };
  const dynamoResponse = await documentClient.get(getParams).promise();
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
