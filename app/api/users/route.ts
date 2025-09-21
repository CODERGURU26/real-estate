
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}, { password: 0 }); // exclude password
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
