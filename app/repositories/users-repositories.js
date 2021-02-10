"use strict";

const database = require("../infrastructure/database");

async function createUser(email, passwordHash) {
  const pool = await database.getPool();
  const insertQuery = "INSERT INTO usuario (email, pass) VALUES(?, ?)";
  const [created] = await pool.query(insertQuery, [email, passwordHash]);

  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE email = ?";
  const [users] = await pool.query(query, email);

  return users[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
