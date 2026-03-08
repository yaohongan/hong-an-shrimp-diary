
import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { getTodayMemory } from '@/lib/memoryParser'
import { commitAndPush, triggerVercelDeployment } from '@/lib/github'
import { sendDailyUpdateNotification, sendErrorNotification } from '@/lib/telegram'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Vercel Cron 每天早上8点调用
export async function GET() {
  try {
    console.log('开始自动更新流程...')
    const today = format(new Date(), 'yyyy-MM-dd')
    
    // 1. 读取今日Memory
    const todayMemory = await getTodayMemory()
    
    // 2. 生成静态数据文件
    const dataPath = 'app/data/today.json'
    const dataContent = JSON.stringify(todayMemory, null, 2)
    await require('fs/promises').writeFile(dataPath, dataContent, 'utf-8')
    
    // 3. 提交到GitHub
    const commitMessage = `✨ 自动更新 ${today} 成长记录`
    const commitHash = await commitAndPush(commitMessage, [dataPath])
    
    if (!commitHash) {
      throw new Error('GitHub提交失败')
    }
    
    // 4. 触发Vercel部署
    const vercelToken = process.env.VERCEL_TOKEN || ''
    const vercelProjectId = process.env.VERCEL_PROJECT_ID || ''
    const deploymentSuccess = await triggerVercelDeployment(vercelProjectId, vercelToken)
    
    if (!deploymentSuccess) {
      throw new Error('Vercel部署触发失败')
    }
    
    // 5. 发送Telegram通知
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    const notificationSent = await sendDailyUpdateNotification(
      today,
      todayMemory.knowledge.length,
      todayMemory.errors.length,
      siteUrl
    )
    
    console.log('自动更新流程完成！')
    
    return NextResponse.json({
      success: true,
      date: today,
      commitHash,
      deploymentTriggered: deploymentSuccess,
      notificationSent: notificationSent,
      tasks: todayMemory.tasks.length,
      knowledge: todayMemory.knowledge.length,
      errors: todayMemory.errors.length
    })
    
  } catch (error) {
    console.error('自动更新失败:', error)
    await sendErrorNotification(
      (error as Error).message,
      '自动更新流程'
    )
    
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    }, { status: 500 })
  }
}

// 手动触发更新
export async function POST() {
  return GET()
}
