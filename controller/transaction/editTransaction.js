const { Transaction } = require("../../models");
const { transactionById } = require("../../repositories/transaction");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const oldTransaction = await Transaction.findOne({
      where: {
        id: id,
      },
    });

    if (oldTransaction == null) {
      return res.status(404).json({
        status: "transaction not found",
        message: "transaction not found",
      });
    }

    const editTransaction = await Transaction.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const transaction = await transactionById(id);

    return res.json({
        status: "success",
        data : {
            transaction: transaction
        }
    })
  } catch (error) {
      console.log(error);
  }
};
