import { APIGatewayProxyHandler } from "aws-lambda";
import { S3 } from "aws-sdk";
import "source-map-support/register";
import { getUserId } from "./utils/getUserId";
import { getLogger } from "./utils/logger";
import { clientError, serverError, success } from "./utils/response";
import uuid from "uuid";

const s3 = new S3({ signatureVersion: "v4" });
const log = getLogger({ name: "uploadFile" });

interface FileUploadRequest {
  filename: "";
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  log.info("Request Made");
  const bucket = process.env["bucket"];
  if (!bucket) {
    return serverError({ error: "S3 bucket not set" });
  }

  log.info("check event body");
  if (!event.body) {
    return clientError({ error: "No event body" });
  }

  log.info("getting user id");

  log.info({ context: event.requestContext });

  const userId = getUserId(event.requestContext);
  if (!userId) {
    return clientError({ error: "Unauthorized" });
  }

  log.info("parsing body...");
  const uploadRequest: FileUploadRequest = JSON.parse(event.body);
  const { filename } = uploadRequest;
  if (!filename) {
    return clientError({ error: "Filename missing" });
  }

  const key = `${userId}/${uuid()}_${uploadRequest.filename}`;
  const params = { Bucket: bucket, Key: key, Expires: 900 };

  log.info("built key");
  let url;
  try {
    url = await s3.getSignedUrl("putObject", params);
  } catch (e) {
    log.error({ error: e.message });
    return serverError({ error: "Error" });
  }

  log.info("Returning presigned url");
  return success({ url });
};
