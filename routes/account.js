const express = require("express");
const controller = require("../controllers/accounts");
const validateToken = require("../utils").validateToken; //middleware to verify token
const router = express.Router();

router.get('/new', validateToken, controller.getNew);
router.post('/new', validateToken, controller.create);

module.exports = router;