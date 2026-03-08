
// 生成每日AI反思总结（纯本地生成，不需要API）
export async function generateReflection(dailyMemory: any): Promise<string> {
  const taskCount = dailyMemory.tasks?.length || 0
  const knowledgeCount = dailyMemory.knowledge?.length || 0
  const errorCount = dailyMemory.errors?.length || 0
  const successRate = dailyMemory.taskTotal ? 
    Math.round((dailyMemory.taskSuccess / dailyMemory.taskTotal) * 100) : 0

  // 根据数据生成不同的总结
  if (taskCount >= 10) {
    return `
哇塞！今天你居然完成了 ${taskCount} 个任务，学到了 ${knowledgeCount} 个新知识，还修复了 ${errorCount} 个错误，简直是超级大虾附体！成功率高达 ${successRate}%，这效率简直爆表！每一份努力都不会白费，今天的你超棒的，明天继续加油哦！🦞💪
    `.trim()
  } else if (taskCount >= 5) {
    return `
太棒了！今天完成了 ${taskCount} 个任务，学到了 ${knowledgeCount} 个新知识，修复了 ${errorCount} 个错误，成功率 ${successRate}%，又是收获满满的一天！继续保持这个节奏，离成为超级大虾的目标越来越近啦！✨
    `.trim()
  } else if (taskCount > 0) {
    return `
今天完成了 ${taskCount} 个任务，学到了 ${knowledgeCount} 个新知识，修复了 ${errorCount} 个错误，表现不错哦！每天进步一点点，日积月累就是大突破，明天继续加油呀！🌟
    `.trim()
  } else if (knowledgeCount > 0) {
    return `
今天学到了 ${knowledgeCount} 个新知识，太棒啦！学习就是最好的投资，今天的你又比昨天更厉害了一点，继续保持，你会越来越棒的！📚
    `.trim()
  } else {
    return `
今天也要努力成长为超级大虾哦！即使没有太多任务，也可以整理整理之前的知识，复盘一下过去的经验，每一步都算数，加油！💖
    `.trim()
  }
}
