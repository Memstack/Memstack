import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import { DynamoStack, Stack } from "../../schema";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { success } from "./response";
import { normaliseStackId } from "./uuid";

const mapToResponse = (queryResult: DynamoStack[]): Stack[] =>
  queryResult.map(item => ({
    id: normaliseStackId(item.pkey),
    title: item.data,
    description: item.description,
    image: item.image
  }));

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
    items: mapToResponse(result.Items as DynamoStack[])
  });
};
