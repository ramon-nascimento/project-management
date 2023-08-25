'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Task } from "@prisma/client";

interface Props {
  title: string;
  description: string | null;
  onClick: () => void;
  data: Task[];
}

export default function ItemCard({ title, description, onClick, data }: Props) {
  const completedTasks = data.filter(data => data.status === 'concluido');
  const percentage = isNaN((completedTasks.length/data.length) * 100) 
    ? '0' 
    : (completedTasks.length/data.length) * 100;
  const badgeText = data.length === 0
    ? 'nao-iniciado'
    : data.length === completedTasks.length
      ? 'concluido' 
      : completedTasks.length > 0
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
        <div className="flex items-center gap-2">
          <Badge className={"self-start " + badgeColor}>{badgeText}</Badge>
          <span className="text-sm text-zinc-400">
            {`${percentage}%`} completo {' '}
            {`(${completedTasks.length}/${data.length} tasks)`}         
          </span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>        
      </CardHeader>
    </Card>
  )
}
