
interface StreakCounterProps {
  streak: number
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-primary-pink/10 to-primary-orange/10 px-8 py-6 rounded-xl border border-primary-pink/20">
      <div className="text-6xl animate-pulse-slow">
        {streak >= 7 ? '🔥' : '🌟'}
      </div>
      <div>
        <h3 className="text-gray-600 text-sm mb-1">连续打卡</h3>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold bg-gradient-to-r from-primary-pink to-primary-orange bg-clip-text text-transparent">
            {streak}
          </span>
          <span className="text-gray-600 mb-1">天</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {streak === 0 ? '还没有开始打卡哦，加油！' :
           streak < 7 ? `再坚持 ${7 - streak} 天就能解锁7天火焰勋章啦！` :
           `太厉害了！已经连续打卡 ${streak} 天啦！`}
        </p>
      </div>
    </div>
  )
}
