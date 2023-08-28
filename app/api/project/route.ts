import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { title, description } = await req.json();

  if (!title) return new NextResponse("Título é obrigatório.", { status: 400 });
  if (!description) return new NextResponse("Descrição é obrigatória.", { status: 400 });
  if (!userId) return new NextResponse("Não autorizado.", { status: 403 });

  try {
    await prismadb.project.create({
      data: {
        title,
        description,
        userId
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
  try {
    const { userId } = auth();
  
    if (!userId) return new NextResponse("Não autorizado.", { status: 403 });
  
    const projects = await prismadb.project.findMany({
      where: {
        userId
      }
    });
  
    return NextResponse.json(projects);    
  } catch (error) {
    console.log("[GET_PROJECT]: ", error);
    return new NextResponse("Erro interno do servidor.", { status: 501 });
  }
}