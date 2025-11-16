import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Logged-in users only:
router.get("/me", auth, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// Instructor-only route
router.post("/course/create", auth, requireRole("instructor"), (req, res) => {
  res.json({ message: "Course created successfully" });
});

// Admin-only route
router.get("/admin/dashboard", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

export default router;
