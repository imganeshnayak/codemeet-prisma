import { useEffect, useMemo, useRef, useState } from "react"
import { EventRole, EventStatus, formatEventDate, SevaEvent } from "./events"
import NavigationIcon from "./NavigationIcon"

type Destination = "home" | "tasks" | "my-events" | "memories" | "profile"

function Glyph({
  name,
  className = "h-5 w-5",
}: {
  name: "arrow" | "bell" | "calendar" | "check" | "close" | "image" | "home" | "location" | "profile" | "search" | "tasks" | "users"
  className?: string
}) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    tasks: (
      <>
        <rect x="3" y="4" width="7" height="8" rx="1.5" />
        <rect x="14" y="4" width="7" height="8" rx="1.5" />
        <rect x="6" y="12" width="7" height="8" rx="1.5" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

const statuses: Array<"All" | EventStatus> = [
  "All",
  "Upcoming",
  "Ongoing",
  "Completed",
]

function StatusBadge({ status }: { status: EventStatus }) {
  const styles = {
    Upcoming: "bg-[#eee1ff] text-[#6f19b6]",
    Ongoing: "bg-[#e4f7cb] text-[#2d713c]",
    Completed: "bg-[#ffe1ef] text-[#8e246d]",
  }
  return (
    <span
      className={`font-outfit-semibold inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${styles[status]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  )
}

function EventCard({
  event,
  onDetails,
  onManage,
  onProof,
  onTasks,
}: {
  event: SevaEvent
  onDetails: (event: SevaEvent, trigger: HTMLButtonElement) => void
  onManage: (event: SevaEvent) => void
  onProof: () => void
  onTasks: (event: SevaEvent) => void
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border-2 border-[#18151d] bg-white shadow-[5px_6px_0_#18151d]">
      <div className="relative h-44 overflow-hidden">
        <img
          alt={`${event.title} event`}
          className="h-full w-full object-cover"
          src={event.image}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="font-outfit-semibold rounded-full bg-white px-3 py-1.5 text-xs shadow-sm">
            {event.category}
          </span>
          <StatusBadge status={event.status} />
        </div>
      </div>
      <div className="p-5">
        <h2 className="font-outfit-extrabold text-[23px] leading-tight tracking-[-0.5px]">
          {event.title}
        </h2>
        <div className="font-outfit-regular mt-3 space-y-2 text-sm text-[#5f5964]">
          <p className="flex items-center gap-2">
            <Glyph
              className="h-4 w-4 shrink-0 text-[#8c23df]"
              name="location"
            />
            {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Glyph
              className="h-4 w-4 shrink-0 text-[#8c23df]"
              name="calendar"
            />
            {formatEventDate(event.date)} · {event.time}
          </p>
        </div>

        <div className="mt-4 rounded-[14px] bg-[#f7efff] p-3">
          {event.role === "attending" ? (
            <>
              <p className="font-outfit-semibold text-xs text-[#756c7b]">
                Organized by {event.organizer}
              </p>
              <p className="font-outfit-bold mt-1 text-sm">
                Your role: {event.assignment || "Volunteer"}
              </p>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <strong className="font-outfit-extrabold text-xl">
                  {event.volunteers}
                </strong>
                <span className="font-outfit-regular block text-xs text-[#756c7b]">
                  Volunteers
                </span>
              </div>
              <div>
                <strong className="font-outfit-extrabold text-xl">
                  {event.tasks}
                </strong>
                <span className="font-outfit-regular block text-xs text-[#756c7b]">
                  Assigned tasks
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {event.role === "attending" ? (
            <>
              <button
                className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-white text-sm"
                onClick={(clickEvent) =>
                  onDetails(event, clickEvent.currentTarget)
                }
                type="button"
              >
                View details
              </button>
              {event.status === "Ongoing" ? (
                <button
                  className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-sm"
                  onClick={onProof}
                  type="button"
                >
                  Upload proof
                </button>
              ) : (
                <button
                  className="font-outfit-bold h-11 rounded-xl bg-[#8c23df] text-sm text-white"
                  onClick={(clickEvent) =>
                    onDetails(event, clickEvent.currentTarget)
                  }
                  type="button"
                >
                  Event info
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-sm"
                onClick={() => onManage(event)}
                type="button"
              >
                Volunteers
              </button>
              <button
                className="font-outfit-bold h-11 rounded-xl bg-[#8c23df] text-sm text-white"
                onClick={() => onTasks(event)}
                type="button"
              >
                Assign tasks
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function DetailDialog({
  event,
  onClose,
}: {
  event: SevaEvent | null
  onClose: () => void
}) {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!event) return
    closeButton.current?.focus()
    function closeOnEscape(keyEvent: KeyboardEvent) {
      if (keyEvent.key === "Escape") onClose()
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [event, onClose])

  if (!event) return null

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#18151d]/55 p-3 sm:items-center"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.currentTarget === mouseEvent.target) onClose()
      }}
      role="dialog"
    >
      <div className="max-h-[88dvh] w-full max-w-[560px] overflow-y-auto rounded-[26px] border-2 border-[#18151d] bg-white p-5 shadow-[7px_8px_0_#18151d]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <StatusBadge status={event.status} />
            <h2 className="font-outfit-extrabold mt-3 text-3xl tracking-[-1px]">
              {event.title}
            </h2>
          </div>
          <button
            aria-label="Close event details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#f7efff]"
            onClick={onClose}
            ref={closeButton}
            type="button"
          >
            <Glyph name="close" />
          </button>
        </div>
        <img
          alt=""
          className="mt-5 h-48 w-full rounded-[18px] object-cover"
          src={event.image}
        />
        <p className="font-outfit-regular mt-5 leading-relaxed text-[#5f5964]">
          {event.description}
        </p>
        <dl className="mt-5 grid gap-3 rounded-[18px] bg-[#f7efff] p-4 sm:grid-cols-2">
          <div>
            <dt className="font-outfit-semibold text-xs text-[#756c7b]">
              Schedule
            </dt>
            <dd className="font-outfit-bold mt-1 text-sm">
              {formatEventDate(event.date)}, {event.time}
            </dd>
          </div>
          <div>
            <dt className="font-outfit-semibold text-xs text-[#756c7b]">
              Location
            </dt>
            <dd className="font-outfit-bold mt-1 text-sm">{event.location}</dd>
          </div>
          <div>
            <dt className="font-outfit-semibold text-xs text-[#756c7b]">
              Skills
            </dt>
            <dd className="font-outfit-bold mt-1 text-sm">
              {event.skills || "No special skills needed"}
            </dd>
          </div>
          <div>
            <dt className="font-outfit-semibold text-xs text-[#756c7b]">
              Capacity
            </dt>
            <dd className="font-outfit-bold mt-1 text-sm">
              {event.capacity} volunteers
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default function MyEvents({
  events,
  onCreate,
  onManage,
  onNavigate,
  onProof,
  onTasks,
}: {
  events: SevaEvent[]
  onCreate: () => void
  onManage: (event: SevaEvent) => void
  onNavigate: (destination: Destination) => void
  onProof: () => void
  onTasks: (event: SevaEvent) => void
}) {
  const [role, setRole] = useState<EventRole>("attending")
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"All" | EventStatus>("All")
  const [detailEvent, setDetailEvent] = useState<SevaEvent | null>(null)
  const detailTrigger = useRef<HTMLButtonElement | null>(null)

  const roleEvents = events.filter((event) => event.role === role)
  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return roleEvents.filter((event) => {
      const matchesQuery =
        !normalizedQuery ||
        [event.title, event.category, event.location].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        )
      return matchesQuery && (status === "All" || event.status === status)
    })
  }, [query, roleEvents, status])

  function closeDetails() {
    setDetailEvent(null)
    window.setTimeout(() => detailTrigger.current?.focus(), 0)
  }

  function clearFilters() {
    setQuery("")
    setStatus("All")
  }

  return (
    <main className="min-h-dvh bg-[#f7efff] pb-[112px] text-[#18151d]">
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5 sm:px-8">
        <div>
          <h1 className="font-outfit-extrabold text-[32px] leading-none tracking-[-1.3px] text-[#18151d] sm:text-[38px]">
            My Events
          </h1>
          <p className="font-outfit-semibold mt-1 text-sm text-[#8c23df]">
            All in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
            type="button"
          >
            <Glyph className="h-6 w-6" name="bell" />
            <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff3d56]" />
          </button>
          <button
            aria-label="Open profile"
            className="font-outfit-bold flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#d8f23c] text-sm"
            onClick={() => onNavigate("profile")}
            type="button"
          >
            AS
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-outfit-regular mt-4 max-w-[580px] text-[16px] leading-relaxed text-[#5f5964] sm:text-lg">
              Keep up with events you joined and the communities you organize.
            </p>
          </div>
          <button
            className="font-outfit-bold flex h-14 items-center justify-center gap-2 rounded-[14px] border-2 border-[#18151d] bg-[#d8f23c] px-6 shadow-[4px_5px_0_#18151d] transition hover:-translate-y-0.5"
            onClick={onCreate}
            type="button"
          >
            <span className="text-xl">+</span>
            Create event
          </button>
        </div>

        <div
          aria-label="Event role"
          className="mt-8 grid max-w-[560px] grid-cols-2 gap-2 rounded-[18px] border-2 border-[#18151d] bg-white p-2"
          role="tablist"
        >
          {(["attending", "organizing"] as EventRole[]).map((tabRole) => {
            const active = role === tabRole
            const count = events.filter(
              (event) => event.role === tabRole,
            ).length
            return (
              <button
                aria-selected={active}
                className={`font-outfit-bold flex h-12 items-center justify-center gap-2 rounded-xl transition ${
                  active
                    ? "bg-[#8c23df] text-white shadow-[2px_3px_0_#18151d]"
                    : "text-[#655e6a] hover:bg-[#f7efff]"
                }`}
                key={tabRole}
                onClick={() => setRole(tabRole)}
                role="tab"
                type="button"
              >
                {tabRole === "attending" ? "Attending" : "Organizing"}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active ? "bg-white/20" : "bg-[#eee6f4]"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-[20px] border-2 border-[#ded8e5] bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border-2 border-[#ded8e5] px-4 focus-within:border-[#8c23df] lg:max-w-[430px]">
            <Glyph className="h-5 w-5 text-[#8c8590]" name="search" />
            <span className="sr-only">Search events</span>
            <input
              className="font-outfit-regular min-w-0 flex-1 outline-none placeholder:text-[#9a929f]"
              onChange={(inputEvent) => setQuery(inputEvent.target.value)}
              placeholder="Search title, category, or place"
              type="search"
              value={query}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {statuses.map((filterStatus) => (
              <button
                aria-pressed={status === filterStatus}
                className={`font-outfit-semibold h-10 shrink-0 rounded-full border-2 px-4 text-sm ${
                  status === filterStatus
                    ? "border-[#18151d] bg-[#ffd8ef]"
                    : "border-[#ded8e5] bg-white text-[#686171]"
                }`}
                key={filterStatus}
                onClick={() => setStatus(filterStatus)}
                type="button"
              >
                {filterStatus}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-outfit-extrabold text-2xl">
            {role === "attending" ? "Events you joined" : "Events you organize"}
          </h2>
          <span className="font-outfit-semibold text-sm text-[#756c7b]">
            {visibleEvents.length}{" "}
            {visibleEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        {visibleEvents.length ? (
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {visibleEvents.map((event) => (
              <EventCard
                event={event}
                key={event.id}
                onDetails={(selected, trigger) => {
                  detailTrigger.current = trigger
                  setDetailEvent(selected)
                }}
                onManage={onManage}
                onProof={onProof}
                onTasks={onTasks}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#b8a9c2] bg-white px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eee1ff] text-[#8c23df]">
              <Glyph className="h-8 w-8" name="calendar" />
            </span>
            <h3 className="font-outfit-extrabold mt-4 text-2xl">
              {roleEvents.length ? "No matching events" : "Nothing here yet"}
            </h3>
            <p className="font-outfit-regular mt-2 max-w-[400px] text-[#6d6572]">
              {roleEvents.length
                ? "Try a different search or clear your status filter."
                : role === "attending"
                  ? "Explore volunteer tasks to find your next opportunity."
                  : "Create an event and bring your community together."}
            </p>
            <button
              className="font-outfit-bold mt-5 h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-5"
              onClick={
                roleEvents.length
                  ? clearFilters
                  : role === "attending"
                    ? () => onNavigate("tasks")
                    : onCreate
              }
              type="button"
            >
              {roleEvents.length
                ? "Clear filters"
                : role === "attending"
                  ? "Explore tasks"
                  : "Create event"}
            </button>
          </div>
        )}
      </section>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto grid h-[88px] max-w-[760px] grid-cols-5 rounded-t-[32px] border-x-2 border-t-2 border-[#e3dce8] bg-white px-2 shadow-[0_-8px_30px_rgba(84,36,119,0.10)]"
      >
        {[
          { label: "Home", icon: "home" as const, screen: "home" as const },
          { label: "Tasks", icon: "tasks" as const, screen: "tasks" as const },
          {
            label: "My Events",
            icon: "calendar" as const,
            screen: "my-events" as const,
          },
          {
            label: "Memories",
            icon: "image" as const,
            screen: "memories" as const,
          },
          {
            label: "Profile",
            icon: "profile" as const,
            screen: "profile" as const,
          },
        ].map((item) => (
          <button
            className={`bottom-nav-item ${
              item.label === "My Events" ? "active" : ""
            }`}
            key={item.label}
            onClick={() => item.screen && onNavigate(item.screen)}
            type="button"
          >
            <NavigationIcon className="h-6 w-6" name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <DetailDialog event={detailEvent} onClose={closeDetails} />
    </main>
  )
}
