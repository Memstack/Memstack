import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import { getDynamoClient, getEnv } from "./client";
import { DynamoStack } from "./dynamo/schema";
import { mapToStacksList } from "./dynamo/stack";
import { getLogger } from "./logger";
import { success } from "./response";

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "createStack" });

export const handler: APIGatewayProxyHandler = async (_event, _context) => {
  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditions: {
      skey: {
        ComparisonOperator: "EQ",
        AttributeValueList: ["UserId:DummyUser#Stack"]
      }
    },
    IndexName: "SkeyData"
  };

  const result = await documentClient.query(params).promise();

  log.info({ count: result.Count }, "Found stack");

  return success({
    items: mapToStacksList(result.Items as DynamoStack[])
  });
};
