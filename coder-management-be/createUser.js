const { faker } = require("@faker-js/faker");
const { create } = require("domain");
const fs = require("fs");
const path = require("path");

const createUser = () => {
  return {
    name: faker.person.firstName(),
    role: "employee",
    tasks: [],
  };
};

const users = Array.from({ length: 10 }, createUser);

fs.writeFile(
  path.join(
    "D:",
    "Github",
    "CoderManagement",
    "coder-management-be",
    "users.json"
  ),
  JSON.stringify(users, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Data written to file");
  }
);
