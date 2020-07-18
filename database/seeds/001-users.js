const hashpw = "$2y$14$vqb9c0BRmui5Oho86Th9YeCuR9LI5zfOLYBqbQgq6vKHrkMpmF/Xe";
exports.seed = function (knex) {
  return knex("users").then(function () {
    // Inserts seed entries
    return knex("users").insert([
      {
        username: "PoisonIvy",
        password: hashpw,
      },
      {
        username: "Draco",
        password: hashpw,
      },
      {
        username: "Patches",
        password: hashpw,
      },
      {
        username: "Frodo",
        password: hashpw,
      },
      {
        username: "JLPicard",
        password: hashpw,
      },
    ]);
  });
};
