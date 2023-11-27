import jwt from 'jsonwebtoken';
import User from '../../model/user.model.js';

// Define your secret key (should be stored securely, e.g., in an environment variable)
const secretKey = 'your-secret-key';

// Middleware function to check for authentication
function authenticate(req, res, next) {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers['authorization'] || req.query.token || req.cookies.token;
  const [bearer, tokenValue] = token.split(' '); 

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

function fetchUserData(req, res, next) {
  // Retrieve the JWT token from the request headers (e.g., Authorization header)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Verify and decode the JWT token to get user data
    const decoded = jwt.verify(token, secretKey); // Replace with your secret key
    const userId = decoded.userId; // Assuming the payload contains the user ID

    // Fetch user data based on the user ID obtained from the token
    const user = User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Attach the user data to the request object for access in subsequent middleware/routes
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
export { authenticate, fetchUserData };
