import { agent } from "supertest";
import { getEndpoint } from "./tests/setup";
import jwt from "jsonwebtoken";

describe("POST /uploadFile", () => {
  it("it responds 200 with an s3 presigned url", async () => {
    const filename = "cover-image.png";
    const userId = "1234";
    const token = jwt.sign({ sub: userId }, "super-secret");

    const res = await agent(getEndpoint())
      .post("/upload")
      .send({ filename })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const presignedUrl = new URL(res.body.url);
    const pathParts = presignedUrl.pathname.split("/");

    expect(pathParts[1]).toEqual(userId);
    expect(pathParts[2].endsWith(`_${filename}`)).toBeTruthy();
  });
});
