import { auth } from "@clerk/nextjs";
import HomeClient from "./client";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const projects = await prismadb.project.findMany({
    where: {
      userId
    }
  });

  return <HomeClient data={projects} />
}
