import { useEffect, useState } from "react"
import { ApiVolunteer, eventsApi } from "./api"
import { SevaEvent } from "./events"

export default function AcceptedVolunteers({
  event,
  onBack,
}: {
  event: SevaEvent
  onBack: () => void
}) {
  const [volunteers, setVolunteers] = useState<ApiVolunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    setLoading(true)
    setError("")
    eventsApi.listVolunteers(event.id)
      .then(({ volunteers: next }) => {
        if (active) setVolunteers(next)
      })
      .catch((requestError) => {
        if (!active) return
        setVolunteers([])
        setError(requestError instanceof Error ? requestError.message : "Could not load volunteers.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [event.id])

  return (
    <main className="min-h-dvh bg-[#fcf8ff] px-4 py-5 text-[#09090b]">
      <header className="mx-auto flex w-full max-w-2xl items-center gap-3 border-b border-[#d5c9e1] pb-4">
        <button
          aria-label="Back to event"
          className="rounded-full border border-[#d5c9e1] px-3 py-1 text-xl"
          onClick={onBack}
          type="button"
        >
          ←
        </button>
        <div>
          <p className="font-bold text-[21px]">Accepted Volunteers</p>
          <p className="text-[13px] text-[#756c7b]">{event.title}</p>
        </div>
      </header>

      <section className="mx-auto mt-5 w-full max-w-2xl rounded-[15px] border border-[#d5c9e1] bg-[#fffcff] p-4">
        <h1 className="mb-3 font-bold text-[19px]">
          Volunteers ({volunteers.length}/{event.capacity})
        </h1>
        <div className="divide-y divide-[#d5c9e1]">
          {loading && <p className="py-4 text-sm text-[#756c7b]">Loading volunteers...</p>}
          {!loading && error && <p className="py-4 text-sm text-red-600" role="alert">{error}</p>}
          {!loading && !error && volunteers.length === 0 && (
            <p className="py-4 text-sm text-[#756c7b]">No volunteers have joined this event yet.</p>
          )}
          {!loading && !error && volunteers.map((volunteer) => (
            <div className="flex items-center gap-3 py-3" key={volunteer.name}>
              {volunteer.photoUrl ? (
                <img alt="" className="size-[48px] rounded-full object-cover" src={volunteer.photoUrl} />
              ) : (
                <div className="flex size-[48px] items-center justify-center rounded-full bg-[#ead5f8] font-bold text-[#6606ae]">
                  {volunteer.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-bold">{volunteer.name}</p>
                <p className="text-[12px] text-[#756c7b]">{volunteer.assignment}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  aria-label={`Call ${volunteer.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-[#d5c9e1] text-[#6606ae]"
                  disabled
                  type="button"
                >
                  <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.05 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </button>
                <button
                  aria-label={`Message ${volunteer.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-[#d5c9e1] text-[#6606ae]"
                  disabled
                  type="button"
                >
                  <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.8 8.8 0 0 1-4-.94L3 21l1.93-4.83A8.3 8.3 0 0 1 3 10.5 8.38 8.38 0 0 1 12 2a8.38 8.38 0 0 1 9 9.5Z" />
                  </svg>
                </button>
                <button
                  aria-label={`More actions for ${volunteer.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-[#d5c9e1] text-[#6606ae]"
                  type="button"
                >
                  <span aria-hidden="true" className="text-lg leading-none">⋯</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
