import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  if (!title) return new NextResponse("Título é obrigatório.", { status: 400 });
  if (!description) return new NextResponse("Descrição é obrigatória.", { status: 400 });

  try {
    await prismadb.project.create({
      data: {
        title,
        description
      }
    })
  
    return NextResponse.json({
      message: "Projeto criado com sucesso."
    });
  } catch (error) {
    console.log("[POST_PROJECT]: ", error);
    return new NextResponse("Ocorreu um erro ao criar o projeto.", { status: 501 });
  }
}

export async function GET() {
  const projects = await prismadb.project.findMany();

  return NextResponse.json(projects);
}