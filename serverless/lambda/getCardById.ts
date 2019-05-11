import { APIGatewayProxyHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as yup from "yup";
import { mapItemToCard } from "./dynamo/card";
import { getDynamoClient } from "./dynamo/client";
import { getEnv } from "./dynamo/getEnv";
import { DynamoCard } from "./dynamo/schema";
import { getLogger } from "./utils/logger";
import { clientError, notFound, success } from "./utils/response";
import { denormaliseCardId } from "./utils/uuid";

interface GetCardByIdParams {
  cardId: string;
}

const getCardByIdParamsSchema = yup.object<GetCardByIdParams>({
  cardId: yup.string().required()
});

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "getCardById" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  let cardId: string;

  try {
    ({ cardId } = await getCardByIdParamsSchema.validate(event.pathParameters));
  } catch (err) {
    return clientError({ error: "Missing stack ID parameter" });
  }

  // Query Dynamo for stack metadata
  const getStackParams: DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      pkey: denormaliseCardId(cardId),
      skey: "UserId:DummyUser#StackId:Stack-All"
    }
  };

  const stackResult = await documentClient.get(getStackParams).promise();

  const card = stackResult.Item as DynamoCard;

  if (!card) {
    return notFound({ error: "Could not find the specified card" });
  }

  log.debug({ cardId }, "Found card");

  return success(mapItemToCard(card));
};
