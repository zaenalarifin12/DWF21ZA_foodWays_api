const User = require("../../models");
const {
  transactionsByUserId,
  transactionsByPartnerId,
} = require("../../repositories/transaction");
const { userById } = require("../../repositories/user");

module.exports = async (req, res) => {
  try {
    const user = await userById(req, req.userId.id);
    
    let transaction;
    
    if (user.role == "customer") {
      transaction = await transactionsByUserId(req.userId.id);
    } else {
      //partner
      transaction = await transactionsByPartnerId(req.userId.id);
    }

    return res.json({
      status: "success",
      data: {
        transactions: transaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
