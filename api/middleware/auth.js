const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Check if the authorization header exists and contains a token
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    // Verify the token using the secret key
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    // Store userId from the verified token into req.locals
    req.locals = { userId: verifyToken.userId }; 

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error: ", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};

module.exports = auth;
