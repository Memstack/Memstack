import { agent } from "supertest";
import { getEndpoint } from "./tests/setup";

describe("GET /user/{userId}/cards", () => {
  it("it responds 200 with a list of cards", async () => {
    // Arrange
    const front = "Front";
    const back = "Back";

    // Create stack
    const card1 = await agent(getEndpoint())
      .post("/cards")
      .send({ front, back });

    const card2 = await agent(getEndpoint())
      .post("/cards")
      .send({ front, back });

    // Act/Assert
    const res = await agent(getEndpoint())
      .get("/user/47985f6b-436d-468e-a8ff-82936d61d1ea/cards")
      .expect(200);

    const responseStack1 = (res.body.items as { id: string }[]).find(
      item => item.id === card1.body.id
    );

    const responseStack2 = (res.body.items as { id: string }[]).find(
      item => item.id === card2.body.id
    );

    expect(responseStack1).toBeDefined();
    expect(responseStack2).toBeDefined();
  });
});
