'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Props {
  title: string;
  description: string | null;
  badge: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

export default function TaskCard({ title, description, onEdit, onDelete, badge, disabled } : Props) {
  const badgeColor = badge === 'novo' 
    ? ''
    : badge === 'em-andamento'
      ? 'bg-sky-500'
      : badge === 'concluido'
        ? 'bg-emerald-500'
        : 'bg-red-500'
  return (
    <Card>
      <CardHeader className="grid grid-cols-10 justify-between">
        <div className="space-y-1.5 col-span-7">
          <Badge className={'self-start ' + badgeColor}>
            {badge}
          </Badge>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </CardDescription>
        </div>
        <div className="space-x-2 col-span-3">
          <Button onClick={onEdit} variant='secondary' disabled={disabled}>
            Abrir
          </Button>
          <Button onClick={onDelete} variant='destructive' disabled={disabled}>
            Deletar
          </Button>        
        </div>
      </CardHeader>
    </Card>
  )
}
