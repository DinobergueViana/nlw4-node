import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from '../database';

describe("Survey", () => {

  // roda as migrations antes de realizar o teste
  beforeAll( async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  // dropando o database após os testes serem finalizados
  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close()
  });

  // teste: criar um survey
  it("Should be able to create a new survey", async () => {

    const response = await request(app).post("/surveys")
    .send({
      title: "Title example",
      description: "Description example"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys")
    .send({
      title: "Title example2",
      description: "Description example2"
    });

    const response = await request(app).get("/surveys");

    expect(response.status).toBe(200);
  })

});