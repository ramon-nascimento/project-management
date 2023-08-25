'use client'

import ItemCard from '@/components/item-card'
import ProjectDialog from '@/components/project-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface Props {
  data: ({ 
    Task: { 
      id: string;
      title: string; 
      description: string | null; 
      status: string | null; 
      projectId: string; 
    }[]; 
  } & { id: string; title: string; description: string; })[]
}

export default function HomeClient({ data }: Props) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Card className="w-[750px] min-w-fit h-fit">
        <CardHeader className="flex flex-row justify-between">
          <div className="space-y-1.5">
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Confira abaixo todos os seus projetos.</CardDescription>
          </div>
          <Button onClick={() => setOpenDialog(true)}>
            Adicionar Projeto
          </Button>
        </CardHeader>
        <CardContent>
          {data.map(({ id, title, description, Task }) => (
            <ItemCard 
              key={id}
              title={title} 
              description={description} 
              onClick={() => router.push('/projeto/' + id)}
              data={Task}
            />
          ))}
        </CardContent>
      </Card>
      <ProjectDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  )
}
