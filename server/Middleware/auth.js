import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// AUTHENTICATION middleware
const auth = asyncHandler(async (req, res, next) => {
  let token;

 //take token from authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      roles: decoded.roles,
    };

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token invalid or expired");
  }
});

export default auth;
