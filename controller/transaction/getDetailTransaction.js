const db = require("../../models");
const { transactionById } = require("../../repositories/transaction");
const Transaction = db.transaction;

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await transactionById(id);

    if (transaction == null) {
      return res.json({
        status: "error not found",
        message: "transaction not found",
      });
    }

    return res.json({
      status: "success",
      data: {
        transaction: transaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
