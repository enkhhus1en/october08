import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { text } from "text";
import { read } from "read";
import { watched } from "watched";
import { photo } from "photo";

export async function GET() {
  try {
    const [texts, reads, watched, photos] = await Promise.all([
      prisma.text.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.read.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.watched.findMany({
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
      ...texts.map((t: any) => ({
        ...t,
        type: "text",
      })),
      ...reads.map((r: any) => ({
        ...r,
        type: "read",
      })),
      ...watched.map((w: any) => ({
        ...w,
        type: "watched",
      })),
      // ...links.map((l) => ({
      //   ...l,
      //   type: "link",
      // })),
      photos.map((p: any) => ({
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
