const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.render('landing');
});


module.exports = router;
