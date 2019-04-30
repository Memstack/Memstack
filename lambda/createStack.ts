import { APIGatewayProxyHandler } from "aws-lambda";

import { createLogger, stdSerializers } from "bunyan";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { clientError, created } from "./response";
import { getDynamoClient } from "./client";

interface Incomingstack {
  title: string;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = createLogger({
    name: "createCard",
    serializers: { err: stdSerializers.err }
  });

  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  const stack: Incomingstack = JSON.parse(event.body);

  const documentClient = getDynamoClient();

  const tableName = "Memstack";

  const id: string = uuid();

  const params = {
    TableName: tableName,
    Item: {
      pkey: `Stack-${id}`,
      skey: "UserId:DummyUser#Stack",
      data: stack.title
    }
  };

  await documentClient.put(params).promise();

  return created();
};
