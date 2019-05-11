import { agent } from "supertest";

describe("GET /cards", () => {
  it("it responds 200 with a list of cards", async () => {
    // Arrange
    const front = "Front";
    const back = "Back";

    // Create stack
    // TODO: Create directly instead of via API?
    const card1 = await agent("http://localhost:3000")
      .post("/cards")
      .send({ front, back });

    const card2 = await agent("http://localhost:3000")
      .post("/cards")
      .send({ front, back });

    // Act/Assert
    const res = await agent("http://localhost:3000")
      .get("/cards/47985f6b-436d-468e-a8ff-82936d61d1ea")
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
