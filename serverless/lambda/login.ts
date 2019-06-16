import { APIGatewayProxyHandler } from "aws-lambda";
import axios, { AxiosError } from "axios";
import { Cookie } from "tough-cookie";
import * as yup from "yup";
import { getLogger } from "./utils/logger";
import { clientError, unauthorized } from "./utils/response";
import { getEnv } from "./dynamo/getEnv";

interface AuthCodeRequest {
  code: string;
}

interface OAuth2Response {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
}

const authCodeRequestSchema = yup.object<AuthCodeRequest>({
  code: yup.string().required()
});

const log = getLogger({ name: "login" });

const loginRedirect = getEnv("LOGIN_REDIRECT");
const clientId = getEnv("COGNITO_CLIENT_ID");
const clientSecret = getEnv("COGNITO_CLIENT_SECRET");

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.body) {
    return clientError({ error: "No body provided" });
  }

  const body = JSON.parse(event.body);

  let code: string;
  try {
    ({ code } = await authCodeRequestSchema.validate(body));
  } catch {
    return clientError({ error: "No authorization code provided" });
  }

  log.info({ code, clientId, clientSecret });

  const formData = new URLSearchParams();
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", loginRedirect);

  try {
    const result = await axios.post<OAuth2Response>(
      "https://memstack-dev.auth.eu-west-2.amazoncognito.com/oauth2/token",
      formData,
      { auth: { username: clientId, password: clientSecret } }
    );

    /*eslint-disable */
    const { id_token } = result.data;

    const cookie = new Cookie({
      key: "Authorization",
      value: `Bearer ${id_token}`,
      secure: true,
      httpOnly: true,
      domain: "https://dev.memstack.io/"
    });

    /*eslint-enable */

    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      statusCode: 200,
      body: JSON.stringify({ Cookie: cookie.toString() })
    };

    log.info({ cookie, response });

    return response;
  } catch (err) {
    const error = err as AxiosError;

    log.error({ err: error.response && error.response.data });

    return unauthorized();
  }
};
