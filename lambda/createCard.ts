import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { createLogger, stdSerializers } from "bunyan";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { clientError, created, serverError } from "./response";

interface IncomingCard {
  front: string;
  back: string;
}

const getDynamoClient = (): DynamoDB.DocumentClient => {
  if (process.env.NODE_ENV === "development") {
    return new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET"
    });
  } else {
    return new DynamoDB.DocumentClient();
  }
};

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = createLogger({
    name: "createCard",
    serializers: { err: stdSerializers.err }
  });

  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  const card: IncomingCard = JSON.parse(event.body);

  const documentClient = getDynamoClient();

  const tableName = "Memstack";

  if (!tableName) {
    log.fatal("TABLE_NAME not set");

    return serverError({ error: "No table name specified" });
  }

  const id: string = uuid();

  const params = {
    TableName: tableName,
    Item: {
      pkey: `Card-${id}`,
      skey: "UserId:DummyUser#StackId:Stack-All",
      front: card.front,
      back: card.back
    }
  };

  await documentClient.put(params).promise();

  return created();
};
