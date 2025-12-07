import chatModel from "@/modules/chat";
import { connectDB } from "@/lib/mongodb";

export async function DELETE(req, { params }) {
  await connectDB(); // ← REQUIRED

  const { id } = await params;
  console.log("Deleting chat:", id);

  const del = await chatModel.findByIdAndDelete(id);
  console.log(del);

  return Response.json({ success: true });
}
