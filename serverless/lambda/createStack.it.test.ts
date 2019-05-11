import { agent } from "supertest";
import { uuidRegex } from "./utils/uuid";
import { getEndpoint } from "./tests/setup";

describe("POST /stacks", () => {
  it("it responds 201 when a stack is created", async () => {
    // Arrange
    const title = "test-stack";

    // Act/Assert
    const res = await agent(getEndpoint())
      .post("/stacks")
      .send({ title })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.stringMatching(uuidRegex), title })
    );
  });
});
