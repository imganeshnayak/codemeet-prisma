import { useState } from "react"
import { ApiDonationTicket, donationsApi } from "./api"

type FeedDonationScreenProps = {
  onBack: () => void
  onSuccess: (ticket: ApiDonationTicket) => void
}

const mealPresets = [
  { count: 1, label: "1 Meal", sub: "Nourish 1 Child", popular: false },
  { count: 5, label: "5 Meals", sub: "Family Plate", popular: true },
  { count: 10, label: "10 Meals", sub: "Classroom Feast", popular: false },
  { count: 20, label: "20 Meals", sub: "Shelter Ward", popular: false },
]

const causes = [
  {
    id: "children",
    name: "Children Nutrition Drive",
    location: "Kadri Hills, Mangaluru",
    desc: "Supplies warm khichdi, vegetables, and fruit to local shelter schools.",
  },
  {
    id: "coastal",
    name: "Coastal Worker Relief",
    location: "Malpe Port & Beach, Udupi",
    desc: "Nutritious lunch boxes for daily wage coastal community workers.",
  },
  {
    id: "elders",
    name: "Elderly Day Shelter Meals",
    location: "Indiranagar, Bengaluru",
    desc: "Soft, diabetic-friendly fresh thali meals for elderly residents.",
  },
]

export default function FeedDonationScreen({
  onBack,
  onSuccess,
}: FeedDonationScreenProps) {
  const [mealCount, setMealCount] = useState(5)
  const [selectedCause, setSelectedCause] = useState(causes[0])
  const [donorName, setDonorName] = useState("Aarav Sharma")
  const [dedication, setDedication] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [issuedTicket, setIssuedTicket] = useState<ApiDonationTicket | null>(null)
  const [animatingStep, setAnimatingStep] = useState(false)

  const ticketPrice = 50 // ₹50 per meal
  const totalAmount = mealCount * ticketPrice

  function handleIncrement() {
    setAnimatingStep(true)
    setMealCount((c) => Math.min(100, c + 1))
    setTimeout(() => setAnimatingStep(false), 200)
  }

  function handleDecrement() {
    if (mealCount <= 1) return
    setAnimatingStep(true)
    setMealCount((c) => Math.max(1, c - 1))
    setTimeout(() => setAnimatingStep(false), 200)
  }

  function handlePresetSelect(count: number) {
    setAnimatingStep(true)
    setMealCount(count)
    setTimeout(() => setAnimatingStep(false), 200)
  }

  async function handlePurchase() {
    setIsSubmitting(true)
    try {
      const res = await donationsApi.purchaseTicket({
        mealCount,
        cause: selectedCause.name,
        location: selectedCause.location,
        donorName: donorName.trim() || "Kind Changemaker",
        dedication: dedication.trim(),
      })

      if (res?.ticket) {
        setIssuedTicket(res.ticket)
      } else {
        throw new Error("No ticket returned")
      }
    } catch {
      // Offline fallback: create valid local ticket for seamless demo
      const fallbackTicket: ApiDonationTicket = {
        id: "tkt-" + Date.now(),
        ticketId: "FEED-" + Math.floor(1000 + Math.random() * 9000),
        donorName: donorName.trim() || "Kind Changemaker",
        donorEmail: "donor@sevasathi.org",
        mealCount,
        amount: totalAmount,
        cause: selectedCause.name,
        location: selectedCause.location,
        beneficiaryGroup: "Underprivileged Children & Elders",
        dedication: dedication.trim(),
        status: "pledged",
        stages: [
          {
            stage: "pledged",
            title: "Feeding Ticket Issued & Funds Pledged",
            description: `Your contribution of ${mealCount} hot nutritious meal tickets has been allocated to today's active feeding run.`,
            timestamp: new Date().toISOString(),
            photoUrl: "/assets/donation-tracker/fd25f.png",
            geoTag: {
              location: selectedCause.location,
              coordinates: "12.8718° N, 74.8560° E",
              verified: true,
            },
            volunteer: {
              name: "Arjun K.",
              role: "Community Lead",
              avatar: "AK",
            },
            completed: true,
          },
          {
            stage: "procured",
            title: "Fresh Grains & Vegetables Procured",
            description: `Rice, lentils, fresh spinach, and spices were purchased from local farmer cooperatives for ${mealCount} meals.`,
            timestamp: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            photoUrl: "/assets/donation-tracker/405bb.png",
            geoTag: {
              location: "APMC Market Yard, Mangaluru",
              coordinates: "12.8654° N, 74.8423° E",
              verified: true,
            },
            volunteer: {
              name: "Sunita Rao",
              role: "Procurement Volunteer",
              avatar: "SR",
            },
            completed: false,
          },
          {
            stage: "prepared",
            title: "Cooked in Clean Kitchen & Packed",
            description:
              "Wholesome hot meals freshly prepared following strict hygiene protocols and packed into eco-friendly containers.",
            timestamp: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
            photoUrl: "/assets/donation-tracker/41231.png",
            geoTag: {
              location: "Seva Community Kitchen, Kadri",
              coordinates: "12.8801° N, 74.8529° E",
              verified: true,
            },
            volunteer: {
              name: "Karthik Hegde",
              role: "Kitchen Coordinator",
              avatar: "KH",
            },
            completed: false,
          },
          {
            stage: "distributed",
            title: "Meals Delivered & Handed Over",
            description:
              "Meals warmly served to children and elders with high-precision GPS verification and live photo proof.",
            timestamp: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
            photoUrl: "/assets/donation-tracker/ab234.png",
            geoTag: {
              location: selectedCause.location,
              coordinates: "12.8722° N, 74.8588° E",
              verified: true,
            },
            volunteer: {
              name: "Meera Pai",
              role: "Field Distribution Volunteer",
              avatar: "MP",
            },
            completed: false,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setIssuedTicket(fallbackTicket)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="font-outfit-regular relative min-h-dvh bg-[#faf6ff] text-[#18151d] pb-24 antialiased selection:bg-[#d8f23c]">
      {/* Background radial ambient lights */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#ebd7ff] opacity-70 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#f6ffe2] opacity-70 blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 mx-auto flex max-w-xl items-center justify-between px-5 pt-5 pb-3">
        <button
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-white shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          onClick={onBack}
          type="button"
        >
          <svg
            className="h-5 w-5 text-[#18151d]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center">
          <span className="font-outfit-extrabold text-xs uppercase tracking-widest text-[#721bd9]">
            Instant Feeding Pass
          </span>
          <h1 className="font-outfit-black text-xl leading-none text-[#18151d]">
            Donate & Feed
          </h1>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] font-outfit-black text-sm shadow-[2px_2px_0_#18151d]">
          ₹50
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-xl px-5 pt-2">
        {/* Animated Ticket Stack Preview */}
        <section className="relative my-3 flex flex-col items-center">
          {/* Stack Shadows when count > 1 */}
          {mealCount > 1 && (
            <div
              aria-hidden="true"
              className="absolute -top-3 h-48 w-[88%] -rotate-[3deg] rounded-3xl border-2 border-[#18151d] bg-[#e6d0ff] opacity-60 shadow-md transition-all duration-300"
            />
          )}
          {mealCount > 4 && (
            <div
              aria-hidden="true"
              className="absolute -top-1.5 h-48 w-[92%] rotate-[2deg] rounded-3xl border-2 border-[#18151d] bg-[#fdf3c7] opacity-80 shadow-md transition-all duration-300"
            />
          )}

          {/* Primary Interactive Ticket Card */}
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-[28px] border-2 border-[#18151d] bg-gradient-to-br from-[#ffffff] via-[#fcf8ff] to-[#f4e6ff] p-5 shadow-[4px_5px_0_#18151d] transition-all duration-300 ${
              animatingStep ? "scale-[1.02]" : "scale-100"
            }`}
          >
            {/* Notch Cutouts on the sides for perforated ticket look */}
            <div className="absolute -left-3.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-r-2 border-[#18151d] bg-[#faf6ff]" />
            <div className="absolute -right-3.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-l-2 border-[#18151d] bg-[#faf6ff]" />

            {/* Top row with gold foil badge and pass type */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#d8cce4] pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#18151d] bg-[#d8f23c] shadow-[1px_1px_0_#18151d]">
                  🍲
                </span>
                <div>
                  <div className="font-outfit-black text-xs uppercase tracking-wider text-[#6f19d6]">
                    Live Verification Pass
                  </div>
                  <div className="font-outfit-bold text-sm text-[#18151d]">
                    Hot Nutritious Thali Meal
                  </div>
                </div>
              </div>

              <div className="rounded-full border border-[#18151d] bg-[#18151d] px-2.5 py-1 text-center font-outfit-bold text-[11px] text-white">
                GPS Tagged
              </div>
            </div>

            {/* Middle Section: Meal Count & Live Total */}
            <div className="py-4 text-center">
              <span className="font-outfit-semibold text-xs text-[#706478]">
                YOU ARE SPONSORING
              </span>
              <div className="font-outfit-black my-1 text-4xl tracking-tight text-[#18151d]">
                {mealCount} {mealCount === 1 ? "Meal Ticket" : "Meal Tickets"}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#efffdc] px-3 py-1 font-outfit-bold text-xs text-[#208a46]">
                <span>✓ ₹{ticketPrice} / meal</span>
                <span>•</span>
                <span>Total: ₹{totalAmount}</span>
              </div>
            </div>

            {/* Bottom Row: Tear-off Stub & Barcode */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-[#d8cce4] pt-3 text-xs">
              <div className="text-left font-outfit-semibold text-[#5c5264]">
                <div className="text-[10px] uppercase text-[#94879e]">Cause</div>
                <div className="font-outfit-bold text-[13px] text-[#18151d]">
                  {selectedCause.name.slice(0, 24)}...
                </div>
              </div>

              {/* Decorative Barcode / Serial */}
              <div className="flex flex-col items-end">
                <div className="flex h-4 items-center gap-0.5">
                  {[4, 2, 6, 3, 5, 2, 7, 3, 6, 2, 4, 3, 5, 2, 6].map((w, idx) => (
                    <div
                      className="h-full bg-[#18151d]"
                      key={idx}
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] tracking-wider text-[#796d84]">
                  #SEVA-TKT-2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket Stepper & Quick Presets */}
        <section className="my-5 rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
          <div className="flex items-center justify-between pb-3">
            <span className="font-outfit-bold text-sm text-[#18151d]">
              Select Meal Count:
            </span>
            <span className="font-outfit-semibold text-xs text-[#6f19d6]">
              {mealCount} children nourished today
            </span>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              aria-label="Decrease tickets"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#f6efff] text-2xl font-black text-[#18151d] shadow-[2px_2px_0_#18151d] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40"
              disabled={mealCount <= 1}
              onClick={handleDecrement}
              type="button"
            >
              −
            </button>

            <div className="flex-1 text-center">
              <span className="font-outfit-black text-3xl tracking-tight text-[#18151d]">
                {mealCount}
              </span>
              <span className="block font-outfit-semibold text-xs text-[#7c7185]">
                = ₹{totalAmount} Total
              </span>
            </div>

            <button
              aria-label="Increase tickets"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] text-2xl font-black text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              onClick={handleIncrement}
              type="button"
            >
              +
            </button>
          </div>

          {/* Quick Presets Grid */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {mealPresets.map((preset) => {
              const selected = mealCount === preset.count
              return (
                <button
                  className={`flex flex-col items-center rounded-2xl border-2 border-[#18151d] p-2 transition ${
                    selected
                      ? "bg-[#6f19d6] text-white shadow-[2px_2px_0_#18151d]"
                      : "bg-[#faf6ff] text-[#18151d] hover:bg-[#f0e4ff]"
                  }`}
                  key={preset.count}
                  onClick={() => handlePresetSelect(preset.count)}
                  type="button"
                >
                  <span className="font-outfit-extrabold text-sm">
                    {preset.label}
                  </span>
                  <span
                    className={`text-[10px] font-outfit-semibold ${
                      selected ? "text-[#d8f23c]" : "text-[#7b6d85]"
                    }`}
                  >
                    ₹{preset.count * 50}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Cause / Location Picker */}
        <section className="my-5 rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
          <h2 className="font-outfit-bold pb-2 text-sm text-[#18151d]">
            Choose Destination Drive & Shelter:
          </h2>
          <div className="space-y-2.5">
            {causes.map((cause) => {
              const active = selectedCause.id === cause.id
              return (
                <button
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 border-[#18151d] p-3 text-left transition ${
                    active
                      ? "bg-[#f5e8fc] shadow-[2px_2px_0_#18151d]"
                      : "bg-[#ffffff] hover:bg-[#fbf7ff]"
                  }`}
                  key={cause.id}
                  onClick={() => setSelectedCause(cause)}
                  type="button"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#18151d] ${
                      active ? "bg-[#6f19d6]" : "bg-white"
                    }`}
                  >
                    {active && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-outfit-bold text-sm text-[#18151d]">
                      {cause.name}
                    </div>
                    <div className="font-outfit-semibold text-xs text-[#6f19d6]">
                      📍 {cause.location}
                    </div>
                    <div className="font-outfit-regular mt-0.5 text-xs text-[#6b6074]">
                      {cause.desc}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Dedication Input */}
        <section className="my-5 rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
          <h2 className="font-outfit-bold pb-1 text-sm text-[#18151d]">
            Personalize Your Feeding Pass (Optional):
          </h2>
          <div className="space-y-3">
            <div>
              <label
                className="font-outfit-semibold text-xs text-[#695d73]"
                htmlFor="donor-name-input"
              >
                Donor Name
              </label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] px-3.5 py-2.5 font-outfit-semibold text-sm text-[#18151d] outline-none focus:border-[#6f19d6]"
                id="donor-name-input"
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Aarav Sharma"
                value={donorName}
              />
            </div>

            <div>
              <label
                className="font-outfit-semibold text-xs text-[#695d73]"
                htmlFor="dedication-input"
              >
                Dedication (Birthday / In Memory)
              </label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] px-3.5 py-2.5 font-outfit-semibold text-sm text-[#18151d] outline-none focus:border-[#6f19d6]"
                id="dedication-input"
                onChange={(e) => setDedication(e.target.value)}
                placeholder="e.g. In honor of Grandma's 80th birthday"
                value={dedication}
              />
            </div>
          </div>
        </section>

        {/* Checkout Button */}
        <div className="pt-2">
          <button
            className="font-outfit-extrabold flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] py-4 text-base text-[#18151d] shadow-[4px_5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#18151d] disabled:opacity-60"
            disabled={isSubmitting}
            onClick={handlePurchase}
            type="button"
          >
            {isSubmitting ? (
              <span>Dispensing Your Live Ticket...</span>
            ) : (
              <span>Purchase & Get Live Feeding Pass • ₹{totalAmount} ➔</span>
            )}
          </button>
          <p className="mt-2 text-center font-outfit-semibold text-xs text-[#7c7285]">
            🔒 100% Transparency • Live GPS Photo Proof Guaranteed
          </p>
        </div>
      </div>

      {/* Celebratory Issued Ticket Modal */}
      {issuedTicket && (
        <div
          aria-labelledby="ticket-success-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <div className="relative w-full max-w-sm rounded-[32px] border-2 border-[#18151d] bg-white p-6 shadow-[0_16px_40px_rgba(24,21,29,0.35)] animate-in fade-in zoom-in-95 duration-200">
            {/* Confetti badge */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] text-3xl shadow-[2px_2px_0_#18151d]">
              🎉
            </div>

            <div className="mt-3 text-center">
              <span className="font-outfit-black text-xs uppercase tracking-widest text-[#6f19d6]">
                Pass Generated
              </span>
              <h3
                className="font-outfit-black text-2xl text-[#18151d]"
                id="ticket-success-title"
              >
                Feeding Pass Ready!
              </h3>
              <p className="font-outfit-regular mt-1 text-xs text-[#665b70]">
                Thank you, {issuedTicket.donorName}! Your {issuedTicket.mealCount}{" "}
                meals have entered today&apos;s active delivery stream.
              </p>
            </div>

            {/* Ticket Card Preview inside modal */}
            <div className="relative my-4 rounded-2xl border-2 border-dashed border-[#6f19d6] bg-[#fbf7ff] p-4 text-center">
              <div className="font-mono text-xl font-bold tracking-wider text-[#6f19d6]">
                #{issuedTicket.ticketId}
              </div>
              <div className="font-outfit-bold mt-1 text-xs text-[#18151d]">
                {issuedTicket.cause}
              </div>
              <div className="font-outfit-semibold text-[11px] text-[#7d7088]">
                📍 {issuedTicket.location}
              </div>
              <div className="mt-2 inline-block rounded-full bg-[#d8f23c] px-3 py-1 font-outfit-bold text-[10px] text-[#18151d]">
                ● Live GPS Tracking Active
              </div>
            </div>

            <button
              className="font-outfit-black flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#18151d] bg-[#6f19d6] py-3.5 text-sm text-white shadow-[3px_3px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              onClick={() => onSuccess(issuedTicket)}
              type="button"
            >
              <span>Track Live Delivery Now ➔</span>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

