'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import axios from "axios";

interface Props {
  id: string;
  title: string;
  description: string | null;
  onClick: () => void;
}

export default function ItemCard({ id, title, description, onClick }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [tasks, setTasks])

  async function fetchTasks() {
    const { data } = await axios.get('/api/project/' + id);

    setTasks(data.tasks)
  }

  const completedTasks = tasks?.filter(data => data.status === 'concluido');
  const percentage = isNaN((completedTasks?.length/tasks?.length) * 100) 
    ? '0' 
    : (completedTasks?.length/tasks?.length) * 100;
  const badgeText = tasks?.length === 0
    ? 'nao-iniciado'
    : tasks?.length === completedTasks?.length
      ? 'concluido' 
      : completedTasks?.length > 0
        ? 'em-progresso'
        : 'nao-iniciado'   
    
  const badgeColor = badgeText === 'concluido'
    ? 'bg-emerald-500'
    : badgeText === 'em-progresso'
      ? 'bg-sky-500'
      : ''

  return (
    <Card 
      className="cursor-pointer hover:opacity-80 transition-all" 
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
          <Badge className={"self-start " + badgeColor}>{badgeText}</Badge>
          <span className="text-sm text-zinc-400">
            {`${percentage}%`} completo {' '}
            {`(${completedTasks?.length}/${tasks?.length} tasks)`}         
          </span>
        </div>
        <CardTitle className="text-lg max-sm:pt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>        
      </CardHeader>
    </Card>
  )
}
