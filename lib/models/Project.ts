import mongoose, { Schema, models, model } from "mongoose";

// -----------------------------
// Mongoose Schema
// -----------------------------
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

// -----------------------------
// MongoDB document interface
// -----------------------------
export interface IProject extends mongoose.Document {
  _id: mongoose.Types.ObjectId;  // ObjectId from MongoDB
  name: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// -----------------------------
// Lean type for .find().lean()
// -----------------------------
export type LeanProject = Omit<IProject, "save" | "isNew">; 
// includes _id: ObjectId and all fields, but plain JS object

// -----------------------------
// DTO type for frontend
// -----------------------------
export interface IProjectDTO {
  _id: string;          // frontend always gets string
  name: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------
// Export Mongoose model
// -----------------------------
const Project = models.Project || model<IProject>("Project", ProjectSchema);
export default Project;
