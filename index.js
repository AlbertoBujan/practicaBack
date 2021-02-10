"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.SERVER_PORT || 3080;

const usersRouter = require("./app/routes/users-routes");

app.use("/practica-back/", usersRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
