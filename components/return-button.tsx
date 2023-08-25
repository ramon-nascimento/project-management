'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

interface Props {
  page: string;
}

export default function ReturnButton({ page }: Props) {
  const router = useRouter();
  
  return (
    <Button className='self-start' variant='link' onClick={() => router.push(page)}>
      <ArrowLeftIcon size={16} /> 
      <span className='ml-2'>Voltar</span>
    </Button>
  )
}
