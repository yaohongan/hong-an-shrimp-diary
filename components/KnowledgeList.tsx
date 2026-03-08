
interface KnowledgeItem {
  id: string
  content: string
  tags: string[]
}

interface KnowledgeListProps {
  knowledge: KnowledgeItem[]
}

export default function KnowledgeList({ knowledge }: KnowledgeListProps) {
  if (knowledge.length === 0) {
    return <p className="text-gray-500 text-center py-4">今天还没有学习新知识点哦～</p>
  }

  return (
    <div className="space-y-3">
      {knowledge.map((item, index) => (
        <div key={item.id} className="bg-primary-pink/5 p-3 rounded-lg border border-primary-pink/20 hover:shadow-sm transition-shadow">
          <div className="flex items-start gap-2">
            <span className="text-xl">✨</span>
            <p className="text-gray-700 flex-1">
              <span className="font-medium text-primary-pink">{index + 1}.</span> {item.content}
            </p>
          </div>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 ml-8">
              {item.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary-pink/10 text-primary-pink font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
