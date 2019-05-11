import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import * as yup from "yup";
import { getDynamoClient } from "./dynamo/client";
import { getEnv } from "./dynamo/getEnv";
import { mapToCardsList } from "./dynamo/card";
import { DynamoCard } from "./dynamo/schema";
import { getLogger } from "./utils/logger";
import { clientError, success } from "./utils/response";
import { uuidRegex } from "./utils/uuid";

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

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "getCardsByUserId" });

//TODO: update this to use userId once we have auth set up
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  let userId;
  try {
    userId = await userIdValidator.validate(event.pathParameters);
  } catch (err) {
    return clientError({ error: (err as yup.ValidationError).message });
  }

  log.info({ userId }, "Got user ID");

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

  const result = await documentClient.query(params).promise();

  return success({
    items: mapToCardsList(result.Items as DynamoCard[])
  });
};
