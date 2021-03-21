const { transactionsByUserId } = require("../../repositories/transaction");

module.exports = async (req, res) => {
  try {
    const transaction = await transactionsByUserId(req.userId.id);

    return res.json({
      status: "success",
      data: {
        transaction: transaction,
      },
    });
  } catch (error) {
      
  }
};
