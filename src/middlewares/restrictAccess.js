import userService from "../services/userService.js";

const restrict = (...requiredRoles) => {
  return async (req, res, next) => {
    try {
      // Retrieve user information using userId from token
      const user = await userService.findUserById(req.userId);

      // Check if the user exists
      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        return next(err);
      }


      // Check if the user's role is in the required roles
      if (!requiredRoles.includes(user.role)) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        return next(err);
      }

      // Proceed to the next middleware if user is authorized
      next();
    } catch (error) {
      const err = new Error("Internal Server Error");
      err.status = 500;
      next(err);
    }
  };
};
 export default restrict;