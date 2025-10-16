import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { pathname } = await req.json();

  await prisma.pageView.create({
    data: {
      path: pathname,
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for") ?? undefined,
    },
  });

  return NextResponse.json({ ok: true });
}
