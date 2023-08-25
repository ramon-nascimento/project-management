import ToastProvider from '@/providers/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'

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
      <body className={`${font.className} flex py-5 max-sm:px-4 justify-center`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
