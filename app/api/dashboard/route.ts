import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import Project from "@/lib/models/Project";

export async function GET() {
  try {
    await connectToDatabase();

    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();

    return NextResponse.json({ users: totalUsers, projects: totalProjects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
