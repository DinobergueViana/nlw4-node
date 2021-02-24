import request from "supertest";
import { app } from "../app";
import createConnection from '../database';

describe("User", () => {

  // roda as migrations antes de realizar o teste
  beforeAll( async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  // teste: criar um usuario
  it("Should be able to create a new user", async () => {

    const response = await request(app).post("/users")
    .send({
      email: "user@example.com",
      name: "User Example"
    });

    expect(response.status).toBe(201);
  });

  // teste: criar usuario com email já cadastrado
  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users")
    .send({
      email: "user@example.com",
      name: "User Example"
    });

    expect(response.status).toBe(400);
  })

});