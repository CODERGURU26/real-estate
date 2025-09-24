// app/api/projects/[id]/route.ts
import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project"; // Make sure this matches your actual file name
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET project by ID
export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// UPDATE project by ID
export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { success: false, error: "Name and description are required" },
        { status: 400 }
      );
    }

    const updated = await Project.findByIdAndUpdate(
      id, 
      {
        name: body.name,
        description: body.description,
        image: body.image || ''
      }, 
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// DELETE project by ID
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Project not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Project deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}