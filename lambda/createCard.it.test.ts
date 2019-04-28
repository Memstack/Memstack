import { agent } from "supertest";

describe("POST /cards", () => {
  it("it responds 201 when a card is created", async () => {
    // Arrange

    // Act/Assert
    await agent("http://localhost:3000")
      .post("/cards")
      .send({ front: "Front", back: "Back" })
      .expect(201);
  });
});
