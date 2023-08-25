import prismadb from "@/lib/prismadb";
import TaskClient from "./client";

export default async function TaskPage({ params } : {
  params: { taskId: string; }
}) {
  const task = await prismadb.task.findUnique({
    where: {
      id: params.taskId
    }
  })

  return <TaskClient data={task} />
}
