'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { summarizeNote } from '@/lib/summarize'
import { useNotes } from '@/app/hooks/useNotes'

interface NoteCardProps {
  id: string
  title: string
  content: string
  created_at: string
}

export default function NoteCard({ id, title, content, created_at }: NoteCardProps) {
  const { deleteNote } = useNotes()
  const [summary, setSummary] = useState('')
  const [summarizing, setSummarizing] = useState(false)

  const handleDelete = () => {
    if (confirm('Delete this note?')) deleteNote.mutate(id)
  }

  const handleSummarize = async () => {
    setSummarizing(true)
    try {
      const result = await summarizeNote(content)
      setSummary(result)
    } catch (err) {
      console.log(err)
      alert('Failed to summarize')
    }
    setSummarizing(false)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400 mt-1">{new Date(created_at).toLocaleString()}</p>
      </div>

      <p className="text-gray-700 text-sm whitespace-pre-line">{content}</p>

      {summary && (
        <div className="bg-slate-50 p-3 rounded-xl text-sm text-gray-700 border border-gray-200">
          <strong>AI Summary:</strong> {summary}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleSummarize} disabled={summarizing}>
          {summarizing ? 'Summarizing...' : 'Summarize'}
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}
