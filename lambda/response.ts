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

const error = <T extends ErrorResponse>(
  statusCode: number,
  body: T
): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode
});

export const clientError = <T extends ErrorResponse>(body: T) =>
  error(400, body);

export const notFound = <T extends ErrorResponse>(body: T) => error(404, body);

export const serverError = <T extends ErrorResponse>(body: T) =>
  error(500, body);
