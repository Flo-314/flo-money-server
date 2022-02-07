const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
require('dotenv').config();

exports.post = [
  body('name', 'MIN FULL NAME LENGTH IS 4.').trim().isLength({ max: 50, min: 4 }).escape(),
  body('email', 'PLEASE INTRODUCE A VALID EMAIL').trim().isLength({ max: 50, min: 5 }).escape(),
  body('username', 'MIN USERNAME LENGTH IS 4').trim().isLength({ max: 50, min: 4 }).escape(),
  body('password', 'MIN PASSWORD LENGTH IS 8').trim().isLength({ max: 50, min: 8 }).escape(),
  body('confpassword', 'password Confirmation field must have the same value as the password field')
    .exists()
    .custom((value, { req }) => value === req.body.password),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const userUsername = await User.find({ username: req.body.username });
      const userEmail = await User.find({ email: req.body.email });
      if (userEmail.length === 0 && userUsername.length === 0) {
        // if everything is ok
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password,
        });

        await newUser.save((err) => {
          if (err) {
            return next(err);
          }
          return res.json({ sucess: 'sucess' });
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
