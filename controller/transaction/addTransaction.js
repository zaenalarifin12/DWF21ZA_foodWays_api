const { Product } = require("../../models");
const { Transaction } = require("../../models");
const { User } = require("../../models");
const { Order } = require("../../models");
const { transactionById } = require("../../repositories/transaction");

module.exports = async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      userId: req.userId.id,
      status: "success",
    });

    let products = req.body.products.map((product) => ({
      productId: product.id,
      transactionId: newTransaction.id,
      qty: product.qty,
    }));

    const orderProduct = await Order.bulkCreate(products);

    const transaction = await transactionById(newTransaction.id);

    return res.json({
      status: "on the way",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
  }
};
