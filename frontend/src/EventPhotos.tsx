import { useCallback, useEffect, useState } from "react"
import { ApiApprovedProof, rewardsApi } from "./api"
import { SevaEvent } from "./events"
import GeoTagProof from "./GeoTagProof"

export default function EventPhotos({
  event,
  onBack,
}: {
  event: SevaEvent
  onBack: () => void
}) {
  const [proofs, setProofs] = useState<ApiApprovedProof[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCapture, setShowCapture] = useState(false)

  const loadProofs = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const response = await rewardsApi.listApprovedProofs(event.title, event.id)
      setProofs(response.proofs)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load event photos.")
    } finally {
      setLoading(false)
    }
  }, [event.title])

  useEffect(() => {
    void loadProofs()
  }, [loadProofs])

  return (
    <main className="min-h-dvh bg-[#fcf8ff] px-3 pb-8 text-[#09090b] sm:px-5">
      <header className="mx-auto flex h-14 w-full max-w-3xl items-center gap-3">
        <button
          aria-label="Back to event"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d5c9e1] bg-white text-lg"
          onClick={onBack}
          type="button"
        >
          ←
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-['Arimo:Bold'] text-xl font-bold">Event Photos</h1>
          <p className="truncate text-xs text-[#6e5d80]">{event.title}</p>
        </div>
        <button
          aria-label="Capture or upload event photo"
          className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-[#933bc4] text-2xl text-white shadow-[0_3px_0_#6f238f] transition active:translate-y-px active:shadow-none"
          onClick={() => setShowCapture(true)}
          title="Capture or upload photo"
          type="button"
        >
          +
        </button>
      </header>

      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-4 rounded-2xl border border-[#ead5f8] bg-white px-4 py-3">
          <p className="font-['Arimo:Bold'] text-base font-bold">Verified volunteer photos</p>
          <p className="mt-1 text-xs text-[#6e5d80]">Submitted photos appear here while they await organizer approval.</p>
        </div>

        {loading && <p className="rounded-2xl border border-[#d5c9e1] bg-white p-5 text-sm text-[#6e5d80]">Loading photos...</p>}
        {!loading && error && <p className="rounded-2xl border border-red-200 bg-white p-5 text-sm text-red-600" role="alert">{error}</p>}
        {!loading && !error && proofs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d5c9e1] bg-white p-8 text-center">
            <p className="text-3xl">📷</p>
            <p className="mt-2 font-['Arimo:Bold'] font-bold">No submitted photos yet</p>
            <p className="mt-1 text-sm text-[#6e5d80]">Be the first volunteer to upload field proof.</p>
          </div>
        )}
        {!loading && !error && proofs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {proofs.map((proof) => (
              <article className="overflow-hidden rounded-2xl border border-[#d5c9e1] bg-white" key={proof.id}>
                <img
                  alt={`Verified proof by ${proof.volunteerName || "volunteer"}`}
                  className="aspect-square w-full object-cover"
                  src={proof.proof.imageUrl}
                />
                <div className="p-2.5">
                  <p className="truncate text-xs font-bold">{proof.volunteerName || "Volunteer"}</p>
                  <p className="mt-1 truncate text-[11px] text-[#6e5d80]">{proof.status === "submitted" ? "Awaiting approval" : (proof.proof.location || "Location unavailable")}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showCapture && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-0 sm:p-4">
          <div className="mx-auto min-h-full w-full max-w-2xl overflow-hidden bg-[#fcf8ff] sm:min-h-0 sm:rounded-2xl">
            <GeoTagProof
              onBack={() => setShowCapture(false)}
              onSubmitted={() => {
                setShowCapture(false)
                void loadProofs()
              }}
              taskId={event.id}
            />
          </div>
        </div>
      )}
    </main>
  )
}
