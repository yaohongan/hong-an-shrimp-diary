
import OpenAI from 'openai'

let openai: OpenAI | null = null
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// 生成每日AI反思总结
export async function generateReflection(dailyMemory: any): Promise<string> {
  // 如果没有OpenAI API Key，返回默认总结
  if (!openai || !process.env.OPENAI_API_KEY) {
    const taskCount = dailyMemory.tasks?.length || 0
    const knowledgeCount = dailyMemory.knowledge?.length || 0
    const errorCount = dailyMemory.errors?.length || 0
    
    return `
今天你完成了 ${taskCount} 个任务，学到了 ${knowledgeCount} 个新知识，修复了 ${errorCount} 个错误，表现非常棒哦！每一点付出都是在为成为超级大虾积累能量，继续加油，明天会更好！🦞💪
    `.trim()
  }

  try {
    const prompt = `
你是一个可爱的AI助手，现在要给用户写一段150字左右的每日成长反思总结，风格要温暖励志，像养虾日记一样可爱。

今日数据：
- 完成任务数：${dailyMemory.tasks?.length || 0}
- 学到新知识：${dailyMemory.knowledge?.length || 0}个
- 修复错误数：${dailyMemory.errors?.length || 0}个
- Token使用量：${dailyMemory.tokenUsage || 0}

总结要包含鼓励的话语，用可爱的语气，最后可以加一个小龙虾相关的emoji。
    `.trim()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个温暖可爱的AI助手，擅长写鼓励的成长总结。' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    return response.choices[0].message.content?.trim() || '今天也要加油哦！🦞'
  } catch (error) {
    console.error('AI总结生成失败:', error)
    return '今天你又进步了一点，继续加油，成为超级大虾指日可待！🦞'
  }
}
