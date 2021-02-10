"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { findUserByEmail } = require("../../repositories/users-repositories");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  pass: Joi.string().min(4).max(100).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, pass } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      const error = new Error("El email/pass no es correcto");
      error.status = 403;
      throw error;
    }
    const isValidPassword = await bcrypt.compare(pass, user.pass);
    if (!isValidPassword) {
      const error = new Error("El email/pass no es correcto");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id_usuario } = user;
    const jwtTokenExpiration = "40m";
    const payload = {
      id_usuario,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(response);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = loginUser;
