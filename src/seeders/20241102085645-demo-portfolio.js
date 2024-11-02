"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Portfolios",
      [
        {
          user_id: 1,
          title: "Web Development Project",
          description: "A project focused on building responsive websites.",
          image: "https://example.com/project1.jpg",
          project_url: "https://project1.example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          title: "Mobile App Development",
          description: "A mobile application for managing tasks.",
          image: "https://example.com/project2.jpg",
          project_url: "https://project2.example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Portfolios", null, {});
  },
};
