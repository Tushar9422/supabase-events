import { createClient } from '@/lib/supabase/server'
import RsvpForm from './rsvp-form'

export default async function EventPage({ params }: { params: { id: string } }) {
  
  const supabase = await createClient()

  const eventId = Number(params.id) // cast "1" → 1

  /* ---- event ---- */
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single()

  if (error || !event) {
    return <h1 className="p-6">Event not found</h1>
  }

  /* ---- RSVPs ---- */
  const { data: rsvps } = await supabase
    .from('RSVPs')
    .select('status')
    .eq('event_id', eventId)

  const counts = { Yes: 0, No: 0, Maybe: 0 }
  rsvps?.forEach(r => {
    counts[r.status as 'Yes' | 'No' | 'Maybe']++
  })

  /* ---- render ---- */
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date} – {event.city}</p>

      <RsvpForm eventId={event.id} />

      <h2 className="font-semibold mt-6">Responses</h2>
      <ul>
        {Object.entries(counts).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))}
      </ul>
    </main>
  )
}