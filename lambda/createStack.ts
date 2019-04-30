import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { getDynamoClient } from "./client";
import { getLogger } from "./logger";
import { clientError, created, serverError } from "./response";
import { defaultValidationOptions } from "./validation";

interface IncomingStack {
  title: string;
}

const incomingStackSchema = yup.object<IncomingStack>({
  title: yup.string().required()
});

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

  let stack: IncomingStack = JSON.parse(event.body);

  try {
    stack = await incomingStackSchema.validate(stack, defaultValidationOptions);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate new stack");

    return clientError({ error: message });
  }

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

  return created({ ...stack, id });
};
