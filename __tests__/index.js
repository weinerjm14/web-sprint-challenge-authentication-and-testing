const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

beforeEach(async () => {
  // re-run the seeds and start with a fresh database for each test
  await db.seed.run();
});

afterAll(async () => {
  // closes the database connection so the jest command doesn't stall
  await db.destroy();
});
