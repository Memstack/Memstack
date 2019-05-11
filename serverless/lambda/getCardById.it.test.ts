import { agent } from "supertest";
import { getEndpoint } from "./tests/setup";

describe("GET /cards/{cardId}", () => {
  it("should return the given card", async () => {
    // Arrange
    const front = "Front";
    const back = "Back";

    const card = await agent(getEndpoint())
      .post("/cards")
      .send({ front, back });

    const { id } = card.body;

    const href = `/cards/${id}`;

    // Act/Assert
    const res = await agent(getEndpoint())
      .get(`/cards/${id}`)
      .expect(200);

    expect(res.body).toEqual({ id, front, back, href });
  });
});
