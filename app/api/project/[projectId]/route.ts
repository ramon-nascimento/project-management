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