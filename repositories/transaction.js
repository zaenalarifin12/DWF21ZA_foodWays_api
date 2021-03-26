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
    let total = 0;
    transactions = transaction.map((t) => ({
      id: t.id,
      address: t.address,
      status: t.status,
      createdAt: t.createdAt,
      userOrder: {
        id: t.user.id,
        fullName: t.user.fullName,
        location: t.user.location,
        email: t.user.email,
      },
      order: t.orders.map((order) => {
        total += parseInt(order.product.price) * parseInt(order.qty);

        return {
          id: order.product.id,
          title: order.product.title,
          price: order.product.price,
          image: order.product.image,
          qty: order.qty,
        };
      }),
      total: total,
    }));
  });

  return transactions;
};

exports.transactionsByPartnerId = async (user_id) => {
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
        as: "partner",
        where: {
          id: user_id,
        },
      },
      {
        model: User,
        as: "user",
      },
    ],
    order: [["createdAt", "DESC"]],
  }).then((transaction) => {
    let total = 0;
    transactions = transaction.map((t) => ({
      id: t.id,
      address: t.address,
      status: t.status,
      createdAt: t.createdAt,
      userOrder: {
        id: t.user.id,
        fullName: t.user.fullName,
        location: t.user.location,
        email: t.user.email,
      },
      order: t.orders.map((order) => {
        total += parseInt(order.product.price) * parseInt(order.qty);

        return {
          id: order.product.id,
          title: order.product.title,
          price: order.product.price,
          image: order.product.image,
          qty: order.qty,
        };
      }),
      total: total,
    }));
  });

  return transactions;
};
