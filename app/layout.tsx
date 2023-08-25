import ToastProvider from '@/providers/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const font = Poppins({ subsets: ['latin'], weight: ['400','600','800'] })

export const metadata: Metadata = {
  title: 'Gerenciador de Projetos',
  description: 'Aplicação designada ao gerenciamento de projetos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${font.className} flex py-5 justify-center`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
