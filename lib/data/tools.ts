import { Tool, Category } from '@/lib/types'

export const categories: Category[] = [
  { id: '1', slug: 'dev', name: '开发', icon: '💻', orderIndex: 1 },
  { id: '2', slug: 'text', name: '文本', icon: '📝', orderIndex: 2 },
  { id: '3', slug: 'time', name: '时间', icon: '⏰', orderIndex: 3 },
  { id: '4', slug: 'image', name: '图片', icon: '🖼️', orderIndex: 4 },
  { id: '5', slug: 'media', name: '音视频', icon: '🎬', orderIndex: 5 },
  { id: '6', slug: 'life', name: '生活', icon: '🎯', orderIndex: 6 },
]

export const tools: Tool[] = [
  // 开发工具
  {
    id: '1',
    categoryId: '1',
    name: 'JSON Beautifier',
    description: '支持 JSON 格式化/压缩/高亮',
    url: 'https://jsonformatter.org/',
    tags: ['JSON', 'Beautify', 'Format'],
    clickCount: 1523,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'JWT Decoder',
    description: '解码和验证 JWT Token',
    url: 'https://jwt.io/',
    tags: ['JWT', 'Token', 'Decode'],
    clickCount: 892,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Regex Tester',
    description: '正则表达式测试和调试',
    url: 'https://regex101.com/',
    tags: ['Regex', 'Test', 'Debug'],
    clickCount: 1234,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    categoryId: '1',
    name: 'UUID Generator',
    description: '生成 UUID/GUID',
    url: 'https://www.uuidgenerator.net/',
    tags: ['UUID', 'GUID', 'Generator'],
    clickCount: 567,
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    categoryId: '1',
    name: 'Base64 Encode/Decode',
    description: 'Base64 编码解码工具',
    url: 'https://www.base64encode.org/',
    tags: ['Base64', 'Encode', 'Decode'],
    clickCount: 789,
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '6',
    categoryId: '1',
    name: 'URL Encoder/Decoder',
    description: 'URL 编码解码工具',
    url: 'https://www.urlencoder.org/',
    tags: ['URL', 'Encode', 'Decode'],
    clickCount: 456,
    createdAt: '2024-01-06T00:00:00Z',
  },
  
  // 文本工具
  {
    id: '7',
    categoryId: '2',
    name: 'Markdown Editor',
    description: '在线 Markdown 编辑器',
    url: 'https://dillinger.io/',
    tags: ['Markdown', 'Editor', 'Preview'],
    clickCount: 1890,
    createdAt: '2024-01-07T00:00:00Z',
  },
  {
    id: '8',
    categoryId: '2',
    name: 'Text Formatter',
    description: '文本格式化和转换',
    url: 'https://textfixer.com/',
    tags: ['Text', 'Format', 'Convert'],
    clickCount: 567,
    createdAt: '2024-01-08T00:00:00Z',
  },
  {
    id: '9',
    categoryId: '2',
    name: 'Word Counter',
    description: '字数统计工具',
    url: 'https://wordcounter.net/',
    tags: ['Word', 'Count', 'Statistics'],
    clickCount: 345,
    createdAt: '2024-01-09T00:00:00Z',
  },
  
  // 时间工具
  {
    id: '10',
    categoryId: '3',
    name: 'Timestamp Converter',
    description: 'Unix 时间戳转换',
    url: 'https://www.epochconverter.com/',
    tags: ['Timestamp', 'Unix', 'Convert'],
    clickCount: 2345,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '11',
    categoryId: '3',
    name: 'World Clock',
    description: '世界时钟和时区转换',
    url: 'https://www.timeanddate.com/worldclock/',
    tags: ['Clock', 'Timezone', 'World'],
    clickCount: 789,
    createdAt: '2024-01-11T00:00:00Z',
  },
  
  // 图片工具
  {
    id: '12',
    categoryId: '4',
    name: 'Image Compressor',
    description: '在线图片压缩工具',
    url: 'https://tinypng.com/',
    tags: ['Image', 'Compress', 'Optimize'],
    clickCount: 3456,
    createdAt: '2024-01-12T00:00:00Z',
  },
  {
    id: '13',
    categoryId: '4',
    name: 'QR Code Generator',
    description: '二维码生成器',
    url: 'https://www.qr-code-generator.com/',
    tags: ['QR', 'Code', 'Generator'],
    clickCount: 1234,
    createdAt: '2024-01-13T00:00:00Z',
  },
  {
    id: '14',
    categoryId: '4',
    name: 'Color Picker',
    description: '颜色选择和转换',
    url: 'https://htmlcolorcodes.com/',
    tags: ['Color', 'Picker', 'Palette'],
    clickCount: 890,
    createdAt: '2024-01-14T00:00:00Z',
  },
  
  // 音视频工具
  {
    id: '15',
    categoryId: '5',
    name: 'YouTube Downloader',
    description: 'YouTube 视频下载',
    url: 'https://www.y2mate.com/',
    tags: ['YouTube', 'Download', 'Video'],
    clickCount: 4567,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '16',
    categoryId: '5',
    name: 'Audio Converter',
    description: '音频格式转换',
    url: 'https://online-audio-converter.com/',
    tags: ['Audio', 'Convert', 'MP3'],
    clickCount: 678,
    createdAt: '2024-01-16T00:00:00Z',
  },
  
  // 生活工具
  {
    id: '17',
    categoryId: '6',
    name: 'Calculator',
    description: '科学计算器',
    url: 'https://www.desmos.com/scientific',
    tags: ['Calculator', 'Math', 'Science'],
    clickCount: 2345,
    createdAt: '2024-01-17T00:00:00Z',
  },
  {
    id: '18',
    categoryId: '6',
    name: 'Unit Converter',
    description: '单位转换工具',
    url: 'https://www.unitconverters.net/',
    tags: ['Unit', 'Convert', 'Measurement'],
    clickCount: 456,
    createdAt: '2024-01-18T00:00:00Z',
  },
]

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(tool => tool.categoryId === categoryId)
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}