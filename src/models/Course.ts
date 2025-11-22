import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  instructor: mongoose.Types.ObjectId;
  isPublished: boolean;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, minlength: 10 },
    category: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>("Course", courseSchema);
