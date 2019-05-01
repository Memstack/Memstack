import { agent } from "supertest";

describe("GET /stacks", () => {
  it("it responds 200 with a list of stacks", async () => {
    // Arrange
    const title1 = "test-stack-1";
    const title2 = "test-stack-2";

    // Create stack
    // TODO: Create directly instead of via API?
    const stack1 = await agent("http://localhost:3000")
      .post("/stacks")
      .send({ title: title1 });

    const stack2 = await agent("http://localhost:3000")
      .post("/stacks")
      .send({ title: title2 });

    // Act/Assert
    const res = await agent("http://localhost:3000")
      .get("/stacks")
      .expect(200);

    const responseStack1 = (res.body.items as { id: string }[]).find(
      item => item.id === stack1.body.id
    );

    const responseStack2 = (res.body.items as { id: string }[]).find(
      item => item.id === stack2.body.id
    );

    expect(responseStack1).toBeDefined();
    expect(responseStack2).toBeDefined();
  });
});
