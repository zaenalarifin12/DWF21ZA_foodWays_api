"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: "userId",
        as: "products",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transaction",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      fullName: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      location: DataTypes.STRING,
      image: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
