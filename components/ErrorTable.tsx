
interface ErrorItem {
  id: string
  description: string
  fixMethod: string
  effect: string
}

interface ErrorTableProps {
  errors: ErrorItem[]
}

export default function ErrorTable({ errors }: ErrorTableProps) {
  if (errors.length === 0) {
    return <p className="text-gray-500 text-center py-4">今天没有错误记录哦，太棒了！🎉</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-600 font-medium">错误描述</th>
            <th className="text-left py-2 text-gray-600 font-medium">修复方法</th>
            <th className="text-left py-2 text-gray-600 font-medium">效果</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {errors.map((error) => (
            <tr key={error.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 pr-2 align-top">
                <span className="text-red-500">❌</span> {error.description}
              </td>
              <td className="py-3 px-2 align-top">
                <span className="text-green-500">✅</span> {error.fixMethod}
              </td>
              <td className="py-3 pl-2 align-top text-gray-700">
                {error.effect}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
