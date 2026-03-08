
import { format, subDays } from 'date-fns'

interface ActivityData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data: ActivityData[]
}

const COLORS = [
  '#EBEDF0', // 0
  '#FFD6E8', // 1-3
  '#FF99CC', // 4-7
  '#FF69B4', // 8-12
  '#FF1493'  // 13+
]

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // 生成过去30天的日期
  const days = Array.from({ length: 30 }, (_, i) => subDays(new Date(), 29 - i))
  
  // 获取某天的活动数
  const getActivityCount = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const item = data.find(d => d.date === dateStr)
    return item?.count || 0
  }

  // 获取颜色
  const getColor = (count: number) => {
    if (count === 0) return COLORS[0]
    if (count <= 3) return COLORS[1]
    if (count <= 7) return COLORS[2]
    if (count <= 12) return COLORS[3]
    return COLORS[4]
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {days.map((day, index) => {
          const count = getActivityCount(day)
          return (
            <div
              key={index}
              className="w-4 h-4 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer"
              style={{ backgroundColor: getColor(count) }}
              title={`${format(day, 'MM-dd')}: ${count} 个任务`}
            />
          )
        })}
      </div>
      
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>低</span>
          <div className="flex gap-1">
            {COLORS.map((color, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span>高</span>
        </div>
        <div>过去30天</div>
      </div>
    </div>
  )
}
