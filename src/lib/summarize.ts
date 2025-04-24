import axios from 'axios'

export async function summarizeNote(content: string): Promise<string> {
  const res = await axios.post('/api/summarize', { content })
  return res.data.summary
}
