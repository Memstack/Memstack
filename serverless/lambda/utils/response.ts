import { APIGatewayProxyResult } from "aws-lambda";

export const created = <T extends object>(body?: T): APIGatewayProxyResult => ({
  body: body ? JSON.stringify(body) : "",
  statusCode: 201,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
});

export const success = <T extends object>(body: T): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
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

export const unauthorized = () =>
  error(401, { error: "You are not authorized" });
