import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import { DynamoStack } from "../schema/card";
import { getDynamoClient } from "./client";
import { getLogger } from "./logger";
import { serverError, success } from "./response";
import { normaliseStackId } from "./uuid";

export const getEnv = (name: string): string => {
  const envVar = process.env[name];

  if (!envVar) {
    throw new Error(`Environment variable '${name}' is not set`);
  } else {
    return envVar;
  }
};

const mapToResponse = (queryResult: DynamoStack[]): Stack[] =>
  queryResult.map(item => ({
    id: normaliseStackId(item.pkey),
    title: item.data
  }));

interface Stack {
  id: string;
  title: string;
}

export const handler: APIGatewayProxyHandler = async (_event, _context) => {
  const log = getLogger({ name: "createStack" });

  let tableName;
  try {
    tableName = getEnv("TABLE_NAME");
  } catch (err) {
    log.error({ err });
    return serverError({ error: "TABLE_NAME not set" });
  }

  const documentClient = getDynamoClient();

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

  return success({
    items: mapToResponse(result.Items as DynamoStack[])
  });
};
