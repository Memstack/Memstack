import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { getDynamoClient } from "./client";
import { getEnv } from "./createStack";
import { getLogger } from "./logger";
import { clientError, created, serverError } from "./response";

interface IncomingCard {
  front: string;
  back: string;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = getLogger({ name: "createCard" });

  let tableName;
  try {
    tableName = getEnv("TABLE_NAME");
  } catch (err) {
    log.error({ err });
    return serverError({ error: "TABLE_NAME not set" });
  }

  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  const card: IncomingCard = JSON.parse(event.body);

  const documentClient = getDynamoClient();

  if (!tableName) {
    log.fatal("TABLE_NAME not set");

    return serverError({ error: "No table name specified" });
  }

  const id = uuid();

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

  return created({ id });
};
