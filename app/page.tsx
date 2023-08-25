import HomeClient from "./client";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const projects = await prismadb.project.findMany();

  return <HomeClient data={projects} />
}
