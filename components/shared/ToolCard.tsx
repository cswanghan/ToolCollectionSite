'use client'

import Link from 'next/link'
import { Star, ExternalLink, MousePointer } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ToolWithCategory, trackToolClick } from '@/lib/services/tools'

interface ToolCardProps {
  tool: ToolWithCategory
  viewMode?: 'grid' | 'list'
}

export function ToolCard({ tool, viewMode = 'grid' }: ToolCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(tool.id))
  }, [tool.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== tool.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      favorites.push(tool.id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  const handleClick = async () => {
    // 记录最近使用
    const recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]')
    const filtered = recentTools.filter((id: string) => id !== tool.id)
    filtered.unshift(tool.id)
    localStorage.setItem('recentTools', JSON.stringify(filtered.slice(0, 10)))
    
    // 记录点击统计到后端
    await trackToolClick(tool.id)
  }

  if (viewMode === 'list') {
    return (
      <div className="relative group">
        <Link
          href={`/t/${tool.id}`}
          onClick={handleClick}
          className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                {tool.description}
              </p>
            </div>
            <div className="flex items-center gap-4 ml-4">
              {tool.click_count > 0 && (
                <div className="flex items-center text-sm text-slate-500">
                  <MousePointer className="w-4 h-4 mr-1" />
                  {tool.click_count}
                </div>
              )}
              <div className="flex flex-wrap gap-1 max-w-xs">
                {tool.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(e)
              }}
              className={cn(
                "p-1.5 rounded-full transition-all duration-200",
                isFavorite
                  ? "text-yellow-500 hover:text-yellow-600"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
              aria-label={isFavorite ? "取消收藏" : "添加收藏"}
            >
              <Star className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative group">
      <Link
        href={`/t/${tool.id}`}
        onClick={handleClick}
        className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {tool.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {tool.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2 flex-shrink-0" />
        </div>
      </Link>
      
      <button
        onClick={toggleFavorite}
        className={cn(
          "absolute top-4 right-4 p-1.5 rounded-full transition-all duration-200",
          isFavorite
            ? "text-yellow-500 hover:text-yellow-600"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        )}
        aria-label={isFavorite ? "取消收藏" : "添加收藏"}
      >
        <Star className={cn("w-4 h-4", isFavorite && "fill-current")} />
      </button>
    </div>
  )
}