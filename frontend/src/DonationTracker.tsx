import { useEffect, useState } from "react"
import { ApiDonationStage, ApiDonationTicket, donationsApi } from "./api"

const asset = (name: string) => `/assets/donation-tracker/${name}`

function Brand() {
  return (
    <div className="flex items-center" aria-label="SevaSathi">
      <span className="font-['Inter:Black'] text-[22px] font-black tracking-[-1.2px]">
        Seva<span className="text-[#9800f8]">Sathi</span>
      </span>
      <img alt="" className="h-[22px] w-[18px]" src={asset("6af05.svg")} />
    </div>
  )
}

function HeroArtwork() {
  return (
    <div className="donation-hero-art" aria-hidden="true">
      <img className="art-backdrop" src={asset("8c72a.svg")} />
      <img className="art-heart" src={asset("1ca31.svg")} />
      <img className="art-rays" src={asset("b71b6.svg")} />
      <img className="art-left-sprig" src={asset("2eaca.svg")} />
      <img className="art-right-sprig" src={asset("b4396.svg")} />
      <img className="art-box-back" src={asset("4a8b2.svg")} />
      <img className="art-shirt" src={asset("39552.svg")} />
      <img className="art-white-bottle" src={asset("b9e3f.svg")} />
      <img className="art-purple-bottle" src={asset("4bff2.svg")} />
      <img className="art-clothes" src={asset("ed920.svg")} />
      <img className="art-box-body" src={asset("e1b48.svg")} />
      <img className="art-box-flap" src={asset("77008.svg")} />
      <img className="art-box-heart" src={asset("bab07.svg")} />
    </div>
  )
}

function DecorativeGarden() {
  return (
    <div className="donation-garden" aria-hidden="true">
      <img className="absolute inset-0 h-full w-full" src={asset("cea03.svg")} />
      <img className="garden-left-upright" src={asset("22810.svg")} />
      <img className="garden-left-outward" src={asset("d469d.svg")} />
      <img className="garden-left-sweeping" src={asset("bf6a7.svg")} />
      <img className="garden-right-upright" src={asset("c5579.svg")} />
      <img className="garden-right-outward" src={asset("fa39e.svg")} />
      <img className="garden-right-sweeping" src={asset("a6790.svg")} />
    </div>
  )
}

