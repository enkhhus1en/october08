import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const text = await prisma.pageView.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(text);
  }

  const links = await prisma.pageView.findMany({
    take: 50,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}
