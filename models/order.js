"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "products",
      });

      Order.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        as: "transactions",
      });
    }
  }
  Order.init(
    {
      qty: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
