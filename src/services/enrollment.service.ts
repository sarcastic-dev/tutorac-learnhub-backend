import Enrollment from "../models/Enrollment";

export const enrollStudent = async (studentId: string, courseId: string) => {
  const exists = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });
  if (exists) throw new Error("Already enrolled");

  return Enrollment.create({ student: studentId, course: courseId });
};

export const getMyEnrollments = async (studentId: string) => {
  return Enrollment.find({ student: studentId }).populate("course");
};
