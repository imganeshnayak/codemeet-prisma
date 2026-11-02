import { useEffect, useRef, useState } from "react"
import { EventRole, EventStatus, formatEventDate, SevaEvent } from "./events"
import { ApiApprovedProof, ApiArticle, ApiDonationCampaign, articlesApi, donationsApi, rewardsApi } from "./api"
import NavigationIcon from "./NavigationIcon"

const categoryBadges: Record<
  string,
  { icon: string; bg: string; text: string; border: string }
> = {
  Clothes: { icon: "👕", bg: "bg-[#e8f1ff]", text: "text-[#1d57b8]", border: "border-[#1d57b8]" },
  Education: { icon: "📚", bg: "bg-[#fef3c7]", text: "text-[#b45309]", border: "border-[#b45309]" },
  Food: { icon: "🍲", bg: "bg-[#efffdc]", text: "text-[#22833e]", border: "border-[#22833e]" },
  Medical: { icon: "🩺", bg: "bg-[#ffe4e6]", text: "text-[#be123c]", border: "border-[#be123c]" },
  "Animal Care": { icon: "🐾", bg: "bg-[#f5e8fc]", text: "text-[#7e1bd9]", border: "border-[#7e1bd9]" },
  Hygiene: { icon: "💧", bg: "bg-[#e0f2fe]", text: "text-[#0369a1]", border: "border-[#0369a1]" },
  "Emergency Relief": { icon: "🚨", bg: "bg-[#fee2e2]", text: "text-[#b91c1c]", border: "border-[#b91c1c]" },
}

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

        <div className="mt-4">
          {event.role === "attending" ? (
            event.status === "Ongoing" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-white text-sm hover:bg-[#faf6ff] transition"
                  onClick={(clickEvent) =>
                    onDetails(event, clickEvent.currentTarget)
                  }
                  type="button"
                >
                  View details
                </button>
                <button
                  className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-sm shadow-[2px_2px_0_#18151d] hover:bg-[#cbf018] transition"
                  onClick={onProof}
                  type="button"
                >
                  Upload proof
                </button>
              </div>
            ) : (
              <button
                className="font-outfit-bold h-11 w-full rounded-xl border-2 border-[#18151d] bg-white text-sm shadow-[2px_2px_0_#18151d] hover:bg-[#faf6ff] transition"
                onClick={(clickEvent) =>
                  onDetails(event, clickEvent.currentTarget)
                }
                type="button"
              >
                View details
              </button>
            )
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-sm shadow-[2px_2px_0_#18151d]"
                onClick={() => onManage(event)}
                type="button"
              >
                Volunteers
              </button>
              <button
                className="font-outfit-bold h-11 rounded-xl bg-[#8c23df] text-sm text-white hover:bg-[#7b1dc5] transition"
                onClick={() => onTasks(event)}
                type="button"
              >
                Assign tasks
              </button>
            </div>
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
  onManageCampaign,
  onNavigate,
  onProof,
  onTasks,
  profile,
}: {
  events: SevaEvent[]
  onCreate: () => void
  onManage: (event: SevaEvent) => void
  onManageCampaign?: (campaign: ApiDonationCampaign) => void
  onNavigate: (destination: Destination) => void
  onProof: () => void
  onTasks: (event: SevaEvent) => void
  profile?: { id?: string; name?: string }
}) {
  const [role, setRole] = useState<EventRole>("attending")
  const [detailEvent, setDetailEvent] = useState<SevaEvent | null>(null)
  const detailTrigger = useRef<HTMLButtonElement | null>(null)
  const [articles, setArticles] = useState<ApiArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<ApiArticle | null>(null)
  const [articleProofs, setArticleProofs] = useState<ApiApprovedProof[]>([])
  const [campaigns, setCampaigns] = useState<ApiDonationCampaign[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)

  const roleEvents = events.filter((event) => event.role === role)
  const visibleEvents = roleEvents

  const userCampaigns = campaigns.filter((c) => {
    if (!profile?.id && !profile?.name) return false
    const matchName =
      Boolean(profile.name) &&
      c.organizer?.trim().toLowerCase() === profile.name?.trim().toLowerCase()
    const matchId = profile.id && c.organizerId === profile.id
    return matchName || matchId
  })
  const visibleCampaigns = userCampaigns

  useEffect(() => {
    if (role !== "organizing") return
    articlesApi.listMine().then(({ articles: next }) => setArticles(next)).catch(() => setArticles([]))
    setLoadingCampaigns(true)
    donationsApi.listCampaigns()
      .then(({ campaigns: next }) => setCampaigns(next))
      .catch(() => setCampaigns([]))
      .finally(() => setLoadingCampaigns(false))
  }, [role, profile?.id, profile?.name])

  useEffect(() => {
    if (!selectedArticle) {
      setArticleProofs([])
      return
    }
    rewardsApi.listApprovedProofs(
      selectedArticle.relatedEvent?.title || selectedArticle.title,
      undefined,
      selectedArticle.id,
    )
      .then(({ proofs }) => setArticleProofs(proofs))
      .catch(() => setArticleProofs([]))
  }, [selectedArticle])

  function closeDetails() {
    setDetailEvent(null)
    window.setTimeout(() => detailTrigger.current?.focus(), 0)
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
            aria-label="Create event"
            className="font-outfit-bold flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#d8f23c] text-xl leading-none shadow-[3px_4px_0_#18151d] transition hover:-translate-y-0.5"
            onClick={onCreate}
            type="button"
          >
            +
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div
          aria-label="Event role"
          className="mt-8 grid max-w-[560px] grid-cols-2 gap-2 rounded-[18px] border-2 border-[#18151d] bg-white p-2"
          role="tablist"
        >
          {(["attending", "organizing"] as EventRole[]).map((tabRole) => {
            const active = role === tabRole
            const eventCount = events.filter(
              (event) => event.role === tabRole,
            ).length
            const count = tabRole === "organizing" ? eventCount + visibleCampaigns.length : eventCount
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

        {/* --- ORGANIZING: DONATION CAMPAIGNS SECTION --- */}
        {role === "organizing" && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-outfit-extrabold text-2xl text-[#18151d]">
                  Donation Campaigns
                </h2>
                <p className="font-outfit-regular text-xs text-[#756c7b]">
                  Initiatives you host with live transparent stage tracking
                </p>
              </div>
              <span className="font-outfit-semibold text-sm text-[#756c7b]">
                {visibleCampaigns.length}{" "}
                {visibleCampaigns.length === 1 ? "campaign" : "campaigns"}
              </span>
            </div>

            {loadingCampaigns ? (
              <div className="mt-4 rounded-2xl border-2 border-dashed border-[#b8a9c2] bg-white p-6 text-center text-sm text-[#756c7b]">
                Loading campaigns...
              </div>
            ) : visibleCampaigns.length > 0 ? (
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {visibleCampaigns.map((campaign) => {
                  const badge = categoryBadges[campaign.category] || categoryBadges.Clothes
                  const percent = Math.min(
                    100,
                    Math.round(
                      ((campaign.raisedUnits || 0) /
                        (campaign.targetUnits || 1)) *
                        100,
                    ),
                  )
                  return (
                    <article
                      className="overflow-hidden rounded-[20px] border-2 border-[#18151d] bg-white shadow-[4px_5px_0_#18151d] transition hover:-translate-y-1"
                      key={campaign.id || campaign.campaignId}
                    >
                      <div className="relative h-44 w-full bg-[#eee6f4]">
                        <img
                          alt={campaign.title}
                          className="h-full w-full object-cover"
                          src={campaign.image || "/assets/6d276.png"}
                        />
                        <div className="absolute left-3 top-3 flex gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border ${badge.border} ${badge.bg} px-2.5 py-1 text-xs font-bold ${badge.text} shadow-xs`}
                          >
                            <span>{badge.icon}</span>
                            <span>{campaign.category}</span>
                          </span>
                        </div>
                        <div className="absolute right-3 top-3">
                          <span className="rounded-full border border-[#18151d] bg-white/95 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#8c23df] shadow-xs">
                            {campaign.currentStage || "Pledged"}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-[#756c7b]">
                          <span>📍 {campaign.location}</span>
                          <span className="font-outfit-bold text-[#8c23df]">
                            ID: {campaign.campaignId}
                          </span>
                        </div>

                        <h3 className="font-outfit-extrabold mt-1.5 text-xl leading-tight text-[#18151d]">
                          {campaign.title}
                        </h3>
                        <p className="font-outfit-regular mt-1 line-clamp-2 text-xs leading-relaxed text-[#6d6572]">
                          {campaign.description}
                        </p>

                        {/* Progress Stats */}
                        <div className="mt-4 rounded-xl border border-[#e6dcfa] bg-[#faf6ff] p-3">
                          <div className="flex justify-between text-xs font-bold text-[#18151d]">
                            <span>
                              {campaign.raisedUnits} / {campaign.targetUnits}{" "}
                              {campaign.donationItem}s
                            </span>
                            <span className="text-[#8c23df]">{percent}%</span>
                          </div>
                          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-[#18151d] bg-white">
                            <div
                              className="h-full bg-[#8c23df] transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="mt-2 flex justify-between text-[11px] text-[#756c7b]">
                            <span>
                              Raised: ₹{(campaign.raisedAmount || 0).toLocaleString()}
                            </span>
                            <span>
                              Target: ₹{(campaign.targetAmount || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="flex items-center text-xs font-semibold text-[#6d6572]">
                            <span>👥 {campaign.donors?.length || 0} Supporters</span>
                          </div>
                          <button
                            className="font-outfit-bold flex h-10 items-center justify-center rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-xs font-bold shadow-[2px_2px_0_#18151d] transition hover:bg-[#cbf018]"
                            onClick={() =>
                              onManageCampaign
                                ? onManageCampaign(campaign)
                                : onNavigate("my-events")
                            }
                            type="button"
                          >
                            Manage Campaign →
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#b8a9c2] bg-white p-6 text-center">
                <p className="font-outfit-regular text-sm text-[#756c7b]">
                  You have not created any donation campaigns yet.
                </p>
                <button
                  className="font-outfit-bold mt-3 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-4 py-2 text-xs shadow-[2px_2px_0_#18151d]"
                  onClick={onCreate}
                  type="button"
                >
                  Create Donation Campaign
                </button>
              </div>
            )}
          </section>
        )}

        {/* --- VOLUNTEER EVENTS SECTION --- */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="font-outfit-extrabold text-2xl text-[#18151d]">
              {role === "attending" ? "Events you joined" : "Volunteer Events"}
            </h2>
            {role === "organizing" && (
              <p className="font-outfit-regular text-xs text-[#756c7b]">
                Community drives and on-ground volunteer meetups
              </p>
            )}
          </div>
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
                onDetails={(selected) => onManage(selected)}
                onManage={onManage}
                onProof={onProof}
                onTasks={onTasks}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#b8a9c2] bg-white px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eee1ff] text-[#8c23df]">
              <Glyph className="h-7 w-7" name="calendar" />
            </span>
            <h3 className="font-outfit-extrabold mt-3 text-xl">
              {role === "attending" ? "No joined events" : "No volunteer events organized yet"}
            </h3>
            <p className="font-outfit-regular mt-1 max-w-[400px] text-xs text-[#6d6572]">
              {role === "attending"
                ? "Explore volunteer tasks to find your next opportunity."
                : "Create an event and bring your community together."}
            </p>
            <button
              className="font-outfit-bold mt-4 h-10 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-5 text-xs shadow-[2px_2px_0_#18151d]"
              onClick={
                role === "attending" ? () => onNavigate("tasks") : onCreate
              }
              type="button"
            >
              {role === "attending" ? "Explore tasks" : "Create event"}
            </button>
          </div>
        )}

        {role === "organizing" && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-outfit-extrabold text-2xl">Articles</h2>
              <span className="text-sm text-[#756c7b]">{articles.length} posted</span>
            </div>
            {articles.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-[#b8a9c2] bg-white p-5 text-sm text-[#756c7b]">
                Articles you post will appear here.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {articles.map((article) => (
                  <button
                    className="overflow-hidden rounded-2xl border-2 border-[#18151d] bg-white text-left shadow-[3px_4px_0_#18151d]"
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    type="button"
                  >
                    <img alt={article.alt} className="h-36 w-full object-cover" src={article.image} />
                    <div className="p-4">
                      <h3 className="font-outfit-extrabold text-lg">{article.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-[#6d6572]">{article.description}</p>
                      <p className="mt-3 text-xs font-bold text-[#7c1bd8]">Tap to view verification photos</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </section>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[#faf8ff] p-5 sm:rounded-3xl">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-outfit-extrabold text-xl">{selectedArticle.title}</h2>
              <button aria-label="Close article" className="rounded-full border px-3 py-1" onClick={() => setSelectedArticle(null)} type="button">×</button>
            </div>
            <img alt={selectedArticle.alt} className="mt-4 max-h-64 w-full rounded-2xl object-cover" src={selectedArticle.image} />
            <p className="mt-4 text-sm leading-relaxed text-[#595061]">{selectedArticle.description}</p>
            <h3 className="mt-6 font-outfit-extrabold">Verification photos ({articleProofs.length})</h3>
            {articleProofs.length === 0 ? (
              <p className="mt-2 text-sm text-[#756c7b]">No volunteer verification photos submitted yet.</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {articleProofs.map((proof) => (
                  <img alt={`Verification by ${proof.volunteerName || "volunteer"}`} className="aspect-square w-full rounded-xl object-cover" key={proof.id} src={proof.proof.imageUrl} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
