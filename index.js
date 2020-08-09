const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jokesRouter = require("./jokes/jokes-router");
const usersRouter = require("./auth/auth-router");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/jokes", jokesRouter);
server.use("/api/users", usersRouter);
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
  });
}
module.exports = server;
