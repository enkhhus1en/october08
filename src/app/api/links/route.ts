import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const text = await prisma.link.findUnique({ where: { id: Number(id) } });
    return NextResponse.json(text);
  }

  const links = await prisma.link.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const data = await req.json();
  const newLink = await prisma.link.create({ data });
  return NextResponse.json(newLink, { status: 201 });
}

export async function PUT(req: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const data = await req.json();
  const { id, ...updateData } = data;

  const updated = await prisma.link.update({
    where: { id: Number(id) },
    data: updateData,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  await prisma.link.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Deleted successfully" });
}
