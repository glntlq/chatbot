'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

// 导入代码高亮样式
import 'highlight.js/styles/github-dark.css'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp?: Date
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// 自定义 Markdown 组件
const MarkdownComponents = {
  // 自定义代码块渲染
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    
    if (inline) {
      return (
        <code className="px-1 py-0.5 rounded-md bg-gray-100 text-gray-800 text-sm font-mono" {...props}>
          {children}
        </code>
      )
    }

    return (
      <div className="relative group">
        {language && (
          <div className="absolute right-2 top-2 text-xs text-gray-400">
            {language}
          </div>
        )}
        <pre className="p-4 rounded-lg bg-gray-900 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  },
  // 自定义链接渲染
  a: ({ node, children, href, ...props }: any) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
        {...props}
      >
        {children}
      </a>
    )
  },
  // 自定义列表渲染
  ul: ({ node, children, ...props }: any) => {
    return (
      <ul className="list-disc list-inside space-y-1 my-2" {...props}>
        {children}
      </ul>
    )
  },
  ol: ({ node, children, ...props }: any) => {
    return (
      <ol className="list-decimal list-inside space-y-1 my-2" {...props}>
        {children}
      </ol>
    )
  },
  // 自定义标题渲染
  h1: ({ node, children, ...props }: any) => (
    <h1 className="text-2xl font-bold my-4" {...props}>{children}</h1>
  ),
  h2: ({ node, children, ...props }: any) => (
    <h2 className="text-xl font-bold my-3" {...props}>{children}</h2>
  ),
  h3: ({ node, children, ...props }: any) => (
    <h3 className="text-lg font-bold my-2" {...props}>{children}</h3>
  ),
  // 自定义表格渲染
  table: ({ node, children, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ node, children, ...props }: any) => (
    <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500" {...props}>
      {children}
    </th>
  ),
  td: ({ node, children, ...props }: any) => (
    <td className="px-4 py-2 text-sm text-gray-900" {...props}>
      {children}
    </td>
  ),
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `你好啊，小朋友！👋 我是你的学习小伙伴。

我很高兴能和你一起探索知识的海洋！记住，学习最重要的不是得到答案，而是理解问题和思考的过程。

我会这样帮助你：
- 当你遇到困难时，我会引导你一步步思考 🤔
- 当你有好的想法时，我会给你鼓励 👍
- 当你需要提示时，我会给你一些小贴士 💡

让我们一起思考、探索和学习吧！你可以问我任何问题，包括：
- 功课上遇到的难题
- 生活中的科学现象
- 有趣的知识探索
- 或者任何让你好奇的事情

准备好开始我们的学习冒险了吗？`,
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 自动调整输入框高度
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  // 处理快捷键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    // 重置输入框高度
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px'
    }

    try {
      const chatHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }))
      chatHistory.push({ role: 'user', content: userMessage.content })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        content: '抱歉，我遇到了一些问题。请稍后再试。',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-gray-600 transition-colors">
            AI Chat
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 聊天区域 */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 py-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* 头像 */}
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                  ${message.isUser ? 'bg-black' : 'bg-blue-100'}`}
                >
                  {message.isUser ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.82 2H14.18C16.73 2 17.5 2.77 17.5 5.32V8.32C17.5 10.87 16.73 11.64 14.18 11.64H9.82C7.27 11.64 6.5 10.87 6.5 8.32V5.32C6.5 2.77 7.27 2 9.82 2Z"/>
                    </svg>
                  )}
                </div>

                {/* 消息气泡 */}
                <div className={`group relative chat-bubble prose prose-sm max-w-none ${
                  message.isUser ? 'chat-bubble-user prose-invert' : 'chat-bubble-ai'
                }`}>
                  {message.isUser ? (
                    <p className="whitespace-pre-wrap m-0 text-white">{message.content}</p>
                  ) : (
                    <ReactMarkdown
                      components={MarkdownComponents}
                      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                  {message.timestamp && (
                    <span className="absolute bottom-0 translate-y-full mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* 加载状态 */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            
            {/* 用于自动滚动的空白 div */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    adjustTextareaHeight()
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="输入你的问题... (按 Enter 发送，Shift + Enter 换行)"
                  className="w-full rounded-xl border-2 border-gray-200 p-4 pr-12 focus:border-gray-400 focus:ring-0 resize-none"
                  style={{ minHeight: '60px', maxHeight: '200px' }}
                />
                {!isLoading && inputValue && (
                  <button
                    type="submit"
                    className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`primary-button ${
                  !inputValue.trim() || isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                发送
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 