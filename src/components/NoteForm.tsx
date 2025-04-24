'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNotes } from '@/app/hooks/useNotes'

export default function NoteForm() {
  const { createNote } = useNotes()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return

    createNote.mutate({ title, content })
    setTitle('')
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-3 w-full max-w-md">
      <input
        type="text"
        placeholder="Title"
        className="w-full border px-3 py-2 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note here..."
        className="w-full border px-3 py-2 rounded-md h-32 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" className="w-full" disabled={createNote.isPending}>
        {createNote.isPending ? 'Saving...' : 'Add Note'}
      </Button>
    </form>
  )
}
