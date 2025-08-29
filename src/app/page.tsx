import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient() 

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().slice(0, 10))
    .order('date')

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upcoming events</h1>
      <ul>
        {events?.map(ev => (
          <li key={ev.id} className="border p-4 rounded mb-2">
            <a href={`/event/${ev.id}`} className="font-medium">
              {ev.title} – {ev.date}
            </a>
            <p>{ev.city}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}