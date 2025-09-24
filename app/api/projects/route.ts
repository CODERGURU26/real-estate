import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project"; // Note: lowercase 'project' to match your file
import { NextRequest, NextResponse } from "next/server";

// GET all projects
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).lean();

    return NextResponse.json({ success: true, data: projects });
  } catch (error: unknown) {
    console.error("GET projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" }, 
      { status: 500 }
    );
  }
}

// CREATE a new project
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Fixed: Use 'name' instead of 'title' to match your model
    if (!body.name || !body.description) {
      return NextResponse.json(
        { success: false, error: "Name and description are required" },
        { status: 400 }
      );
    }

    const project = new Project({
      name: body.name,
      description: body.description,
      image: body.image || ''
    });
    
    const savedProject = await project.save();

    return NextResponse.json(
      { success: true, data: savedProject }, 
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST project error:", error);

    // Handle validation errors specifically
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'message' in error) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create project" }, 
      { status: 500 }
    );
  }
}