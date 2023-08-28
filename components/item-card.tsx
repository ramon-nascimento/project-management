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
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  description: string | null;
  onClick: () => void;
}

export default function ItemCard({ id, title, description, onClick }: Props) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [tasks, setTasks])

  async function fetchTasks() {
    const { data } = await axios.get('/api/project/' + id);

    setTasks(data.tasks)
  }

  async function onDeleteHandle() {
    const { data } = await axios.delete('/api/project/' + id);
    router.refresh();
    toast.success(data.message)
  }

  const completedTasks = tasks?.filter(data => data.status === 'concluido');
  const percentage = isNaN((completedTasks?.length/tasks?.length) * 100) 
    ? '0' 
    : ((completedTasks?.length/tasks?.length) * 100).toFixed();
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
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
          <div className="flex gap-2 max-sm:flex-col">
            <Badge className={"self-start " + badgeColor}>{badgeText}</Badge>
            <span className="text-sm text-zinc-400">
              {`${percentage}%`} completo {' '}
              {`(${completedTasks?.length}/${tasks?.length} tasks)`}
            </span>
          </div>
          <Button 
            variant='destructive'
            size='sm'
            onClick={onDeleteHandle}
            className="max-sm:mt-2"
          >
            Deletar
          </Button>                 
        </div>        
        <CardTitle className="text-lg max-sm:pt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>        
      </CardHeader>
    </Card>
  )
}
