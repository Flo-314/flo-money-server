require('dotenv').config();
const express = require('express');

const router = express.Router();
const passport = require('passport');
const controller = require('../controller/signup');

//  passport.authenticate('jwt', { session: false })

router.get('/');

router.post('/signup', controller.post);

module.exports = router;
