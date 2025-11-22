import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "../services/course.service";
import {
  enrollStudent,
  getMyEnrollments,
} from "../services/enrollment.service";
import mongoose from "mongoose";

export const createCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const instructorId = req.user!.id;
    const { title, description, category } = req.body;

    if (!title || !description || !category)
      throw new Error("All fields are required");

    const saved = await createCourse({
      title,
      description,
      category,
      instructor: new mongoose.Types.ObjectId(instructorId),
    });

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const getCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await getCourses(page, limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await getCourseById(req.params.id);
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export const updateCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await updateCourse(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteCourse(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    next(err);
  }
};

// ===== Enrollments =====

export const enrollStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.user!.id;
    const courseId = req.params.id;

    const result = await enrollStudent(studentId, courseId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const myEnrollmentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.user!.id;

    const data = await getMyEnrollments(studentId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
