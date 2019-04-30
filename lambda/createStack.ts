import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { getDynamoClient } from "./client";
import { getLogger } from "./logger";
import { clientError, created, serverError } from "./response";

interface IncomingStack {
  title: string;
}

export const getEnv = (name: string): string => {
  const envVar = process.env[name];

  if (!envVar) {
    throw new Error(`Environment variable '${name}' is not set`);
  } else {
    return envVar;
  }
};

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = getLogger({ name: "createStack" });

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

  const stack: IncomingStack = JSON.parse(event.body);

  const documentClient = getDynamoClient();

  const id = uuid();

  log.info({ stackId: id }, "Creating new stack");

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
