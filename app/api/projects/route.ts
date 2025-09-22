import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextRequest, NextResponse } from "next/server";

// GET all projects
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).lean();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// CREATE a new project
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const project = new Project(body);
    await project.save();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST project error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
