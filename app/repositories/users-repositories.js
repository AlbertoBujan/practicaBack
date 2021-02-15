"use strict";

const fs = require("fs");

async function insertUserToJsonFile(email, passwordHash) {
  let usersList = {
    users: [],
  };

  fs.readFile("usersList.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      usersList = JSON.parse(data);
      usersList.users.push({ email: email, password: passwordHash });
      let json = JSON.stringify(usersList);
      fs.writeFile("usersList.json", json, "utf8", function () {
        console.log("Usuario escrito en archivo JSON");
      });
    }
  });
}

async function findUserByEmail(email) {
  fs.readFile("usersList.json", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let usersList = JSON.parse(data);

      let emails = usersList.users.map((user) => user.email);

      let emailMatch = emails.find((element) => element === email);
      // console.log(emailMatch);
      return emailMatch;
    }
  });
}

module.exports = {
  insertUserToJsonFile,
  findUserByEmail,
};
