const express = require("express");
const controller = require("../controllers/users");
const validateToken = require("../utils").validateToken; //middleware to verify token
const router = express.Router();
const User = require("../models/users");

router.post("/register", controller.add);
router.get("/register", (req, res) => {
  res.render("signup");
});
router.get("/:id/dashboard", validateToken, controller.getDashboard )
  

router.post("/login", controller.login);

module.exports = router;
