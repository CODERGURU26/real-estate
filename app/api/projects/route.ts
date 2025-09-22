import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextRequest, NextResponse } from "next/server";

// GET all projects
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).lean();

    return NextResponse.json(projects);
  } catch (error: unknown) {
    console.error("GET projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" }, 
      { status: 500 }
    );
  }
}

// CREATE a new project
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Optional: Add basic validation
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const project = new Project(body);
    const savedProject = await project.save();

    return NextResponse.json(savedProject, { status: 201 });
  } catch (error: unknown) {
    console.error("POST project error:", error);
    
    // Handle validation errors specifically
    if (
      error && 
      typeof error === 'object' && 
      'name' in error && 
      'message' in error &&
      error.name === 'ValidationError' &&
      typeof error.message === 'string'
    ) {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" }, 
      { status: 500 }
    );
  }
}