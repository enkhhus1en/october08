import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string)?.trim() || "misc";

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const safeFolder = path.basename(folder);
    const uploadDir = path.join("/var/www/uploads", safeFolder);
    await mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const base = path.basename(file.name, ext);
    const filename = `${base}_${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${encodeURIComponent(safeFolder)}/${encodeURIComponent(filename)}`;
    return Response.json({ url: fileUrl });
  } catch (err) {
    console.error("File upload error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
