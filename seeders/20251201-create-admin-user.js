"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        full_name: "Administrator",
        email: "admin@gmail.com",
        username: "kimanh",
        password_hash: bcrypt.hashSync("kimanh@123", 10),
        role: "admin",
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Minh Thu",
        email: "minhthu@gmail.com",
        username: "minhthu",
        password_hash: bcrypt.hashSync("minhthu@123", 10),
        role: "user", // user thường
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "Users",
      {
        email: ["admin@gmail.com", "minhthu@gmail.com"],
      },
      {}
    );
  },
};
