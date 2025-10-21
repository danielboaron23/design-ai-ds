export interface Post {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  coverImage: string | null
  publishTiming: 'now' | 'schedule' | 'draft'
  scheduledDate: string
  visibility: 'all' | 'paid'
  seoTitle: string
  seoDescription: string
  status: 'published' | 'scheduled' | 'draft'
  createdAt: string
  updatedAt: string
  publishedAt?: string
  author: string
  views?: number
  likes?: number
}

