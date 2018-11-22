const jwt = require('jsonwebtoken');
const cookie = require('cookie')

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie)['access_token'];
      const options = {
        expiresIn: '2d',
        issuer: 'https://mywebsite.com'
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        // Let's pass back the decoded token to the request object
        req.user = result.user
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = { 
        error: `Authentication error. Cookie required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};