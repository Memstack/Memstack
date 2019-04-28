import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";

import { createLogger, stdSerializers } from "bunyan";
import { DynamoDB } from "aws-sdk";


interface incomingCard {
    front: string;
    back: string;
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const log = createLogger({
    name: "createCard",
    serializers: { err: stdSerializers.err }
  });
  let card : incomingCard 
  if(event.body){
    card = JSON.parse(event.body)
  }

  let documentClient: DynamoDB.DocumentClient;
  if (process.env.NODE_ENV === "development") {
    documentClient = new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET"
    });
  } else {
    documentClient = new DynamoDB.DocumentClient();
  }

  const tableName = "Memstack";

  if (!tableName) {
    log.fatal("TABLE_NAME not set");

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No table name specified" })
    };
  }

  const id: string = uuid();
  const params = {
    TableName: tableName,
    Item: {
      "pkey": `card-${id}`,
      "skey": "UserId:DummyUser#StackId:Stack-All",
      "front": card!.front,
      "back": card!.back,
    }
  };
  await documentClient.put(params).promise();

    return {
      statusCode: 200,
    body:'',
    };
  };
