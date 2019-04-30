import { agent } from "supertest";
import { uuidRegex } from "./uuid";

describe("POST /cards", () => {
  it("it responds 201 when a card is created", async () => {
    // Arrange

    // Act/Assert
    const res = await agent("http://localhost:3000")
      .post("/cards")
      .send({ front: "Front", back: "Back" })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.stringMatching(uuidRegex) })
    );
  });
});
