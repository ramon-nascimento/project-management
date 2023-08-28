'use client'

import ReturnButton from "@/components/return-button";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserButton } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client"
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const STATUS_VALUES = ['novo', 'em-andamento', 'concluido', 'cancelado'] as const;

const formSchema = z.object({
  title: z.string().nonempty("Nome da task é obrigatório."),
  description: z.string(),
  status: z.enum(STATUS_VALUES),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  data: Task | null;
}

export default function TaskClient({ data }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      status: data?.status as any ?? 'novo',
    }
  });

  async function onSubmiHandler({ title, description, status }: FormData) {
    setLoading(true);
    try {
      const { data: response } = await axios.put(`/api/task/${data?.id}`, {
        title,
        description,
        status,
        projectId: data?.projectId
      });

      toast.success(response.message);

      router.refresh();
      router.push('/projeto/' + data?.projectId);
    } catch (error: any) {
      toast.error(error.message);
      console.log("[PUT_TASK]:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-4 w-[750px]'>
      <div className='flex justify-between'>
        <ReturnButton page={'/projeto/' + data?.projectId} />
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>{data?.description}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Form {...form}>
            <form className="space-y-8 flex flex-col" onSubmit={form.handleSubmit(onSubmiHandler)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Task</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="ex.: Criação do banco de dados" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field}
                        disabled={loading}
                        placeholder="Descreva o objetivo da task"
                        className="resize-none scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground scrollbar-corner-border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_VALUES.map(value => (
                          <SelectItem key={value} value={value}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
              <Button 
                className="self-end" 
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader2Icon size={16} className='animate-spin' /> : 'Salvar Task'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
