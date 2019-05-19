import { APIGatewayProxyHandler } from "aws-lambda";
import { success, unauthorized } from "./utils/response";

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { authorizer } = event.requestContext;

  if (authorizer) {
    return success({ userId: authorizer.claims.sub });
  }

  return unauthorized();
};
