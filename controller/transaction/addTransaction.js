const { Product } = require("../../models");
const { Transaction } = require("../../models");
const { User } = require("../../models");
const { Order } = require("../../models");
const { transactionById } = require("../../repositories/transaction");

module.exports = async (req, res) => {
  try {
    req.body.products.map(async (product) => {
      let p = await Product.findOne({ where: { id: product.id } });

      if (p == null) {
        return res.status(404).json({
          message: "product not found",
        });
      }
    });

    const newTransaction = await Transaction.create({
      partnerId: req.body.partnerId,
      userId: req.userId.id,
      address: req.body.address,
      status: "waiting approve",
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
