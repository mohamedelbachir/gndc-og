import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import { formatRelativeTime } from "@/lib/utils";
import axios from "axios";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const { data: user } = await axios.get(
    `${process.env.URL}/api/user/${username}`
  );
  if (!user) {
    return new Response("Not found", { status: 404 });
  }
  const date = "";
  return generateOgImageResponse({
    type: "user",
    title: "",
    date,
    replies: [],
    author: {
      name: user?.name || "Unknown",
      username: user?.username || "Unknown",
      image: user.image || "",
      bio: user.bio!,
    },
    stats: user.stats,
  });
}
