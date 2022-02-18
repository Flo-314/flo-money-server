/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Category = require('../models/category');
const User = require('../models/user');
const Payment = require('../models/payment');
const { body, validationResult } = require('express-validator');

exports.category = 
  async (req, res) => {
  console.log(req.body);
  const { name, _id, target, color, isIncome } = req.body;
  // crea nueva categoria
  const newCategory = await new Category({ name, color, isIncome });
  await newCategory.save();

  const user = await User.findById({ _id });
  // busca donde poner categoria, income outcome.
  user[target].push(newCategory._id);
  await user.save();
  res.json({ msg: 'category created' });
};

exports.payment = [
  
    body('ammount', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
    body('name', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
    body('isMonthly', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),
    body('_id', 'muchotexto').trim().isLength({ max: 50, min: 1 }).escape(),

  
  async (req, res) => {
  const { ammount, name, isMonthly, _id, isIncome } = req.body;
  let { date } = req.body;
  // crea nueva categoria
  if (!date) {
    date = new Date();
  }
  const user = await Category.findById({ _id });

  const newPayment = await new Payment({ ammount, name, isMonthly, date, isIncome });
  await newPayment.save();

  // busca donde poner categoria, income outcome.
  user.payments.push(newPayment._id);
  await user.save();
  res.json({ msg: 'payment created' });
}]
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  if (user !== null) {
    if (bcrypt.compareSync(password, user.password) === true) {
      const opts = {};
      opts.expiresIn = 1800;
      const secret = process.env.secretkey;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        userId: user._id,
        token,
      });
    }
    return res.status(401);
  }
  return res.status(401).json({ message: 'Auth Failed' });
};

exports.user = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id }).populate({
    path: 'income outcome projections',
    populate: {
      path: 'payments',
    },
  });
  console.log(user, req.body);
  if (user) {
    const data = { incomes: user.income, outcomes: user.outcome, projections: user.projections };
    res.json({ data });
  }
};
