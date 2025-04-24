import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const { content } = await req.json()

  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'Summarize the user’s note briefly in 1-2 sentences.',
          },
          {
            role: 'user',
            content,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const summary = res.data.choices?.[0]?.message?.content || 'No summary returned.'
    return NextResponse.json({ summary })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string })?.message || error.message
      console.error('[Summarize Route Error]', message)
      return new NextResponse(
        JSON.stringify({ error: 'Failed to summarize', detail: message }),
        { status: 500 }
      )
    }

    console.error('[Summarize Route Error]', error)
    return new NextResponse(
      JSON.stringify({ error: 'Unexpected error', detail: String(error) }),
      { status: 500 }
    )
  }
}
