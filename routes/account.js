const express = require("express");
const controller = require("../controllers/accounts");
const validateToken = require("../utils").validateToken; //middleware to verify token
const router = express.Router();

router.get('/new', validateToken, controller.getNew);
router.post('/new', validateToken, controller.create);
router.delete('/delete/:id',validateToken,controller.delete);
router.get('/chk-account-exist',validateToken,controller.chkAccountNameExists);

module.exports = router;