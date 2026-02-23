const request = require("supertest");

const { app, toUpperCase } = require("./server");

// Test d'intégration sur l'API (pas très utile dans notre cas)
describe("GET /to_uppercase/:text", () => {
  it("retourne le texte en majuscules et le texte original", async () => {
    const res = await request(app).get("/to_uppercase/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ original: "hello", uppercased: "HELLO" });
  });

  it("gère un texte déjà en majuscules", async () => {
    const res = await request(app).get("/to_uppercase/WORLD");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ original: "WORLD", uppercased: "WORLD" });
  });

  it("gère un texte mixte", async () => {
    const res = await request(app).get("/to_uppercase/HeLLo");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ original: "HeLLo", uppercased: "HELLO" });
  });

  it("gère des chiffres et caractères spéciaux", async () => {
    const res = await request(app).get("/to_uppercase/abc123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ original: "abc123", uppercased: "ABC123" });
  });

  it("retourne 404 si le paramètre text est absent", async () => {
    const res = await request(app).get("/to_uppercase/");
    expect(res.statusCode).toBe(404);
  });
});

// Test Unitaire sur la fonction toUpperCase
describe("toUpperCase (fonction unitaire)", () => {
  it("convertit une chaîne en majuscules", () => {
    expect(toUpperCase("hello")).toBe("HELLO");
  });

  it("laisse une chaîne déjà en majuscules inchangée", () => {
    expect(toUpperCase("HELLO")).toBe("HELLO");
  });

  it("gère un texte mixte", () => {
    expect(toUpperCase("HeLLo WoRLd")).toBe("HELLO WORLD");
  });

  it("gère une chaîne vide", () => {
    expect(toUpperCase("")).toBe("");
  });
});
