import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { getDynamoClient, getEnv } from "./client";
import { getLogger } from "./logger";
import { clientError, created } from "./response";
import { defaultValidationOptions } from "./validation";

interface IncomingCard {
  front: string;
  back: string;
}

const incomingCardSchema = yup.object<IncomingCard>({
  front: yup.string().required(),
  back: yup.string().required()
});

const tableName = getEnv("TABLE_NAME");
const documentClient = getDynamoClient();

const log = getLogger({ name: "createCard" });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  let card: IncomingCard = JSON.parse(event.body);

  try {
    card = await incomingCardSchema.validate(card, defaultValidationOptions);
  } catch (err) {
    const { message } = err as yup.ValidationError;

    log.error({ message }, "Failed to validate new card");

    return clientError({ error: message });
  }

  const id = uuid();

  const params = {
    TableName: tableName,
    Item: {
      pkey: `Card-${id}`,
      skey: "UserId:DummyUser#StackId:Stack-All",
      data: JSON.stringify({ front: card.front, back: card.back })
    }
  };

  await documentClient.put(params).promise();

  return created({ ...card, id });
};
