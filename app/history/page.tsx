
import { format, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

export default function HistoryPage() {
  // 生成最近30天的日期
  const days = Array.from({ length: 30 }, (_, i) => subDays(new Date(), i))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">历史记录</h1>
        <p className="text-gray-500">查看过去的成长记录，见证你的每一步进步🦞</p>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="搜索关键词..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-pink/30 focus:border-primary-pink transition-all"
        />
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {days.map((day, index) => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const hasData = Math.random() > 0.3 // 模拟有数据的日期
          
          return (
            <Link
              key={dateStr}
              href={`/history/${dateStr}`}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                hasData 
                  ? 'bg-gradient-to-br from-primary-pink/10 to-primary-orange/10 border-primary-pink/20' 
                  : 'bg-white border-gray-100 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">
                  {format(day, 'MM月dd日', { locale: zhCN })}
                </div>
                <div className="text-lg font-bold text-gray-800 mb-2">
                  {format(day, 'EEE', { locale: zhCN })}
                </div>
                {hasData ? (
                  <div className="text-xs bg-primary-pink/20 text-primary-pink px-2 py-1 rounded-full font-medium">
                    有记录
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 px-2 py-1 rounded-full font-medium">
                    无记录
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
