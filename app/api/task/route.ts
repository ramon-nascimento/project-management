import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, projectId, status, description } = await req.json();

  if (!title) return new NextResponse("Título da task é obrigatório.", { status: 401 });
  if (!projectId) return new NextResponse("ID do projeto é obrigatório.", { status: 401 });

  try {
    await prismadb.task.create({
      data: {
        title,
        projectId,
        status: status ?? 'novo',
        description: description ?? '',
      }
    })

    return NextResponse.json({
      message: "Task criada com sucesso."
    });
  } catch (error) {
    console.log("[POST_TASK]: ", error);
    return new NextResponse("Ocorreu um erro ao criar a task.", { status: 500 });
  }
}