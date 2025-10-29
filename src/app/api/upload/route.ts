import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const data = await req.formData();
  const file = data.get("file") as File;
  const folder = (data.get("folder") as string) || "misc";

  if (!file) return new Response("No file uploaded", { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${file.name}_${Date.now()}`;
  const uploadDir = path.join("/var/www/uploads", folder);

  await mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  const fileurl = `/uploads/folder/${filename}`;
  return Response.json({ url: fileurl });
}
