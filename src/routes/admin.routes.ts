import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { getAllUsers, changeUserRole } from "../controllers/user.controller";

const router = Router();

// Admin only
router.get("/users", auth, requireRole("admin"), getAllUsers);
router.patch("/users/:id/role", auth, requireRole("admin"), changeUserRole);

export default router;
