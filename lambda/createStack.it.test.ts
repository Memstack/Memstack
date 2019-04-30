import { agent } from "supertest";

describe("POST /stacks", () => {
  it("it responds 201 when a stack is created", async () => {
    // Arrange

    // Act/Assert
    await agent("http://localhost:3000")
      .post("/stacks")
      .send({ title: "test-stack" })
      .expect(201);
  });
});
