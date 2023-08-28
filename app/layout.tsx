import './globals.css'
import ToastProvider from '@/providers/toast-provider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'

const font = Poppins({ subsets: ['latin'], weight: ['400','600','800'] })

export const metadata: Metadata = {
  title: 'Rdnq App — Gestão de Projetos',
  description: 'Aplicação designada à gestão de projetos pessoais ou corporativos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  )
}
