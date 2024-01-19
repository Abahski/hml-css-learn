'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
      title: 'Percobaan nih',
      start_date: new Date(),
      end_date: new Date(),
      description: 'Ini percobaan',
      technologies: ["HTML", "CSS"],
      image: 'tes',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
