const { Product } = require("../../models");
const { Transaction } = require("../../models");
const { User } = require("../../models");
const { Order } = require("../../models");

module.exports = async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      userId: req.userId.id,
    });

    let products = req.body.products.map((product) => ({
      productId: product.id,
      transactionId: newTransaction.id,
      qty: product.qty,
    }));

    const orderProduct = await Order.bulkCreate(products);

    let transaction = null;
    const transactionFromDb = await Transaction.findOne({
      where: {
        id: newTransaction.id,
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
      let order = t.orders.map((order) => ({
        qty: order.qty,
        id: order.product.id,
        title: order.product.title,
        price: order.product.price,
        image: order.product.image,
      }));

      transaction = {
        id: t.id,
        userOrder: {
          id: t.user.id,
          fullName: t.user.fullName,
          location: t.user.location,
          email: t.user.email,
        },
        order: order,
      };
    });

    return res.json({
      status: "on the way",
      data: transaction,
    });
  } catch (error) {}
};
