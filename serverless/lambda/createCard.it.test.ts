import { agent } from "supertest";
import { uuidRegex } from "./utils/uuid";
import { getEndpoint } from "./tests/setup";

describe("POST /cards", () => {
  it("it responds 201 when a card is created", async () => {
    // Arrange
    const front = "Front";
    const back = "Back";

    // Act/Assert
    const res = await agent(getEndpoint())
      .post("/cards")
      .send({ front, back })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(uuidRegex),
        front,
        back
      })
    );
  });
});
