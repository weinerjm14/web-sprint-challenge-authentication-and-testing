const db = require("../database/dbConfig");

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}
function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

async function create(data) {
  const [id] = await db("users").insert(data);
  return findById(id);
}

async function update(id, data) {
  await db("users").where({ id }).update(data);
  return findById(id);
}

function remove(id) {
  return db("users").where({ id }).del();
}

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
  findBy,
};
