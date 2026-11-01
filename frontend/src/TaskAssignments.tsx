import { FormEvent, useEffect, useState } from "react"
import { ApiTask, tasksApi } from "./api"
import { formatEventDate, SevaEvent } from "./events"

export default function TaskAssignments({
  event,
  onBack,
  onVolunteers,
  onAssignments,
  onPhotos,
  onCommunity,
  onTaskCreated,
  showNavigationTabs = true,
}: {
  event: SevaEvent
  onBack: () => void
  onVolunteers: () => void
  onAssignments?: () => void
  onPhotos: () => void
  onCommunity?: () => void
  onTaskCreated?: (task: ApiTask) => void
  showNavigationTabs?: boolean
}) {
  const [taskList, setTaskList] = useState<ApiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [addingTask, setAddingTask] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Community")
  const [volunteers, setVolunteers] = useState("0")
  const [points, setPoints] = useState("50")
  const [saveError, setSaveError] = useState("")
  const [saving, setSaving] = useState(false)

  async function loadTasks() {
    setLoading(true)
    setLoadError("")
    try {
      const { tasks } = await tasksApi.listForEvent(event.id)
      setTaskList(tasks)
    } catch (error) {
      setTaskList([])
      setLoadError(error instanceof Error ? error.message : "Could not load tasks.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [event.id])

  async function submitTask(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()
    if (!title.trim() || !description.trim()) {
      setSaveError("Enter a task title and description.")
      return
    }
    setSaving(true)
    setSaveError("")
    try {
      const { task } = await tasksApi.create({
        eventId: event.id,
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "Community",
        volunteers: Number(volunteers) || 0,
        points: points.trim() || "50",
        image: event.image,
      })
      setTaskList((current) => [task, ...current])
      onTaskCreated?.(task)
      setTitle("")
      setDescription("")
      setAddingTask(false)
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not post task.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-dvh bg-[#fcf9ff] text-[#29115e]">
      <header className="flex h-14 items-center gap-3 border-b border-[#e2cff3] px-4">
        <button aria-label="Back" className="text-2xl" onClick={onBack} type="button">←</button>
        <div>
          <p className="font-bold">Task Assignments</p>
          <p className="text-xs text-[#685775]">{event.title}</p>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
        <div className={showNavigationTabs ? "grid grid-cols-2 gap-2" : "hidden"}>
          <button className="rounded-xl border border-[#e2cff3] bg-white p-3 text-sm font-bold" onClick={onVolunteers} type="button">1. Volunteers</button>
          <button className="rounded-xl bg-[#9036cd] p-3 text-sm font-bold text-white" onClick={onAssignments} type="button">2. Task Assignments</button>
          <button className="rounded-xl border border-[#e2cff3] bg-white p-3 text-sm font-bold" onClick={onPhotos} type="button">3. Event Photos</button>
          <button className="rounded-xl border border-[#e2cff3] bg-white p-3 text-sm font-bold" onClick={onCommunity} type="button">4. Community</button>
        </div>

        <div className="rounded-xl border border-[#e2cff3] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="font-bold">Tasks</h1>
              <p className="text-xs text-[#685775]">{formatEventDate(event.date)} · {event.time}</p>
            </div>
            <button className="rounded-lg bg-[#9036cd] px-3 py-2 text-sm font-bold text-white" onClick={() => setAddingTask((current) => !current)} type="button">
              {addingTask ? "Cancel" : "Add task"}
            </button>
          </div>
        </div>

        {addingTask && (
          <form className="rounded-xl border border-[#e2cff3] bg-white p-4" onSubmit={submitTask}>
            <div className="grid gap-3">
              <input className="rounded-lg border border-[#d5c9e1] p-3" onChange={(e) => setTitle(e.target.value)} placeholder="Task title" value={title} />
              <textarea className="rounded-lg border border-[#d5c9e1] p-3" onChange={(e) => setDescription(e.target.value)} placeholder="Task description" value={description} />
              <input className="rounded-lg border border-[#d5c9e1] p-3" onChange={(e) => setCategory(e.target.value)} placeholder="Category" value={category} />
              <div className="grid grid-cols-2 gap-3">
                <input className="rounded-lg border border-[#d5c9e1] p-3" min="0" onChange={(e) => setVolunteers(e.target.value)} type="number" value={volunteers} />
                <input className="rounded-lg border border-[#d5c9e1] p-3" onChange={(e) => setPoints(e.target.value)} placeholder="Points" value={points} />
              </div>
              {saveError && <p className="text-sm text-red-600" role="alert">{saveError}</p>}
              <button className="rounded-lg bg-[#18151d] p-3 font-bold text-white" disabled={saving} type="submit">{saving ? "Saving..." : "Post task"}</button>
            </div>
          </form>
        )}

        <section className="rounded-xl border border-[#e2cff3] bg-white p-4">
          <h2 className="font-bold">Posted tasks ({taskList.length})</h2>
          {loading && <p className="py-5 text-sm text-[#685775]">Loading tasks...</p>}
          {!loading && loadError && <p className="py-5 text-sm text-red-600" role="alert">{loadError}</p>}
          {!loading && !loadError && taskList.length === 0 && <p className="py-5 text-sm text-[#685775]">No tasks posted for this event yet.</p>}
          {!loading && !loadError && taskList.length > 0 && (
            <div className="mt-3 grid gap-3">
              {taskList.map((task) => (
                <article className="rounded-lg border border-[#e2cff3] p-3" key={task.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="mt-1 text-sm text-[#685775]">{task.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#eedffb] px-2 py-1 text-xs font-bold">{task.category}</span>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-[#685775]">
                    <span>{task.volunteers} volunteers</span>
                    <span>{task.points} points</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}
