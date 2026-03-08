import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '虹安养虾成长记',
  description: 'OpenClaw个人成长日记，记录AI学习、工作、进步的每一天',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-gradient-to-br from-background-light to-background-cloud min-h-screen`}>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </main>
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>虹安养虾成长记 © {new Date().getFullYear()} | 由 OpenClaw 自动构建</p>
        </footer>
      </body>
    </html>
  )
}
