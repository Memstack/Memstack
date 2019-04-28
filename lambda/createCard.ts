import { APIGatewayProxyHandler } from "aws-lambda";

import { createLogger, stdSerializers } from "bunyan";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { clientError, created, serverError } from "./response";
import { getDynamoClient } from "./client";

interface IncomingCard {
  front: string;
  back: string;
}

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
