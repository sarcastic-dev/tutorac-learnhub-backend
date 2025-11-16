import { Request, Response, NextFunction } from "express";
import { listUsers, updateUserRole } from "../services/user.service";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const validRoles = ["student", "instructor", "admin"];
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    const updated = await updateUserRole(id, role);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
