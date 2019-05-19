import { APIGatewayEventRequestContext } from "aws-lambda";

export const getUserId = (requestContext: APIGatewayEventRequestContext) => {
  const { authorizer } = requestContext;
  if (authorizer) {
    return authorizer.claims.sub;
  }
  return null;
};
