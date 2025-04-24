import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useNotes() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const user = (await supabase.auth.getUser()).data.user
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  const createNote = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const user = (await supabase.auth.getUser()).data.user
      const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user?.id,
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notes').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return { notes: data, isLoading, createNote, deleteNote }
}
