import Course, { ICourse } from "../models/Course";

export const createCourse = async (data: Partial<ICourse>) => {
  return Course.create(data);
};

export const getCourses = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const courses = await Course.find().populate("instructor", "name email role");
  // .skip(skip)
  // .limit(limit);

  const total = await Course.countDocuments();

  return { courses, total, page, limit };
};

export const getCourseById = async (id: string) => {
  return Course.findById(id).populate("instructor", "name email role");
};

export const updateCourse = async (id: string, data: Partial<ICourse>) => {
  return Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id: string) => {
  return Course.findByIdAndDelete(id);
};
