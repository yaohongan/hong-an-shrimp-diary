
'use client'
import { useEffect, useState } from 'react'

interface ShrimpProgressProps {
  progress: number // 0-100
}

export default function ShrimpProgress({ progress }: ShrimpProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    setAnimatedProgress(progress)
  }, [progress])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">🦞</span>
          虾成长进度
        </h3>
        <span className="font-bold text-primary-pink text-xl">
          {animatedProgress.toFixed(0)}%
        </span>
      </div>
      
      <div className="h-8 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-primary-pink to-primary-orange transition-all duration-1000 ease-out flex items-center px-2"
          style={{ width: `${animatedProgress}%` }}
        >
          <div className="text-white text-xs font-medium animate-pulse-slow">
            {animatedProgress >= 50 && `成长值 +${animatedProgress}`}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>今日任务完成率</span>
        <span>目标：100%</span>
      </div>
    </div>
  )
}
