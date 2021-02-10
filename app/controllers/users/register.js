"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");

const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repositories");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  pass: Joi.string().min(4).max(100).required(),
});

async function registerUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, pass } = req.body;
    const existUser = await findUserByEmail(email);
    if (existUser) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(pass, 12);

    await createUser(email, passwordHash);

    res.status(201).send({ message: "Usuario creado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUser;
