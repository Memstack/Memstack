import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as yup from "yup";
import { DynamoCard, DynamoStack } from "../schema/types";
import { getDynamoClient, getEnv } from "./client";
import { mapToCardsList } from "./getCards";
import { getLogger } from "./logger";
import { clientError, success } from "./response";

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
    return clientError({ error: "Missing stack Id parameter" });
  }

  // Query Dynamo for stack metadata
  const getStackParams: DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      pkey: "Stack-All",
      skey: "UserId:DummyUser#Stack"
    }
  };

  const stackResult = await documentClient.get(getStackParams).promise();

  const item = stackResult.Item as DynamoStack;

  const cardsAvl = `UserId:DummyUser#StackId:${stackId}`;

  log.info({ cardsAvl }, "Fetching cards using skey EQ query");

  // Query Dynamo for cards in stack
  const getCardsInStackParams: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditions: {
      skey: {
        ComparisonOperator: "EQ",
        AttributeValueList: [
          "UserId:DummyUser#StackId:393373d0-7afc-43fc-a41f-33c4cdaf2d65"
        ]
      }
    },
    IndexName: "SkeyData"
  };

  const cardsResult = await documentClient
    .query(getCardsInStackParams)
    .promise();

  log.info({ cardsResult });

  return success({
    id: stackId,
    title: item.data,
    cards: mapToCardsList(cardsResult.Items as DynamoCard[])
  });
};
