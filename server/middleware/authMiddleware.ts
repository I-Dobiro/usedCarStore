import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sql } from "../config/db";

/**
 * Extend Express Request interface so we can safely attach req.user
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

/**
 * Middleware to protect routes by verifying JWT tokens
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // 1. Check for Authorization header with Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as { id: number };

      // 2. Fetch user from database
      const result = await sql`
        SELECT id, name, email
        FROM users
        WHERE id = ${decoded.id}
      `;

      const user = result[0];

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 3. Attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};