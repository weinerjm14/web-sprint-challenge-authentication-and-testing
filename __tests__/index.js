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

test("user can register", async () => {
  const reguser = await supertest(server).post("/api/users/register").send({
    username: "Ozzy",
    password: "batty123",
  });

  expect(reguser.statusCode).toBe(201);
  expect(reguser.body.id).toBeDefined();
  expect(reguser.body.username).toBe("Ozzy");
  expect(reguser.body.password).toBeDefined;
});
// test("can get dad jokes", async () => {
//   const getJokes = await supertest(server).get("/jokes");

//   expect(getJokes.statusCode).toBe(200);
//   expect(getJokes.req.body[0].id).toBeDefined();
//   expect(getJokes.body[0].joke).toBeDefined();
// });

test("user can log in", async () => {
  const logInUser = await supertest(server).post("/api/users/login").send({
    username: "PoisonIvy",
    password: "abc123",
  });
  expect(logInUser.statusCode).toBe(200);
  expect(logInUser.body.token).toBeDefined;
  expect(logInUser.body.message).toBe("Welcome PoisonIvy!");
});
