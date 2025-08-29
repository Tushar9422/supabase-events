'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RsvpForm({ eventId }: { eventId: number }) {
  const supabase = createClient()
  const [status, setStatus] = useState<'Yes'|'No'|'Maybe'|''>('')

  async function update(choice: 'Yes'|'No'|'Maybe') {
    setStatus('')                                    // pending indicator
    await supabase.from('RSVPs').upsert(
      { event_id: eventId, user_id: 1, status: choice },  // demo user_id:1
      { onConflict: 'event_id,user_id' }
    )
    setStatus(choice)
  }

  return (
    <div className="space-x-2">
      {['Yes','No','Maybe'].map(opt => (
        <button key={opt} onClick={() => update(opt as any)}
          className="px-3 py-1 border rounded">{opt}</button>
      ))}
      {status && <span className="ml-3">Saved: {status}</span>}
    </div>
  )
}
