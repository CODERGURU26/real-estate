import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Optional: Define TypeScript interface for type safety
export interface IProject extends mongoose.Document {
  name: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
