import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { clientError, created } from "./response";
import { defaultValidationOptions } from "./validation";
import { IncomingStack, incomingStackSchema } from "../../schema";
import { mapStackToItem } from "./dynamo/stack";

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "createStack" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  let stack: IncomingStack = JSON.parse(event.body);

  try {
    stack = await incomingStackSchema.validate(stack, defaultValidationOptions);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate new stack");

    return clientError({ error: message });
  }

  const id = uuid();

  log.info({ stackId: id }, "Creating new stack");

  const params = {
    TableName: tableName,
    Item: mapStackToItem({ id, ...stack })
  };

  await documentClient.put(params).promise();

  return created({ ...stack, id });
};
