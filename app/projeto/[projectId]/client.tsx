'use client'

import ReturnButton from '@/components/return-button';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, Task } from '@prisma/client';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import TaskCard from './task/[taskId]/components/task-card';
import ThemeToggle from '@/components/theme-toggle';
import { UserButton } from '@clerk/nextjs';

const formSchema = z.object({
  title: z.string().nonempty("Nome da task é obrigatório.")
});

type FormData = z.infer<typeof formSchema>;

interface DataProps {
  project: Project;
  tasks: Task[];
};

interface Props {
  data: DataProps;
};

export default function ProjectClient({ data }: Props) {
  const { project, tasks } = data;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  });

  async function onSubmitHandler({ title }: FormData) {
    setLoading(true);
    
    try {
      const { data } = await axios.post('/api/task', {
        title,
        projectId: project.id,
      });

      toast.success(data.message);
      router.refresh();
    } catch (error: any) {
      console.log('[CREATE_TASK]: ', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteHandler(id: string) {
    setLoading(true);
    
    try {
      const { data } = await axios.delete(`/api/task/${id}`);

      toast.success(data.message);
      router.refresh();
    } catch (error: any) {
      console.log('[DELETE_TASK]: ', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-4 w-[750px]'>
      <div className='flex justify-between'>
        <ReturnButton page='/' /> 
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{project?.title}</CardTitle>
          <CardDescription>{project?.description}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Form {...form}>
            <form 
              className='rounded border w-full p-4 focus-within:shadow-sm grid grid-cols-12 gap-2'
              onSubmit={form.handleSubmit(onSubmitHandler)}
            >
              <FormField
                control={form.control} 
                name='title'
                render={({ field }) => (
                  <FormItem className='col-span-10 max-sm:col-span-12'>
                    <FormControl>
                      <Input 
                        disabled={loading}
                        placeholder='Digite o nome da task' 
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className='col-span-2 w-[102px] max-sm:w-full max-sm:col-span-12'
                disabled={loading}
                type='submit'
              >
                {loading ? <Loader2Icon size={16} className='animate-spin' /> : 'Criar Task'}                
              </Button>
            </form>
          </Form>
          
          {tasks?.length > 0 
            ? <div 
              className='max-h-[350px] overflow-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground scrollbar-corner-border'
              >
                <h4 className='text-xl font-semibold'>Tasks</h4>
                {tasks?.map(({ id, title, description, status }) => (
                  <TaskCard
                    key={id}
                    title={title}
                    description={description}
                    badge={status}
                    onEdit={() => router.push(`/projeto/${project.id}/task/${id}`)}
                    onDelete={() => onDeleteHandler(id)}
                    disabled={loading}
                  />
                ))}
              </div>
            : <p className='mt-5 italic text-zinc-500 text-sm'>
                Suas tasks irão aparecer aqui assim que você criar alguma.
              </p>
          }          
        </CardContent>
      </Card>
    </div>
  )
}
