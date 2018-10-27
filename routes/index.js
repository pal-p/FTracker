const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  console.log('hitting home')
  res.render('landing');
});


module.exports = router;
