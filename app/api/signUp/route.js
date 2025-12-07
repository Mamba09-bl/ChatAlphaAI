import { NextResponse } from "next/server";
import userModel from "@/modules/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb"; // ← ADD THIS

const SECRET = "MY_SUPER_SECRET_123";

export async function POST(req) {
  await connectDB(); // ← ADD THIS

  const { email, password, Username } = await req.json();

  const existing = await userModel.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    Username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET);

  const res = NextResponse.json({ success: true, token }, { status: 201 });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
