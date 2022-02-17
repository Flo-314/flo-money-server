/* eslint-disable no-underscore-dangle */
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Payment = require('../models/payment');
const Category = require('../models/category');

require('dotenv').config();

exports.post = [
  body('fullname', 'MIN FULL NAME LENGTH IS 4.').trim().isLength({ max: 50, min: 2 }).escape(),
  body('email', 'PLEASE INTRODUCE A VALID EMAIL').trim().isLength({ max: 500, min: 5 }).escape(),
  body('username', 'MIN USERNAME LENGTH IS 4').trim().isLength({ max: 50, min: 4 }).escape(),
  body('password', 'MIN PASSWORD LENGTH IS 8').trim().isLength({ max: 50, min: 8 }).escape(),
  body('confpassword', 'password Confirmation field must have the same value as the password field')
    .exists()
    .custom((value, { req }) => value === req.body.password),

  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (errors.isEmpty()) {
      const userUsername = await User.find({ username: req.body.username });
      const userEmail = await User.find({ email: req.body.email });
      if (userEmail.length === 0 && userUsername.length === 0) {
        // if everything is ok
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);

        // basic template of new user
        const payment1 = new Payment({ ammount: 200, name: 'b', isMonthly: false, date: new Date(), isIncome: true });
        await payment1.save();
        const payment2 = new Payment({ ammount: 2000, name: 'c', isMonthly: false, date: new Date(), isIncome: false });
        await payment2.save();

        const payment3 = new Payment({ ammount: 2000, name: 'a', isMonthly: false, date: new Date(), isIncome: true });
        await payment3.save();

        const category1 = new Category({
          isIncome: true,
          name: 'Trabajo',
          payments: [{ _id: payment1._id }],
          color: '#ffffff',
        });
        await category1.save();

        const category2 = new Category({
          isIncome: false,
          name: 'Servicios',
          payments: [{ _id: payment2._id }],
          color: '#ffffff',
        });
        await category2.save();

        const category3 = new Category({
          isIncome: true,

          name: 'projected income',
          payments: [{ _id: payment3._id }],
          color: '#ffffff',
        });
        await category3.save();
        const category4 = new Category({
          isIncome: false,

          name: 'projected outcome',
          payments: [],
          color: '#ffffff',
        });
        await category4.save();
        const newUser = new User({
          name: req.body.fullname,
          email: req.body.email,
          username: req.body.username,
          password,
          income: [{ _id: category1._id }],
          outcome: [{ _id: category2._id }],
          projections: [{ _id: category3._id }, { _id: category4._id }],
        });

        await newUser.save((err) => {
          if (err) {
            return next(err);
          }
          return res.json({ sucess: newUser._id });
        });
      } else {
        res.json({ errors: { msg: 'username or email already used' } });
      }
    }
    // si hay errores de validacion
    else {
      res.json({ errors: errors.array()[0] });
    }
  },
];
