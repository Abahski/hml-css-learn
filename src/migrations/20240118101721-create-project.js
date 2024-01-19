'use strict';
/** @type {import('sequelize-cli').Migration} */

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
      type: DataTypes.STRING,
      allowNull: false,
      },
      start_date: { 
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: { 
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      technologies: {
        type: Sequelize.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      duration: {
        allowNull : false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};