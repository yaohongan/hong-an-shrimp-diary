
import { Telegraf } from 'telegraf'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

// 发送每日更新通知
export async function sendDailyUpdateNotification(date: string, knowledgeCount: number, errorCount: number, siteUrl: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram 配置未完成，跳过推送')
    return false
  }

  try {
    const message = `
🦞 虹安养虾成长记已更新！
📅 日期：${date}
📚 今日学到 ${knowledgeCount} 个新知识
🐛 修复了 ${errorCount} 个错误
👉 查看详情：${siteUrl}

今天也要努力成长为超级大虾哦！💪
    `.trim()

    await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message)
    console.log('Telegram 通知发送成功')
    return true
  } catch (error) {
    console.error('Telegram 通知发送失败:', error)
    return false
  }
}

// 发送部署成功通知
export async function sendDeploymentSuccessNotification(version: string, commitHash: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false

  try {
    const message = `
🚀 网站部署成功！
版本：${version}
提交哈希：${commitHash}
网站已自动更新，可以访问啦！🎉
    `.trim()

    await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message)
    return true
  } catch (error) {
    console.error('部署通知发送失败:', error)
    return false
  }
}

// 发送错误通知
export async function sendErrorNotification(error: string, context: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false

  try {
    const message = `
❌ 网站更新出错了！
上下文：${context}
错误信息：${error}
需要手动排查问题哦～
    `.trim()

    await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message)
    return true
  } catch (error) {
    console.error('错误通知发送失败:', error)
    return false
  }
}
