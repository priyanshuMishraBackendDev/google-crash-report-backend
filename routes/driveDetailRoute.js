const express = require('express');
const verifyToken = require('../middleware/jwtFunctions');
const driveDetailController = require('../controllers/driveDetail');

const router = express.Router();

module.exports = (db) => {
  router.get('/detail', verifyToken, (req, res) => driveDetailController(req, res, db));
  return router;
};