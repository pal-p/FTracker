const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken; //middleware to verify token

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(validateToken, controller.getAll); // This route is now protected

  router.route('/login')
    .post(controller.login);

  router.route('/home')
  .get((req, res)=>{
    res.render('landing')
  });
};