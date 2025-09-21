import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find().lean(); // lean() returns plain JS objects
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Define the type for your project body
interface ProjectBody {
  name: string;
  description: string;
  image?: string;
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body: ProjectBody = await req.json();

    // Optionally validate fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
