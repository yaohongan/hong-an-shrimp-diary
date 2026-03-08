
import { format } from 'date-fns'

interface Task {
  id: string
  title: string
  time: Date
  status: 'completed' | 'in_progress' | 'pending'
  tool?: string
}

interface TaskTimelineProps {
  tasks: Task[]
}

export default function TaskTimeline({ tasks }: TaskTimelineProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-4">今天还没有任务记录哦～</p>
  }

  return (
    <div className="relative border-l-2 border-primary-pink/30 pl-4 space-y-4">
      {tasks.map((task, index) => (
        <div key={task.id} className="relative">
          {/* 时间点 */}
          <div 
            className={`absolute -left-[22px] w-4 h-4 rounded-full border-2 border-white shadow-sm ${
              task.status === 'completed' ? 'bg-green-500' : 
              task.status === 'in_progress' ? 'bg-primary-orange' : 'bg-gray-300'
            }`}
          />
          
          {/* 任务卡片 */}
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-primary-pink/5 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-gray-800">{task.title}</h4>
              <span className="text-xs text-gray-500">
                {format(task.time, 'HH:mm')}
              </span>
            </div>
            {task.tool && (
              <div className="text-xs text-primary-pink font-medium mt-1">
                🔧 使用工具：{task.tool}
              </div>
            )}
            <div className="mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                task.status === 'completed' ? 'bg-green-100 text-green-700' :
                task.status === 'in_progress' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {task.status === 'completed' ? '已完成' : 
                 task.status === 'in_progress' ? '进行中' : '待处理'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
