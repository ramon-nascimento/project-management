import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const { title, projectId, status, description } = await req.json();

  if (!title) return new NextResponse("Título da task é obrigatório.", { status: 401 });
  if (!projectId) return new NextResponse("ID do projeto é obrigatório.", { status: 401 });
  if (!status) return new NextResponse("Status é obrigatório.", { status: 401 });
  if (!params.taskId) return new NextResponse("ID da task é obrigatória.", { status: 401 });

  try {
    await prismadb.task.update({
      data: {
        title,
        projectId,
        status,
        description: description ?? '',
      },
      where: {
        id: params.taskId
      }
    })

    return NextResponse.json({
      message: "Task atualizada com sucesso."
    });
  } catch (error) {
    console.log("[PUT_TASK]: ", error);
    return new NextResponse("Ocorreu um erro ao atualizar a task.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  if (!params.taskId) return new NextResponse("ID da task é obrigatório.", { status: 401 });

  try {    
    const task = await prismadb.task.findFirst({
      where: {
        id: params.taskId
      }
    })
  
    if (!task) return new NextResponse("Task não foi encontrada.", { status: 404 });
  
    await prismadb.task.delete({
      where: {
        id: params.taskId
      }
    })

    return NextResponse.json({
      message: "Task removida com sucesso."
    });
  } catch (error) {
    console.log("[DELETE_TASK]: ", error);
    return new NextResponse("Ocorreu um erro ao remover a task.", { status: 500 });
  }
}