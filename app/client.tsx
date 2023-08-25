'use client'

import ItemCard from '@/components/item-card'
import ProjectDialog from '@/components/project-dialog'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
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
  console.log(data)

  return (
    <div>
      <ThemeToggle />
      <Card className="md:w-[750px] min-w-fit h-fit mt-4">
        <CardHeader className="flex flex-row justify-between">
          <div className="space-y-1.5">
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Confira abaixo todos os seus projetos.</CardDescription>
          </div>
          <Button
            onClick={() => setOpenDialog(true)} 
            className='max-sm:rounded-full max-sm:w-10 max-sm:h-10 max-sm:p-0'
          >
            <PlusIcon className='block sm:hidden' size={16} />
            <span className='max-sm:hidden'>Adicionar Projeto</span>
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
    </div>
  )
}
