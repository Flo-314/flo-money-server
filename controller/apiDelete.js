const Category = require('../models/category');
const Payment = require('../models/payment');

exports.category = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const category = await Category.findById({ _id }).populate('payments');
    category.payments.forEach(async (payment) => {
      // eslint-disable-next-line no-underscore-dangle
      await Payment.deleteOne({ _id: payment._id });
    });
    await Category.deleteOne({ _id });
    res.json({ msg: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
exports.payment = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await Payment.deleteOne({ _id });
    res.json({ msg: 'Payment deleted' });
  } catch (err) {
    next(err);
  }
};
