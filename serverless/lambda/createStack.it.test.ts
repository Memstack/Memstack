import { agent } from "supertest";
import { uuidRegex } from "./uuid";

describe("POST /stacks", () => {
  it("it responds 201 when a stack is created", async () => {
    // Arrange
    const title = "test-stack";

    // Act/Assert
    const res = await agent("http://localhost:3000")
      .post("/stacks")
      .send({ title })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.stringMatching(uuidRegex), title })
    );
  });
});
