
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { format, subDays } from 'date-fns'

const MEMORY_DIR = path.join(process.env.HOME || '', '.openclaw/workspace/memory')

export interface Task {
  id: string
  title: string
  time: Date
  status: 'completed' | 'in_progress' | 'pending'
  tool?: string
}

export interface KnowledgeItem {
  id: string
  content: string
  tags: string[]
}

export interface ErrorItem {
  id: string
  description: string
  fixMethod: string
  effect: string
}

export interface DailyMemory {
  date: string
  tasks: Task[]
  knowledge: KnowledgeItem[]
  errors: ErrorItem[]
  tokenUsage: number
  taskSuccess: number
  taskTotal: number
  activeMinutes: number
}

export interface Stats {
  todayProgress: number
  streak: number
  activityData: Array<{ date: string; count: number }>
  chartData: {
    taskCompletion: Array<{ date: string; completed: number; total: number }>
    tokenUsage: Array<{ date: string; used: number }>
    successRate: { success: number; failed: number }
  }
}

// 读取指定日期的Memory文件
export async function getDailyMemory(date: string): Promise<DailyMemory | null> {
  try {
    const filePath = path.join(MEMORY_DIR, `${date}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    const { data, content: body } = matter(content)
    
    // 解析任务
    const tasks: Task[] = []
    const taskRegex = /- \[(x| |\/)\] (.+?)(?:\((\d{2}:\d{2})\))?$/gm
    let match: RegExpExecArray | null
    
    while ((match = taskRegex.exec(body)) !== null) {
      const [, status, title, timeStr] = match
      const time = timeStr ? new Date(`${date}T${timeStr}:00`) : new Date()
      
      let taskStatus: Task['status'] = 'pending'
      if (status === 'x') taskStatus = 'completed'
      if (status === '/') taskStatus = 'in_progress'
      
      // 提取工具
      const toolMatch = title.match(/🔧 (.+?)$/)
      const tool = toolMatch ? toolMatch[1] : undefined
      const cleanTitle = title.replace(/🔧 .+?$/, '').trim()
      
      tasks.push({
        id: `task-${Date.now()}-${tasks.length}`,
        title: cleanTitle,
        time,
        status: taskStatus,
        tool
      })
    }
    
    // 解析知识点
    const knowledge: KnowledgeItem[] = []
    const knowledgeRegex = /- ✨ (.+?)(?:#([\w\s,]+))?$/gm
    while ((match = knowledgeRegex.exec(body)) !== null) {
      const [, content, tagsStr] = match
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : []
      
      knowledge.push({
        id: `knowledge-${Date.now()}-${knowledge.length}`,
        content: content.trim(),
        tags
      })
    }
    
    // 解析错误
    const errors: ErrorItem[] = []
    const errorRegex = /- ❌ (.+?) → ✅ (.+?) → (.+)$/gm
    while ((match = errorRegex.exec(body)) !== null) {
      const [, description, fixMethod, effect] = match
      
      errors.push({
        id: `error-${Date.now()}-${errors.length}`,
        description: description.trim(),
        fixMethod: fixMethod.trim(),
        effect: effect.trim()
      })
    }
    
    // 解析统计数据
    const tokenUsage = data.tokenUsage || 0
    const taskSuccess = data.taskSuccess || tasks.filter(t => t.status === 'completed').length
    const taskTotal = data.taskTotal || tasks.length
    const activeMinutes = data.activeMinutes || 0
    
    return {
      date,
      tasks,
      knowledge,
      errors,
      tokenUsage,
      taskSuccess,
      taskTotal,
      activeMinutes
    }
  } catch (error) {
    console.error('Error reading memory file:', error)
    return null
  }
}

// 获取今日Memory
export async function getTodayMemory(): Promise<DailyMemory> {
  const today = format(new Date(), 'yyyy-MM-dd')
  return (await getDailyMemory(today)) || {
    date: today,
    tasks: [],
    knowledge: [],
    errors: [],
    tokenUsage: 0,
    taskSuccess: 0,
    taskTotal: 0,
    activeMinutes: 0
  }
}

// 获取统计数据
export async function getStats(): Promise<Stats> {
  const today = new Date()
  const todayStr = format(today, 'yyyy-MM-dd')
  
  // 生成过去30天的数据
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, 29 - i)
    return format(date, 'yyyy-MM-dd')
  })
  
  // 读取所有记忆文件
  const memories: (DailyMemory | null)[] = await Promise.all(
    last30Days.map(date => getDailyMemory(date))
  )
  
  // 计算连续打卡天数
  let streak = 0
  for (let i = last30Days.length - 1; i >= 0; i--) {
    const memory = memories[i]
    if (memory && (memory.tasks.length > 0 || memory.knowledge.length > 0)) {
      streak++
    } else {
      break
    }
  }
  
  // 计算今日进度
  const todayMemory = memories[memories.length - 1]
  const todayProgress = todayMemory?.taskTotal ? 
    Math.round((todayMemory.taskSuccess / todayMemory.taskTotal) * 100) : 0
  
  // 活动热图数据
  const activityData = last30Days.map((date, index) => {
    const memory = memories[index]
    const count = memory ? memory.tasks.length + memory.knowledge.length : 0
    return { date, count }
  })
  
  // 任务完成曲线数据
  const taskCompletion = last30Days.map((date, index) => {
    const memory = memories[index]
    return {
      date: format(new Date(date), 'MM-dd'),
      completed: memory?.taskSuccess || 0,
      total: memory?.taskTotal || 0
    }
  })
  
  // Token使用数据
  const tokenUsage = last30Days.map((date, index) => {
    const memory = memories[index]
    return {
      date: format(new Date(date), 'MM-dd'),
      used: memory?.tokenUsage || 0
    }
  })
  
  // 成功率
  const totalSuccess = memories.reduce((sum, mem) => sum + (mem?.taskSuccess || 0), 0)
  const totalFailed = memories.reduce((sum, mem) => sum + ((mem?.taskTotal || 0) - (mem?.taskSuccess || 0)), 0)
  
  return {
    todayProgress,
    streak,
    activityData,
    chartData: {
      taskCompletion,
      tokenUsage,
      successRate: {
        success: totalSuccess,
        failed: totalFailed
      }
    }
  }
}
