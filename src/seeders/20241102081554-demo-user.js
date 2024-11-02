"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Alzi Rahmana",
          bio: "Software Developer",
          image: "-",
          email: "alziputra12@gmail.com",
          password: await bcrypt.hash("password123", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          bio: "Project Manager",
          image: "-",
          email: "janesmith@yahoo.com",
          password: await bcrypt.hash("password456", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
