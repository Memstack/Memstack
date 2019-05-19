import { APIGatewayEventRequestContext } from "aws-lambda";

export const getUserId = (requestContext: APIGatewayEventRequestContext) => {
  try {
    const { authorizer } = requestContext;
    if (authorizer) {
      return authorizer.claims.sub;
    }
  } catch {
    return null;
  }
};
