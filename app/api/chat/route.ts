import { NextResponse } from 'next/server'
import { chatWithDeepseek } from '../../services/deepseek'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    
    const response = await chatWithDeepseek(messages)
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
} 