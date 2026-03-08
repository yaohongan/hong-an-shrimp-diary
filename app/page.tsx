import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import ShrimpProgress from '@/components/ShrimpProgress'
import TaskTimeline from '@/components/TaskTimeline'
import KnowledgeList from '@/components/KnowledgeList'
import ErrorTable from '@/components/ErrorTable'
import ActivityHeatmap from '@/components/ActivityHeatmap'
import StatsCharts from '@/components/StatsCharts'
import StreakCounter from '@/components/StreakCounter'
import { getTodayMemory, getStats } from '@/lib/memoryParser'
import { generateReflection } from '@/lib/aiSummary'

export default async function Home() {
  const today = new Date()
  const todayStr = format(today, 'yyyy-MM-dd')
  const todayMemory = await getTodayMemory()
  const stats = await getStats()
  const reflection = await generateReflection(todayMemory)

  return (
    <div className="water-wave min-h-screen">
      {/* 顶部日期和进度条 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {format(today, 'yyyy年MM月dd日 EEEE', { locale: zhCN })}
        </h2>
        <p className="text-gray-500 mb-6">今天也要努力成长为超级大虾哦 🦞</p>
        <ShrimpProgress progress={stats.todayProgress || 0} />
      </div>

      {/* 三个总结卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            今天做了什么
          </h3>
          <TaskTimeline tasks={todayMemory.tasks || []} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            学到了什么
          </h3>
          <KnowledgeList knowledge={todayMemory.knowledge || []} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🐛</span>
            改进的错误
          </h3>
          <ErrorTable errors={todayMemory.errors || []} />
        </div>
      </div>

      {/* 连续打卡计数器 */}
      <div className="flex justify-center mb-10">
        <StreakCounter streak={stats.streak || 0} />
      </div>

      {/* 可视化仪表盘 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            30天活动热图
          </h3>
          <ActivityHeatmap data={stats.activityData || []} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            统计数据
          </h3>
          <StatsCharts stats={stats.chartData || {}} />
        </div>
      </div>

      {/* 今日反思 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          今日虾反思
        </h3>
        <div className="text-gray-700 leading-relaxed p-4 bg-primary-pink/5 rounded-lg border border-primary-pink/20">
          {reflection}
        </div>
      </div>
    </div>
  )
}
