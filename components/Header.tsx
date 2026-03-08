import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 animate-float">
            <img src="/shrimp.svg" alt="大虾Logo" className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
            虹安养虾成长记
          </h1>
        </Link>
        
        <nav className="flex gap-6">
          <Link 
            href="/" 
            className="shrimp-claw-hover font-medium text-gray-700 hover:text-primary-pink transition-colors"
          >
            首页
          </Link>
          <Link 
            href="/history" 
            className="shrimp-claw-hover font-medium text-gray-700 hover:text-primary-pink transition-colors"
          >
            历史记录
          </Link>
          <Link 
            href="/about" 
            className="shrimp-claw-hover font-medium text-gray-700 hover:text-primary-pink transition-colors"
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  )
}
