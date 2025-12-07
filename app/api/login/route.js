import { NextResponse } from "next/server";
import userModel from "@/modules/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb"; // ← ADD THIS

export async function POST(req) {
  await connectDB(); // ← ADD THIS

  const SECRET = "MY_SUPER_SECRET_123";
  const { email, password } = await req.json();

  const existing = await userModel.findOne({ email });

  if (!existing) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, existing.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = jwt.sign({ id: existing._id, email: existing.email }, SECRET);

  const res = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  res.cookies.set("token", token, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
