import { redirect } from "next/navigation";
import ProjectClient from "./client"
import prismadb from "@/lib/prismadb"

export default async function Projects({ params }: {
  params: { projectId: string; }
}) {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId
    }
  });

  if (!project) redirect('/');

  const tasks = await prismadb.task.findMany({
    where: {
      projectId: params.projectId
    },
  });

  const data = {
    project,
    tasks
  };

  return <ProjectClient data={data} />
}
