import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find().lean();

  const formatted = projects.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newProject = await Project.create(body);

  return NextResponse.json({
    ...newProject.toObject(),
    _id: newProject._id.toString(),
  });
}
