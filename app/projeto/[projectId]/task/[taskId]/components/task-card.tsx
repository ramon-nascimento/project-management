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
      <CardHeader className="flex flex-row max-sm:flex-col justify-between">
        <div className="space-y-1.5">
          <Badge className={'self-start ' + badgeColor}>
            {badge}
          </Badge>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </CardDescription>
        </div>
        <div className="space-x-2 max-sm:pt-4 max-sm:flex max-sm:gap-1 max-sm:space-x-0">
          <Button 
            className="max-sm:w-1/2" 
            onClick={onEdit} 
            variant='secondary' 
            disabled={disabled}
          >
            Abrir
          </Button>
          <Button 
            className="max-sm:w-1/2" 
            onClick={onDelete} 
            variant='destructive' 
            disabled={disabled}
          >
            Deletar
          </Button>        
        </div>
      </CardHeader>
    </Card>
  )
}
