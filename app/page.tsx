import HomeClient from "./client";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const projects = await prismadb.project.findMany({
    include: {
      Task: true
    }
  });

  return <HomeClient data={projects} />
}
