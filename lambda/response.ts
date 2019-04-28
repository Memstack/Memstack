import { APIGatewayProxyResult } from "aws-lambda";

export const created = <T extends object>(body?: T): APIGatewayProxyResult => ({
  body: body ? JSON.stringify(body) : "",
  statusCode: 201
});

export const success = <T extends object>(body: T): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode: 200
});

interface ErrorResponse {
  error: string;
}

export const clientError = <T extends ErrorResponse>(
  body: T
): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode: 400
});

export const serverError = <T extends ErrorResponse>(
  body: T
): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode: 500
});
