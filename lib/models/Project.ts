import mongoose, { Schema, models, model } from "mongoose";

// Schema
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

// MongoDB interface (raw DB document)
export interface IProject extends mongoose.Document {
  _id: mongoose.Types.ObjectId;  // ✅ add this
  name: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTO for frontend (what API returns)
export interface IProjectDTO {
  _id: string;                   // ✅ frontend always gets string
  name: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const Project = models.Project || model<IProject>("Project", ProjectSchema);
export default Project;
