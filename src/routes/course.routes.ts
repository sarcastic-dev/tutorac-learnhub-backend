import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

import {
  createCourseController,
  getCoursesController,
  getCourseController,
  updateCourseController,
  deleteCourseController,
  enrollStudentController,
  myEnrollmentsController,
} from "../controllers/course.controller";

const router = Router();

// ===== Instructor-only =====
router.post("/", auth, requireRole("instructor"), createCourseController);
router.put("/:id", auth, requireRole("instructor"), updateCourseController);
router.delete("/:id", auth, requireRole("instructor"), deleteCourseController);

// ===== Public / Student =====
router.get("/", getCoursesController);
router.get("/:id", getCourseController);

// ===== Student enrollment =====
router.post(
  "/:id/enroll",
  auth,
  requireRole("student"),
  enrollStudentController
);
router.get(
  "/me/enrollments",
  auth,
  requireRole("student"),
  myEnrollmentsController
);

export default router;
