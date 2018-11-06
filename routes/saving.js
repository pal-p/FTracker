const express = require("express");
const controller = require("../controllers/savings");
const validateToken = require("../utils").validateToken; //middleware to verify token
const router = express.Router();

router.post('/new', validateToken, controller.create);

router.get('/:id', validateToken, controller.show);

module.exports = router;