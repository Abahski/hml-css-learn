'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};