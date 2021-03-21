const { Product } = require("../models");
const { Transaction } = require("../models");
const { User } = require("../models");
const { Order } = require("../models");

exports.transactionById = async (id) => {
  let transaction = null;
  const transactionFromDb = await Transaction.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Order,
        as: "orders",
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      },
      {
        model: User,
        as: "user",
      },
    ],
  }).then((t) => {
    if (t != null) {
      let order = t.orders.map((order) => ({
        qty: order.qty,
        id: order.product.id,
        title: order.product.title,
        price: order.product.price,
        image: order.product.image,
      }));

      transaction = {
        id: t.id,
        status: t.status,
        userOrder: {
          id: t.user.id,
          fullName: t.user.fullName,
          location: t.user.location,
          email: t.user.email,
        },
        order: order,
      };
    }
  });

  return transaction;
};

exports.transactionsByUserId = async (user_id) => {
  let transactions = null;
  const transactionFromDb = await Transaction.findAll({
    include: [
      {
        model: Order,
        as: "orders",
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      },
      {
        model: User,
        as: "user",
        where: {
          id: user_id,
        },
      },
    ],
    order: [["createdAt", "DESC"]],
  }).then((transaction) => {
    transactions = transaction.map((t) => ({
      id: t.id,
      status: t.status,
      userOrder: {
        id: t.user.id,
        fullName: t.user.fullName,
        location: t.user.location,
        email: t.user.email,
      },
      order: t.orders.map((order) => ({
        id: order.product.id,
        title: order.product.title,
        price: order.product.price,
        image: order.product.image,
        qty: order.qty,
      })),
    }));
  });

  return transactions;
};
