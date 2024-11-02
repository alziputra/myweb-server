"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi many-to-one dengan model User
      Portfolio.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  Portfolio.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      project_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Portfolio",
    }
  );

  return Portfolio;
};
