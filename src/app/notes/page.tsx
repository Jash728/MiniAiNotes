'use client'

import { useNotes } from '@/app/hooks/useNotes'
import NoteForm from '@/components/NoteForm'
import NoteCard from '@/components/NoteCard'
import Navbar from '@/components/Navbar'

export default function NotesPage() {
  const { notes, isLoading } = useNotes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <NoteForm />

        {isLoading && <p className="text-gray-500">Loading notes...</p>}

        <div className="space-y-4">
          {notes?.length === 0 && <p className="text-gray-400 text-center">No notes yet.</p>}
          {notes?.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </main>
    </div>
  )
}