export default function DonationTracker({
  onBack,
  ticket: initialTicket,
}: {
  onBack: () => void
  ticket?: ApiDonationTicket | null
}) {
  const [currentTicket, setCurrentTicket] = useState<ApiDonationTicket | null>(
    initialTicket || null
  )
  const [userTickets, setUserTickets] = useState<ApiDonationTicket[]>([])
  const [selectedProof, setSelectedProof] = useState<ApiDonationStage | null>(null)
  const [isLoading, setIsLoading] = useState(!initialTicket)
  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    let active = true

    if (initialTicket?.ticketId) {
      setCurrentTicket(initialTicket)
      setIsLoading(false)
      donationsApi
        .getTicket(initialTicket.ticketId)
        .then(({ ticket }) => {
          if (active && ticket) setCurrentTicket(ticket)
        })
        .catch(() => undefined)
    } else {
      setIsLoading(true)
      setLoadError("")

      donationsApi
        .listMine()
        .then(({ tickets }) => {
          if (!active) return
          if (tickets && tickets.length > 0) {
            setUserTickets(tickets)
            setCurrentTicket(tickets[0])
            setIsLoading(false)
          } else {
            donationsApi
              .getLatest()
              .then(({ ticket }) => {
                if (active && ticket) {
                  setCurrentTicket(ticket)
                  setIsLoading(false)
                }
              })
              .catch((err: unknown) => {
                if (!active) return
                setCurrentTicket(null)
                setLoadError(
                  err instanceof Error ? err.message : "No active donation tickets found."
                )
                setIsLoading(false)
              })
          }
        })
        .catch(() => {
          if (!active) return
          donationsApi
            .getLatest()
            .then(({ ticket }) => {
              if (active && ticket) {
                setCurrentTicket(ticket)
                setIsLoading(false)
              }
            })
            .catch((err: unknown) => {
              if (!active) return
              setCurrentTicket(null)
              setLoadError(
                err instanceof Error ? err.message : "No active donation tickets found."
              )
              setIsLoading(false)
            })
        })
    }

    return () => {
      active = false
    }
  }, [initialTicket])

  // Live auto-refresh from backend API every 6 seconds
  useEffect(() => {
    if (!currentTicket?.ticketId) return
    const refresh = () => {
      donationsApi
        .getTicket(currentTicket.ticketId)
        .then(({ ticket }) => {
          if (ticket) setCurrentTicket(ticket)
        })
        .catch(() => undefined)
    }
    const interval = window.setInterval(refresh, 6000)
    return () => window.clearInterval(interval)
  }, [currentTicket?.ticketId])

  const stages = currentTicket?.stages || []
  const activeStageIndex = stages.findIndex((s) => !s.completed)
  const currentActiveIdx =
    activeStageIndex === -1 ? stages.length - 1 : Math.max(0, activeStageIndex - 1)

  if (isLoading || loadError || !currentTicket) {
    return (
      <main className="donation-tracker flex min-h-dvh items-center justify-center bg-[#fffbff] p-5 text-black">
        <section className="w-full max-w-md rounded-2xl border-2 border-[#18151d] bg-white p-6 text-center shadow-[3px_3px_0_#18151d]">
          <h1 className="font-outfit-extrabold text-xl">
            {isLoading ? "Loading donation tracker..." : "No donation tracking data"}
          </h1>
          <p className="mt-2 text-sm text-[#665e70]">
            {loadError || "Create a donation ticket to view its live progress and proof."}
          </p>
          <button
            className="mt-5 rounded-xl border-2 border-[#18151d] bg-[#18151d] px-4 py-2 text-sm font-bold text-white"
            onClick={onBack}
            type="button"
          >
            Go back
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="donation-tracker min-h-dvh bg-[#fffbff] text-black pb-16">
      <header className="mx-auto flex h-[54px] w-full max-w-[760px] items-center justify-between px-[22px]">
        <button
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-start text-[#18151d]"
          onClick={onBack}
          type="button"
        >
          <img alt="" className="h-6 w-6" src={asset("6c9ad.svg")} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Brand />
        </div>
        <div className="flex items-center gap-[15px]">
          <span className="flex h-2 w-2 rounded-full bg-[#208a46] animate-pulse" />
          <button aria-label="Notifications" className="relative" type="button">
            <img alt="" className="h-7 w-[21px]" src={asset("fb050.svg")} />
          </button>
          <button aria-label="Open profile" type="button">
            <img
              alt="Aarav Sharma"
              className="h-[33px] w-[33px]"
              src={asset("52dd4.png")}
            />
          </button>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative mx-auto h-[171px] w-full max-w-[760px] overflow-hidden px-[22px] pt-1">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border-[0.7px] border-[#9800f8] bg-[#f5e8fc] px-[11px] py-1.5">
            <img alt="" className="h-[19px] w-[19px]" src={asset("9d200.svg")} />
            <span className="font-['Inter:Bold'] text-xs font-bold">
              {currentTicket.category ? `Live ${currentTicket.category} Tracker` : "Live Donation Tracker"}
            </span>
          </div>
          <h1 className="mt-[10px] font-['Inter:Black'] text-[24px] font-black leading-[1.03] tracking-[-0.9px]">
            Track Your
            <br />
            {currentTicket.unitName || "Donation"} Ticket
            <br />
            with{" "}
            <span className="inline-block rounded-[11px] border-[0.7px] border-[#74852a] bg-[#beff21] px-[5px] leading-[1.15]">
              Live GPS Proof.
            </span>
          </h1>
          <p className="mt-2 w-[225px] font-['Inter:Regular'] text-[10.5px] leading-[1.32] text-[#33333f]">
            Verified delivery for {currentTicket.beneficiaryGroup || currentTicket.location}.
          </p>
        </div>
        <HeroArtwork />
      </section>

      {userTickets.length > 1 && (
        <div className="mx-auto flex max-w-[760px] items-center gap-2 overflow-x-auto px-5 pb-2 no-scrollbar">
          <span className="shrink-0 text-xs font-outfit-bold text-[#6f19d6]">Your Tickets:</span>
          {userTickets.map((t) => (
            <button
              key={t.ticketId}
              type="button"
              onClick={() => setCurrentTicket(t)}
              className={`shrink-0 rounded-xl px-3 py-1 text-xs font-outfit-bold border-2 transition ${
                currentTicket?.ticketId === t.ticketId
                  ? "border-[#18151d] bg-[#d8f23c] text-[#18151d] shadow-[1.5px_1.5px_0_#18151d]"
                  : "border-[#e3d6ec] bg-white text-[#5b4d66] hover:bg-[#faf6ff]"
              }`}
            >
              #{t.ticketId} • {t.cause.slice(0, 16)}...
            </button>
          ))}
        </div>
      )}

      {/* Ticket Details & Live Stages */}
      <section className="mx-auto flex w-full max-w-[760px] flex-col gap-[13px] px-[13px] pb-1">
        {/* Ticket Header Card */}
        <article className="flex h-[82px] items-center gap-[10px] rounded-2xl border-[1.5px] border-[#18151d] bg-[#fffbff] p-[10px] shadow-[3px_3px_0_#18151d]">
          <div className="relative flex h-[62px] w-[95px] shrink-0 items-end overflow-hidden rounded-[12px] border border-[#18151d]">
            {stages[currentActiveIdx]?.photoUrl ? (
            <img
              alt="Latest host update"
              className="absolute inset-0 h-full w-full object-cover"
              src={stages[currentActiveIdx].photoUrl}
            />
            ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f7f2fb] px-2 text-center text-[10px] text-[#6c6570]">
              Waiting for host update
            </div>
            )}
            <span className="relative flex h-[19px] w-full items-center justify-center bg-[#18151d] font-outfit-bold text-[9px] text-[#d8f23c] px-1 text-center truncate">
              {currentTicket.category === "Nutrition" || currentTicket.unitName?.toLowerCase().includes("meal") ? "🍲" : currentTicket.category === "Clothes" ? "👕" : currentTicket.category === "Education" ? "📚" : "✨"} {currentTicket.unitCount || currentTicket.mealCount} {currentTicket.unitName ? (currentTicket.unitName + ((currentTicket.unitCount || currentTicket.mealCount) > 1 && !currentTicket.unitName.endsWith("s") ? "s" : "")) : "Units"}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-extrabold text-[#7e1bd9]">
                #{currentTicket.ticketId}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#18151d]" />
              <span className="text-[10px] font-outfit-semibold text-[#665e70]">
                ₹{currentTicket.amount}
              </span>
            </div>
            <h2 className="font-outfit-extrabold truncate text-[14px] text-[#18151d]">
              {currentTicket.cause}
            </h2>
            <p className="font-outfit-semibold truncate text-[10.5px] text-[#6d6275]">
              📍 {currentTicket.location}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex items-center gap-1 rounded-full bg-[#d8f23c] px-2 py-1 border border-[#18151d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#208a46] animate-pulse" />
              <span className="font-outfit-bold text-[9px] uppercase text-[#18151d]">
                {currentTicket.status === "distributed"
                  ? "Delivered ✓"
                  : currentTicket.status}
              </span>
            </div>
          </div>
        </article>

        {/* Live Journey Timeline */}
        <div className="flex items-center justify-between px-2 pt-1">
          <h2 className="font-outfit-black text-[17px] text-[#18151d]">
            Live Utilization Journey
          </h2>
          <span className="font-outfit-semibold text-xs text-[#7e1bd9]">
            Tap any step for photo proof
          </span>
        </div>

        <div className="relative flex flex-col gap-[9px] pl-8 pr-[3px]">
          {/* Vertical connecting line */}
          <div className="absolute bottom-[35px] left-5 top-4 w-[3px] rounded-full bg-[#9800f8]" />

          {stages.map((step, idx) => {
            const isCompleted = step.completed
            const isLatest = idx === currentActiveIdx

            return (
              <article
                className={`relative cursor-pointer transition ${
                  isLatest ? "scale-[1.01]" : ""
                }`}
                key={step.title}
                onClick={() => setSelectedProof(step)}
              >
                <div
                  className={`flex items-center gap-[10px] overflow-hidden rounded-2xl border-2 p-[8px] transition ${
                    isCompleted
                      ? "border-[#18151d] bg-[#ffffff] shadow-[2px_2px_0_#18151d]"
                      : "border-[#e0d6eb] bg-[#f9f5fc] opacity-70"
                  }`}
                >
                  <div className="min-w-0 flex-1 pl-2">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-outfit-extrabold text-[13px] leading-tight text-[#18151d]">
                        {step.title}
                      </h3>
                      {step.geoTag?.verified && (
                        <span className="rounded-md bg-[#efffdc] px-1 py-0.5 font-outfit-bold text-[9px] text-[#208a46]">
                          GPS ✓
                        </span>
                      )}
                    </div>

                    <p className="font-outfit-regular mt-1 text-[11px] leading-snug text-[#4a4252]">
                      {step.description}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2 font-outfit-semibold text-[10px] text-[#786b82]">
                      <span>🕒 {new Date(step.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <span>•</span>
                      <span>👤 {step.volunteer.name}</span>
                    </div>
                  </div>

                  {/* Photo Proof Thumbnail with Zoom cue */}
                  <div className="group relative h-[66px] w-[96px] shrink-0 overflow-hidden rounded-xl border border-[#18151d]">
                    <img
                      alt={step.title}
                      className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                      src={step.photoUrl}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                      <span className="font-outfit-bold text-[9px] text-white">
                        View Proof ↗
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="absolute bottom-1 right-1 rounded-full bg-[#d8f23c] px-1.5 py-0.5 font-outfit-bold text-[8px] text-[#18151d] shadow-xs">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Marker icon on vertical line */}
                <span
                  className={`absolute -left-[23px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#18151d] ${
                    isCompleted
                      ? "bg-[#beff21] text-[#18151d]"
                      : "bg-[#e8def5] text-[#9385a4]"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </span>
              </article>
            )
          })}
        </div>

        {stages.length === 0 && (
          <p className="px-3 pt-3 text-center text-xs text-[#6c6570]">
            Your ticket is recorded. The tracker will update automatically when the host publishes live progress.
          </p>
        )}

      </section>

      {/* Live Geotagged Photo Proof Modal */}
      {selectedProof && (
        <div
          aria-labelledby="proof-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border-2 border-[#18151d] bg-white shadow-[0_20px_50px_rgba(24,21,29,0.4)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#18151d] bg-[#faf6ff] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d8f23c] border border-[#18151d] text-sm">
                  📍
                </span>
                <div>
                  <h3
                    className="font-outfit-extrabold text-sm text-[#18151d]"
                    id="proof-modal-title"
                  >
                    Live Geotagged Photo Proof
                  </h3>
                  <div className="font-outfit-semibold text-[11px] text-[#7119d6]">
                    Tamper-Proof GPS Verified
                  </div>
                </div>
              </div>

              <button
                aria-label="Close proof preview"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#18151d] bg-white text-sm font-bold text-[#18151d] hover:bg-[#f2e7fe]"
                onClick={() => setSelectedProof(null)}
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Photo with GPS Watermark overlay */}
            <div className="relative h-64 w-full bg-black">
              <img
                alt={selectedProof.title}
                className="h-full w-full object-cover"
                src={selectedProof.photoUrl}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#beff21] px-2 py-0.5 font-outfit-black text-[10px] text-[#18151d]">
                    LIVE DISPATCH PROOF
                  </span>
                  <span className="font-mono text-[10px] text-white/90">
                    {selectedProof.geoTag?.coordinates}
                  </span>
                </div>
                <div className="font-outfit-bold mt-1 text-sm">
                  {selectedProof.geoTag?.location}
                </div>
              </div>
            </div>

            {/* Proof Metadata Card */}
            <div className="p-5">
              <div className="rounded-2xl border-2 border-[#18151d] bg-[#fbf8ff] p-3 text-xs">
                <div className="font-outfit-bold text-[13px] text-[#18151d]">
                  {selectedProof.title}
                </div>
                <p className="font-outfit-regular mt-1 text-[#584f60]">
                  {selectedProof.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#e2d5ec] pt-2 font-outfit-semibold text-[11px]">
                  <div>
                    <span className="text-[#897d92]">Field Volunteer:</span>
                    <div className="font-outfit-bold text-[#18151d]">
                      {selectedProof.volunteer?.name} ({selectedProof.volunteer?.role})
                    </div>
                  </div>
                  <div>
                    <span className="text-[#897d92]">Recorded Time:</span>
                    <div className="font-outfit-bold text-[#18151d]">
                      {new Date(selectedProof.timestamp).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="font-outfit-extrabold mt-4 flex w-full items-center justify-center rounded-xl border-2 border-[#18151d] bg-[#d8f23c] py-3 text-sm text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                onClick={() => setSelectedProof(null)}
                type="button"
              >
                Close Proof
              </button>
            </div>
          </div>
        </div>
      )}

      <DecorativeGarden />
    </main>
  )
}
