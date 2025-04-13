import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">AI Chat</div>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-black transition-colors">
              功能
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-black transition-colors">
              价格
            </Link>
            <Link href="/chat" className="primary-button !py-2">
              开始使用
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                智能对话新境界
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              体验下一代 AI 对话助手，让沟通更智能、更自然、更高效
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/chat" className="primary-button">
                免费开始使用
              </Link>
              <Link href="/features" className="px-8 py-4 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 演示区域 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl overflow-hidden">
              {/* 窗口装饰 */}
              <div className="bg-gray-50 bg-opacity-80 p-4 border-b border-gray-100 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              
              {/* 对话演示 */}
              <div className="p-6 space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.82 2H14.18C16.73 2 17.5 2.77 17.5 5.32V8.32C17.5 10.87 16.73 11.64 14.18 11.64H9.82C7.27 11.64 6.5 10.87 6.5 8.32V5.32C6.5 2.77 7.27 2 9.82 2Z"/>
                    </svg>
                  </div>
                  <div className="chat-bubble chat-bubble-ai">
                    你好！我是你的 AI 助手。我可以帮你回答问题、写作、编程，或者探讨任何话题。
                  </div>
                </div>
                
                <div className="flex items-start justify-end space-x-3">
                  <div className="chat-bubble chat-bubble-user">
                    你能帮我写一篇关于人工智能的文章吗？
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex-shrink-0"></div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.82 2H14.18C16.73 2 17.5 2.77 17.5 5.32V8.32C17.5 10.87 16.73 11.64 14.18 11.64H9.82C7.27 11.64 6.5 10.87 6.5 8.32V5.32C6.5 2.77 7.27 2 9.82 2Z"/>
                    </svg>
                  </div>
                  <div className="chat-bubble chat-bubble-ai">
                    当然可以！让我们从人工智能的定义开始，然后讨论它的应用领域和未来发展...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特点介绍 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择我们？</h2>
            <p className="text-xl text-gray-600">领先的 AI 技术，卓越的用户体验</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-2xl">
              <div className="feature-icon mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">智能理解</h3>
              <p className="text-gray-600">先进的自然语言处理技术，准确理解您的需求</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="feature-icon mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">快速响应</h3>
              <p className="text-gray-600">毫秒级响应速度，流畅的对话体验</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="feature-icon mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">安全可靠</h3>
              <p className="text-gray-600">企业级安全保障，保护您的隐私数据</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              准备好开始智能对话了吗？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              立即体验 AI 带来的无限可能
            </p>
            <Link href="/chat" className="primary-button">
              免费开始使用
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2024 AI Chat. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-black transition-colors">
                服务条款
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 