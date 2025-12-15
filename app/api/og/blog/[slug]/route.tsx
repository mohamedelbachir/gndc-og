import { NextRequest } from "next/server";
import { generateOgImageResponse } from "../../og";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { data: post } = await axios.get(`${process.env.URL}/api/blog/${slug}`);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  const title = post.title;
  const date = new Date(post.createdAt).toLocaleDateString();
  return generateOgImageResponse({
    title,
    date,
    author: {
      name: post.author?.name || "Unknown",
      username: post.author?.username || "Unknown",
      image: post.author?.image || "",
    },
  });
}
