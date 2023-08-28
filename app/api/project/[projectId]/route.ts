import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const project = await prismadb.project.findFirst({
    where: {
      id: params.projectId
    }
  });

  if (!project) return new NextResponse("Projeto não encontrado.", { status: 404 });

  const tasks = await prismadb.task.findMany({
    where: {
      projectId: project.id
    }
  })

  const response = {
    project,
    tasks
  }

  return NextResponse.json(response);
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  if (!params.projectId) return new NextResponse("ID da task é obrigatório.", { status: 401 });

  try {    
    const project = await prismadb.project.findFirst({
      where: {
        id: params.projectId
      }
    })
  
    if (!project) return new NextResponse("Projeto não foi encontrado.", { status: 404 });
  
    await prismadb.project.delete({
      where: {
        id: project.id
      }
    })

    return NextResponse.json({
      message: "Projeto removido com sucesso."
    });
  } catch (error) {
    console.log("[DELETE_PROJECT]: ", error);
    return new NextResponse("Ocorreu um erro ao remover o projeto.", { status: 500 });
  }
}