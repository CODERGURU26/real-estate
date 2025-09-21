import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("POST error:", error);
    return new Response("Failed to create project", { status: 500 });
  }
}
