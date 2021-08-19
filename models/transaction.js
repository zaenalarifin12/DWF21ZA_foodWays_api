"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Transaction.belongsTo(models.User, {
        foreignKey: "partnerId",
        as: "partner",
      });

      Transaction.hasMany(models.Order, {
        foreignKey: "transactionId",
        as: "orders",
      });
    }
  }
  Transaction.init(
    {
      address: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
