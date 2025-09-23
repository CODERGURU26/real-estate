import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";

// GET project by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const project = await Project.findById(params.id).lean();

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...project,
    _id: project._id.toString(),
  });
}

// UPDATE project by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  const updated = await Project.findByIdAndUpdate(params.id, body, { new: true }).lean();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...updated,
    _id: updated._id.toString(),
  });
}

// DELETE project by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deleted = await Project.findByIdAndDelete(params.id).lean();

  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, _id: params.id });
}
