import jwt from "jsonwebtoken";

/**
 * Optional authentication middleware.
 *
 * - If a valid Bearer token is present → populates req.user (id, roles)
 *   so role-based filtering in controllers (admin/seller/buyer) works correctly.
 * - If no token or an invalid token is present → req.user stays undefined
 *   and the request continues as a public/buyer request (no 401 thrown).
 *
 * Use this on public endpoints that also need to serve different data
 * depending on the caller's role (e.g. GET /products).
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        roles: decoded.roles,
      };
      console.log(
        "[optionalAuth] Token valid — req.user set:",
        JSON.stringify(req.user)
      );
    } catch (err) {
      // Invalid / expired token — treat as unauthenticated (buyer view)
      console.log(
        "[optionalAuth] Token present but invalid, treating as public request:",
        err.message
      );
    }
  } else {
    console.log("[optionalAuth] No token — treating as public request");
  }

  next();
};

export default optionalAuth;
