"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi many-to-one dengan model User
      BlogPost.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  BlogPost.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BlogPost",
    }
  );
  return BlogPost;
};
