import { APIGatewayProxyHandler } from "aws-lambda";
import * as yup from "yup";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import { DynamoCard, Card } from "../schema/types";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { serverError, success, clientError } from "./response";
import { normaliseCardId, uuidRegex } from "./uuid";

const mapToResponse = (queryResult: DynamoCard[]): Card[] =>
  queryResult.map(item => ({
    id: normaliseCardId(item.pkey),
    front: item.front,
    back: item.back
  }));

interface UserId {
  userId: string;
}

const uuidErrorMessage = "${path} should be a valid UUID";

const userIdValidator = yup.object<UserId>({
  userId: yup
    .string()
    .required()
    .matches(uuidRegex, uuidErrorMessage)
});

//TODO: update this to use userId once we have auth set up
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = getLogger({ name: "getCards" });

  let tableName;
  try {
    tableName = getEnv("TABLE_NAME");
  } catch (err) {
    log.error({ err });
    return serverError({ error: "TABLE_NAME not set" });
  }

  let userId;
  try {
    userId = await userIdValidator.validate(event.pathParameters);
  } catch (err) {
    return clientError({ error: (err as yup.ValidationError).message });
  }

  const documentClient = getDynamoClient();

  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditions: {
      skey: {
        ComparisonOperator: "EQ",
        AttributeValueList: ["UserId:DummyUser#StackId:Stack-All"]
      }
    },
    IndexName: "SkeyData"
  };
  log.error(params);
  const result = await documentClient.query(params).promise();
  log.error(result);
  return success({
    items: mapToResponse(result.Items as DynamoCard[])
  });
};
