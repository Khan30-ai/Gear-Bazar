import asyncHandler from "express-async-handler";

const authorize = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
//auth middleware must have run before this
    if (!req.user || !req.user.roles) {
      res.status(401);
      throw new Error("Not authorized");
    }

   
    const hasPermission = req.user.roles.some((role) =>
      allowedRoles.includes(role)   // check if user has at least ONE allowed role
    );

    if (!hasPermission) {
      res.status(403);
      throw new Error("Forbidden: insufficient permissions");
    }

    next();
  });
};

export default authorize;
