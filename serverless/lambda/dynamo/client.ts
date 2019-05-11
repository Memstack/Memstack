import { DynamoDB } from "aws-sdk";

export const getDynamoClient = (): DynamoDB.DocumentClient => {
  if (process.env.NODE_ENV === "development") {
    return new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET"
    });
  } else {
    return new DynamoDB.DocumentClient();
  }
};
