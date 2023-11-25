const jwt = require('jsonwebtoken');

// Define your secret key (should be stored securely, e.g., in an environment variable)
const secretKey = 'your-secret-key';

// Middleware function to check for authentication
function authenticate(req, res, next) {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers['authorization'] || req.query.token || req.cookies.token;
  const [bearer, tokenValue] = token.split(' '); 
  console.log("token:",tokenValue);
  if (!tokenValue) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(tokenValue, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // If the token is valid, you can attach the user object to the request for further route handling
    req.user = user;
    next();
  });
}

module.exports = { authenticate };
