const express = require('express');
const signUpValidate = require('../middleware/joiFunctions');
const userController = require('../controllers/user');

const router = express.Router();

module.exports = (db) => {
  router.post('/signUp', signUpValidate, (req, res) => userController(req, res, db));
  return router;
};