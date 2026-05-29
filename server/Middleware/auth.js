import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// AUTHENTICATION middleware
const auth = asyncHandler(async (req, res, next) => {
  let token;

  console.log("AUTH HEADER:", req.headers.authorization);
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
    console.log("TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED JWT:", decoded);

    req.user = {
      id: decoded.id,
      roles: decoded.roles,
    };

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401);
    throw new Error("Not authorized, token invalid or expired");
  }
});

export default auth;
