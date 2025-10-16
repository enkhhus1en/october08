import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const text = await prisma.text.findUnique({ where: { id: Number(id) } });
    return NextResponse.json(text);
  }

  const links = await prisma.text.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newLink = await prisma.text.create({ data });
  return NextResponse.json(newLink, { status: 201 });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...updateData } = data;

  const updated = await prisma.text.update({
    where: { id: Number(id) },
    data: updateData,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  await prisma.text.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Deleted successfully" });
}
