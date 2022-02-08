require('dotenv').config();
const express = require('express');

const router = express.Router();
const passport = require('passport');
const singup = require('../controller/signup');
const postController = require('../controller/apiPost');
const getController = require('../controller/apiGet');
const putController = require('../controller/apiUpdate');
const deleteController = require('../controller/apiDelete');
//  passport.authenticate('jwt', { session: false })

router.get('/');

router.post('/signup', singup.post);

/* router.post('/login', postController.login);
 */
router.get('/user', getController.user);

router.put('/category', putController.category);
router.post('/category', postController.category);
router.delete('/category', deleteController.category);

router.put('/payment', putController.payment);
router.post('/payment', postController.payment);
router.delete('/payment', deleteController.payment);

module.exports = router;
