import { agent } from "supertest";

describe("POST /cards", () => {
  it("it responds 200", async () => {
    // Arrange

    // Act/Assert
    await agent()
      .post("/cards")
      .send({ front: "Front", back: "Back" })
      .expect(200)
      .expect({ front: "Front", back: "Back", id: "foobar" });
  });
});
