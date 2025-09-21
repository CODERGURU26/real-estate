import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

// GET project by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id);

    if (!project) return new Response("Not found", { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// UPDATE project by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updated = await Project.findByIdAndUpdate(params.id, body, { new: true });

    if (!updated) return new Response("Not found", { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT project error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// DELETE project by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const deleted = await Project.findByIdAndDelete(params.id);

    if (!deleted) return new Response("Not found", { status: 404 });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE project error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
