import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [texts, reads, watched, music, links, photos] = await Promise.all([
      prisma.text.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.read.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.watched.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.music.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.link.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.photo.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const feed: any[] = [
      ...texts.map((t) => ({
        ...t,
        type: "text",
      })),
      ...reads.map((r) => ({
        ...r,
        type: "read",
      })),
      ...watched.map((w) => ({
        ...w,
        type: "watched",
      })),
      ...music.map((m) => ({
        ...m,
        type: "music",
      })),
      ...links.map((l) => ({
        ...l,
        type: "link",
      })),
      photos.map((p) => ({
        ...p,
        type: "photo",
      })),
    ];

    const sortedFeed = feed.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json(sortedFeed.slice(0, 20));
  } catch (error) {
    console.log("latestFeed error: ", error);
  }
}
