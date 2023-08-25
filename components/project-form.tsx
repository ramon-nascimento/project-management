'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().nonempty("Título deverá ser preenchido."),
  description: z.string().nonempty("Descrição é um campo obrigatório.")
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  onClick?: () => void;
}

export default function ProjectForm({ onClick }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  });

  async function onSubmitHandler(body: FormData) {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/project', body);

      toast.success(data.message);
      
      router.push('/');
      router.refresh();
      if (onClick) onClick();
    } catch (error: any) {
      toast.error(error.message);
      console.log("[CREATE_PROJECT]: ", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-8"
      >
        <FormField 
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Projeto</FormLabel>
              <FormControl>
                <Input placeholder="ex.: Projeto Empresa 1" {...field} />
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
                <Input placeholder="ex.: Lídar com processos financeiros" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4 justify-end">
          <Button 
            variant="secondary" 
            type="button"
            onClick={onClick}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>Criar</Button>
        </div>
      </form>
    </Form>
  )
}
