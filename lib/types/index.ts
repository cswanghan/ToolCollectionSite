export interface Tool {
  id: string
  categoryId: string
  name: string
  description: string
  url: string
  iconUrl?: string
  tags: string[]
  clickCount: number
  createdAt: string
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  orderIndex: number
}

export interface ClickLog {
  id: string
  toolId: string
  timestamp: string
  ipAddress?: string
  referrer?: string
  userAgent?: string
}

export interface UserFavorite {
  userId: string
  toolId: string
  createdAt: string
}