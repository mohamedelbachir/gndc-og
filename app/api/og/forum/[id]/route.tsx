import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import { formatRelativeTime } from "@/lib/utils";
import axios from "axios";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data: post } = await axios.get(`${process.env.URL}/api/forum/${id}`);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  console.log(post);
  const title = post.title;
  const date = post.createdAt;
  return generateOgImageResponse({
    type: "forum",
    title,
    date,
    replies: post?.replies || [],
    author: {
      name: post.author?.name || "Unknown",
      username: post.author?.username || "Unknown",
      image: post.author?.image || "",
    },
  });
}
