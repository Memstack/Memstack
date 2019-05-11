import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import "source-map-support/register";
import * as yup from "yup";
import { Card, DynamoCard } from "../schema/types";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { clientError, success } from "./response";
import { normaliseCardId, uuidRegex } from "./uuid";

export const mapToCardsList = (queryResult: DynamoCard[]): Card[] =>
  queryResult.map(item => {
    const { front, back } = JSON.parse(item.data);

    return {
      id: normaliseCardId(item.pkey),
      front: front,
      back: back
    };
  });

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

const log = getLogger({ name: "getCards" });

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
