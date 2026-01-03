import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (id) {
    const text = await prisma.pageView.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(text);
  }

  const pageNumber = page ? Number(page) : 1;
  const pageLimit = limit ? Number(limit) : 50;
  const skip = (pageNumber - 1) * pageLimit;

  const [views, totalCount] = await Promise.all([
    prisma.pageView.findMany({
      take: pageLimit,
      skip: skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.pageView.count(),
  ]);

  return NextResponse.json({
    data: views,
    pagination: {
      page: pageNumber,
      limit: pageLimit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / pageLimit),
    },
  });
}
