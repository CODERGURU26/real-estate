import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET project by ID
export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE project by ID
export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updated = await Project.findByIdAndUpdate(params.id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE project by ID
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const deleted = await Project.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}