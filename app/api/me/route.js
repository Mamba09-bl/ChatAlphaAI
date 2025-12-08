import { getUser } from "@/lib/getUser";

export async function GET() {
  const auth = await getUser();

  // hello
  if (!auth || !auth.user) {
    return Response.json({ user: null });
  }

  return Response.json({ user: auth.user });
}
