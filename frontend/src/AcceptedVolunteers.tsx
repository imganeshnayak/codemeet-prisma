import { useEffect, useState } from "react"
import { ApiTask, ApiVolunteer, eventsApi, tasksApi } from "./api"
import { SevaEvent } from "./events"

export default function AcceptedVolunteers({ event, onBack }: { event: SevaEvent; onBack: () => void }) {
  const [volunteers, setVolunteers] = useState<ApiVolunteer[]>([])
  const [tasks, setTasks] = useState<ApiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openVolunteer, setOpenVolunteer] = useState<string | null>(null)
  const [assigning, setAssigning] = useState("")
  const [assignError, setAssignError] = useState("")

  useEffect(() => {
    let active = true
    Promise.all([eventsApi.listVolunteers(event.id), tasksApi.listForEvent(event.id)])
      .then(([volunteerResponse, taskResponse]) => {
        if (!active) return
        setVolunteers(volunteerResponse.volunteers)
        setTasks(taskResponse.tasks)
      })
      .catch((requestError) => {
        if (!active) return
        setError(requestError instanceof Error ? requestError.message : "Could not load volunteers.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [event.id])

  async function assignTask(volunteer: ApiVolunteer, task: ApiTask) {
    setAssigning(`${volunteer.id}:${task.id}`)
    setAssignError("")
    try {
      await eventsApi.assignVolunteer(event.id, volunteer.id, task.title)
      setVolunteers((current) => current.map((item) => item.id === volunteer.id ? { ...item, assignment: task.title } : item))
      setOpenVolunteer(null)
    } catch (requestError) {
      setAssignError(requestError instanceof Error ? requestError.message : "Could not assign task.")
    } finally {
      setAssigning("")
    }
  }

  return (
    <main className="min-h-dvh bg-[#fcf8ff] px-4 py-5 text-[#09090b]">
      <header className="mx-auto flex w-full max-w-2xl items-center gap-3 border-b border-[#d5c9e1] pb-4">
        <button aria-label="Back to event" className="rounded-full border border-[#d5c9e1] px-3 py-1 text-xl" onClick={onBack} type="button">←</button>
        <div className="min-w-0">
          <p className="truncate text-[21px] font-bold">Accepted Volunteers</p>
          <p className="truncate text-[13px] text-[#756c7b]">{event.title}</p>
        </div>
      </header>

      <section className="mx-auto mt-5 w-full max-w-2xl rounded-[15px] border border-[#d5c9e1] bg-[#fffcff] p-4">
        <h1 className="mb-3 text-[19px] font-bold">Volunteers ({volunteers.length}/{event.capacity})</h1>
        <div className="divide-y divide-[#d5c9e1]">
          {loading && <p className="py-4 text-sm text-[#756c7b]">Loading volunteers...</p>}
          {!loading && error && <p className="py-4 text-sm text-red-600" role="alert">{error}</p>}
          {!loading && !error && volunteers.length === 0 && <p className="py-4 text-sm text-[#756c7b]">No volunteers have joined this event yet.</p>}
          {!loading && !error && volunteers.map((volunteer) => (
            <div className="flex items-center gap-3 py-3" key={volunteer.id}>
              {volunteer.photoUrl ? <img alt="" className="size-12 shrink-0 rounded-full object-cover" src={volunteer.photoUrl} /> : <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ead5f8] font-bold text-[#6606ae]">{volunteer.name.slice(0, 1).toUpperCase()}</div>}
              <div className="min-w-0">
                <p className="truncate font-bold">{volunteer.name}</p>
                <p className="truncate text-[12px] text-[#756c7b]">{volunteer.assignment}</p>
              </div>
              <div className="relative ml-auto shrink-0">
                <button aria-label={`More actions for ${volunteer.name}`} className="flex size-9 items-center justify-center rounded-full border border-[#d5c9e1] text-[#6606ae]" onClick={() => setOpenVolunteer((current) => current === volunteer.id ? null : volunteer.id)} type="button">⋯</button>
                {openVolunteer === volunteer.id && (
                  <div className="absolute right-0 top-11 z-10 w-56 rounded-xl border border-[#d5c9e1] bg-white p-3 shadow-lg">
                    <p className="mb-2 text-xs font-bold">Assign task</p>
                    {tasks.length === 0 && <p className="text-xs text-[#756c7b]">No tasks posted yet.</p>}
                    <div className="grid gap-1">
                      {tasks.map((task) => (
                        <button className="rounded-lg px-2 py-2 text-left text-xs hover:bg-[#f3e8fb]" disabled={Boolean(assigning)} key={task.id} onClick={() => void assignTask(volunteer, task)} type="button">
                          {assigning === `${volunteer.id}:${task.id}` ? "Assigning..." : task.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {assignError && <p className="mt-3 text-sm text-red-600" role="alert">{assignError}</p>}
      </section>
    </main>
  )
}
