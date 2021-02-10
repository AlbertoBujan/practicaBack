"use strict";

function createJsonError(err, res) {
  if (err.name === "ValidationError") {
    err.status = 400;
  }

  res.status(err.status || 500);
  res.send({ error: err.message });
}

module.exports = createJsonError;
