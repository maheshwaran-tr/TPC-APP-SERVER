import jwt from "jsonwebtoken";

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header
    
    if (!token) {
      const err = new Error("Token is required");
      err.statusCode = 403;
      return next(err); // Ensure execution stops here
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.id; // Attach user ID to the request object

    next();
  } catch (error) {
    // Handle token-related errors
    if (error.name === "TokenExpiredError") {
      const err = new Error("Token has expired");
      err.statusCode = 401; // Unauthorized
      return next(err);
    }
    if (error.name === "JsonWebTokenError") {
      const err = new Error("Invalid token");
      err.statusCode = 401; // Unauthorized
      return next(err);
    }

    // Handle unexpected errors
    const err = new Error("Token verification failed");
    err.statusCode = 500; // Internal Server Error
    next(err);
  }
};

export default validateToken;