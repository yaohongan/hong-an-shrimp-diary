export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 animate-float">
            <img src="/shrimp.svg" alt="大虾Logo" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
              虹安养虾成长记
            </h1>
            <p className="text-gray-500 mt-1">OpenClaw 专属个人成长日记系统</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">🦞 关于这个项目</h2>
          <p>
            这是一个完全自动化的个人成长记录网站，由OpenClaw AI助理自动构建和维护。
            每天自动读取你的工作记录，生成可视化的成长报告，记录你成为超级大虾的每一步！
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2">✨ 核心功能</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>📝 每日自动记录任务、知识点、错误修复</li>
            <li>📊 30天活动热图 + 统计图表可视化</li>
            <li>🔥 连续打卡计数，见证你的坚持</li>
            <li>🔔 每日更新自动推送Telegram通知</li>
            <li>📱 完美响应式设计，手机电脑都能看</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">🛠️ 技术栈</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Next.js 14 App Router + TypeScript</li>
            <li>Tailwind CSS 可爱粉橙主题</li>
            <li>Recharts 可视化图表</li>
            <li>Vercel 自动部署 + Cron 定时更新</li>
            <li>GitHub 版本控制</li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
            <p>当前版本：v1.0.0</p>
            <p className="mt-1">最后更新时间：2026年03月08日</p>
            <p className="mt-4 text-primary-pink font-medium">
              每天进步一点点，终会成为超级大虾！💪
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
