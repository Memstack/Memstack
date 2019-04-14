import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

import { createLogger, stdSerializers } from "bunyan";
import { DynamoDB } from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (_event, _context) => {
  const log = createLogger({
    name: "getDeck",
    serializers: { err: stdSerializers.err }
  });

  log.info({ env: process.env.NODE_ENV });

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

  const tableName = process.env.TABLE_NAME;

  if (!tableName) {
    log.fatal("TABLE_NAME not set");

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No table name specified" })
    };
  }

  try {
    log.info({ tableName }, "Scanning table");

    const results = await documentClient
      .scan({
        TableName: tableName
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        cards: results.Items
      })
    };
  } catch (err) {
    log.error({ err, tableName }, "Failed so scan table");

    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to scan table ${tableName}` })
    };
  }
};
