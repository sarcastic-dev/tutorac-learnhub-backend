import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    console.log("Auth Header:", header);

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const token = header.split(" ")[1]; // example token: Bearer
    const decoded = jwt.verify(token, SECRET) as {
      userId: string;
      role: "instructor" | "student" | "admin";
    };

    console.log("Decoded Token:", decoded);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
