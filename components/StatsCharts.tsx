
'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface ChartData {
  taskCompletion?: Array<{ date: string; completed: number; total: number }>
  tokenUsage?: Array<{ date: string; used: number }>
  successRate?: { success: number; failed: number }
}

interface StatsChartsProps {
  stats: ChartData
}

const PIE_COLORS = ['#4ade80', '#f87171']

export default function StatsCharts({ stats }: StatsChartsProps) {
  return (
    <div className="space-y-6">
      {/* 任务完成曲线 */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">任务完成趋势</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.taskCompletion || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#FF69B4" 
                strokeWidth={2}
                dot={{ r: 3, fill: '#FF69B4' }}
                name="完成任务"
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#FFA500" 
                strokeWidth={2}
                dot={{ r: 3, fill: '#FFA500' }}
                name="总任务"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Token使用柱状图 */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Token消耗</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.tokenUsage || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar 
                dataKey="used" 
                fill="url(#tokenGradient)" 
                name="Token使用量"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF69B4" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#FFA500" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 成功率饼图 */}
      {stats.successRate && (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-600 mb-2">任务成功率</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '成功', value: stats.successRate.success },
                      { name: '失败', value: stats.successRate.failed }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={PIE_COLORS[0]} />
                    <Cell fill={PIE_COLORS[1]} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[0] }} />
              <span>成功: {stats.successRate.success}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[1] }} />
              <span>失败: {stats.successRate.failed}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              成功率: {((stats.successRate.success / (stats.successRate.success + stats.successRate.failed || 1)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
