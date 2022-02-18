const Category = require('../models/category');
const Payment = require('../models/payment');

exports.category = async (req, res) => {
  const { name, _id, color } = req.body;
  const category = await Category.findById({ _id });
  category.name = name;
  category.color = color;
  await category.save();
  res.json({ msg: 'category name edited' });
};
exports.payment = [  
  
body('ammount', 'mucho texto').trim().isLength({ max: 50, min: 1 }).escape(),
body('name', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
body('isMonthly', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
body('_id', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
async (req, res) => {
  const { ammount, name, isMonthly, _id } = req.body;
  console.log(req.body);

  const payment = await Payment.findById({ _id });
  payment.ammount = ammount;
  payment.name = name;
  payment.isMonthly = isMonthly;
  await payment.save();
  res.json({ msg: 'payment name edited' });
}]