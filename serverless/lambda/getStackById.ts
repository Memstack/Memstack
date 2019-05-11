import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as yup from "yup";
import { getDynamoClient, getEnv } from "./client";
import { mapToCardsList } from "./dynamo/card";
import { DynamoCard, DynamoStack } from "./dynamo/schema";
import { mapItemToStack } from "./dynamo/stack";
import { getLogger } from "./logger";
import { clientError, notFound, success } from "./response";
import { denormaliseStackId } from "./uuid";

interface GetStackByIdParams {
  stackId: string;
}

const getStackByIdParamsSchema = yup.object<GetStackByIdParams>({
  stackId: yup.string().required()
});

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "createStack" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  let stackId: string;

  try {
    ({ stackId } = await getStackByIdParamsSchema.validate(
      event.pathParameters
    ));
  } catch (err) {
    return clientError({ error: "Missing stack ID parameter" });
  }

  // Query Dynamo for stack metadata
  const getStackParams: DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      pkey: denormaliseStackId(stackId),
      skey: "UserId:DummyUser#Stack"
    }
  };

  const stackResult = await documentClient.get(getStackParams).promise();

  const stack = stackResult.Item as DynamoStack;

  if (!stack) {
    return notFound({ error: "Could not find the specified stack" });
  }

  log.info({ stack });

  const cardsAvl = `UserId:DummyUser#StackId:${stackId}`;

  log.info({ cardsAvl }, "Fetching cards using skey EQ query");

  // Query Dynamo for cards in stack
  const getCardsInStackParams: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditions: {
      skey: {
        ComparisonOperator: "EQ",
        AttributeValueList: [cardsAvl]
      }
    },
    IndexName: "SkeyData"
  };

  const cardsResult = await documentClient
    .query(getCardsInStackParams)
    .promise();

  log.info({ cardsResult });

  return success({
    ...mapItemToStack(stack),
    cards: mapToCardsList(cardsResult.Items as DynamoCard[])
  });
};
