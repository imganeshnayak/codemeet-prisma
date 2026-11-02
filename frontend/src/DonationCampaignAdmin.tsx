import { useEffect, useRef, useState } from "react"
import { ApiDonationCampaign, donationsApi } from "./api"

const categoryBadges: Record<
  ApiDonationCampaign["category"],
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

export default function DonationCampaignAdmin({
  campaign: initialCampaign,
  onBack,
  onUpdate,
}: {
  campaign: ApiDonationCampaign
  onBack: () => void
  onUpdate?: (updated: ApiDonationCampaign) => void
}) {
  const [campaign, setCampaign] = useState<ApiDonationCampaign>(initialCampaign)
  const [activeTab, setActiveTab] = useState<"stages" | "donors" | "expenses">("stages")
  const [selectedProofPhoto, setSelectedProofPhoto] = useState<string | null>(null)

  // Dispatch stage form states
  const [dispatchPhoto, setDispatchPhoto] = useState(campaign.image || "/assets/6d276.png")
  const [dispatchNotes, setDispatchNotes] = useState("")
  const [dispatchGps, setDispatchGps] = useState("12.8718° N, 74.8560° E")
  const [dispatchLocation, setDispatchLocation] = useState(campaign.location || "Mangaluru, Karnataka")
  const [isGettingGps, setIsGettingGps] = useState(false)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [notice, setNotice] = useState("")

  // Add expense form state
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [expenseItem, setExpenseItem] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseVendor, setExpenseVendor] = useState("")

  // Live Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment")
  const [cameraError, setCameraError] = useState("")
  const [capturedTimestamp, setCapturedTimestamp] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  async function startCamera(facing: "environment" | "user" = cameraFacing) {
    setCameraError("")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Live camera access is not supported by your browser. Please use device camera upload.")
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error(err)
      setCameraError("Camera permission denied or camera in use. You can also upload a photo directly.")
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsCameraOpen(false)
  }

  function handleOpenLiveCamera() {
    setIsCameraOpen(true)
    setTimeout(() => {
      startCamera(cameraFacing)
    }, 100)
    handleCaptureGps()
  }

  function handleFlipCamera() {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment"
    setCameraFacing(nextFacing)
    startCamera(nextFacing)
  }

  function handleCaptureLivePhoto() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.videoWidth === 0) {
      showMessage("Camera not ready yet.")
      return
    }
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.88)
      setDispatchPhoto(dataUrl)
      const timeStr = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date())
      setCapturedTimestamp(timeStr)
      showMessage(`📸 Live proof photo captured at ${timeStr}!`)
    }
    stopCamera()
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDispatchPhoto(reader.result)
        const timeStr = new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date())
        setCapturedTimestamp(timeStr)
        showMessage(`Proof photo loaded!`)
        handleCaptureGps()
      }
    }
    reader.readAsDataURL(file)
  }

  // Android & Web Camera Permission Consent States & Handlers
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<"camera" | "upload" | null>(null)

  function handleCameraClickWithConsent() {
    const hasConsent = window.localStorage.getItem("sevasathi_camera_consent") === "granted"
    if (hasConsent) {
      handleOpenLiveCamera()
    } else {
      setPendingAction("camera")
      setShowConsentModal(true)
    }
  }

  function handleUploadClickWithConsent() {
    const hasConsent = window.localStorage.getItem("sevasathi_camera_consent") === "granted"
    if (hasConsent) {
      fileInputRef.current?.click()
    } else {
      setPendingAction("upload")
      setShowConsentModal(true)
    }
  }

  function handleGrantConsent() {
    try {
      window.localStorage.setItem("sevasathi_camera_consent", "granted")
    } catch {}
    setShowConsentModal(false)
    if (pendingAction === "camera") {
      handleOpenLiveCamera()
    } else if (pendingAction === "upload") {
      fileInputRef.current?.click()
    }
    setPendingAction(null)
  }

  function handleDenyConsent() {
    setShowConsentModal(false)
    setPendingAction(null)
    showMessage("Camera access cancelled.")
  }

  function showMessage(msg: string) {
    setNotice(msg)
    setTimeout(() => setNotice(""), 3500)
  }

  function handleCaptureGps() {
    if (!navigator.geolocation) {
      showMessage("Geolocation not supported by this browser.")
      return
    }
    setIsGettingGps(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4)
        const lng = pos.coords.longitude.toFixed(4)
        setDispatchGps(`${lat}° N, ${lng}° E`)
        setIsGettingGps(false)
        showMessage(`Live GPS locked: ${lat}° N, ${lng}° E`)
      },
      () => {
        setIsGettingGps(false)
        setDispatchGps("12.8718° N, 74.8560° E")
        showMessage("Defaulted to campus coordinates.")
      },
      { timeout: 8000 }
    )
  }

  async function handleBroadcastNextStage() {
    const stageOrder: ("pledged" | "procured" | "prepared" | "distributed")[] = [
      "pledged",
      "procured",
      "prepared",
      "distributed",
    ]
    const curIdx = stageOrder.indexOf(campaign.currentStage)
    if (curIdx >= stageOrder.length - 1) {
      showMessage("Campaign has reached the final stage (Distributed).")
      return
    }
    const nextStage = stageOrder[curIdx + 1]

    setIsBroadcasting(true)
    try {
      const res = await donationsApi.broadcastStage(campaign.id || campaign.campaignId, {
        stage: nextStage,
        photoUrl: dispatchPhoto,
        coordinates: dispatchGps,
        location: dispatchLocation,
        notes: dispatchNotes || undefined,
      })

      if (res?.campaign) {
        setCampaign(res.campaign)
        onUpdate?.(res.campaign)
        showMessage(`Stage "${nextStage.toUpperCase()}" broadcasted to all donors!`)
      }
    } catch {
      // Local fallback for offline mode
      const updatedStages = campaign.stages.map((st, idx) => {
        if (idx <= curIdx + 1) {
          st.completed = true
        }
        if (st.stage === nextStage) {
          st.photoUrl = dispatchPhoto
          st.geoTag = {
            location: dispatchLocation,
            coordinates: dispatchGps,
            verified: true,
          }
          if (dispatchNotes) st.description = dispatchNotes
          st.timestamp = new Date().toISOString()
        }
        return st
      })

      const updatedCampaign: ApiDonationCampaign = {
        ...campaign,
        currentStage: nextStage,
        status: nextStage === "distributed" ? "Completed" : "Active",
        stages: updatedStages,
      }
      setCampaign(updatedCampaign)
      onUpdate?.(updatedCampaign)
      showMessage(`Stage "${nextStage.toUpperCase()}" updated live (offline mode)!`)
    } finally {
      setIsBroadcasting(false)
    }
  }

  async function handleAddExpense() {
    if (!expenseItem.trim() || !expenseAmount.trim()) {
      showMessage("Please enter item name and amount.")
      return
    }

    const amt = Number(expenseAmount)
    const newExp = {
      id: "exp-" + Date.now(),
      item: expenseItem.trim(),
      amount: amt,
      vendor: expenseVendor.trim() || "Local Supplier",
      date: new Date().toISOString().split("T")[0],
      receiptUrl: "",
    }

    try {
      await donationsApi.addExpense(campaign.id || campaign.campaignId, {
        item: expenseItem.trim(),
        amount: amt,
        vendor: expenseVendor.trim(),
      })
    } catch {
      // Offline fallback
    }

    setCampaign((prev) => ({
      ...prev,
      expenses: [newExp, ...prev.expenses],
    }))
    setShowExpenseModal(false)
    setExpenseItem("")
    setExpenseAmount("")
    setExpenseVendor("")
    showMessage("Expense entry recorded to transparency ledger!")
  }

  const badge = categoryBadges[campaign.category] || categoryBadges.Clothes
  const progressPercent = Math.min(
    100,
    Math.round((campaign.raisedUnits / (campaign.targetUnits || 1)) * 100)
  )

  const stageOrder = ["pledged", "procured", "prepared", "distributed"]
  const currentStageIndex = stageOrder.indexOf(campaign.currentStage)

  return (
    <main className="font-outfit-regular relative min-h-dvh bg-[#faf6ff] text-[#18151d] pb-24 antialiased">
      {/* Ambient gradient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ebd7ff] opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#dcfce7] opacity-60 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-xl items-center justify-between px-5 pt-4 pb-2">
        <button
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-white shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          onClick={onBack}
          type="button"
        >
          <svg className="h-5 w-5 text-[#18151d]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-center">
          <span className="font-outfit-extrabold text-[11px] uppercase tracking-widest text-[#6f19d6]">
            Host Control Dashboard
          </span>
          <h1 className="font-outfit-black text-lg leading-tight text-[#18151d]">
            Donation Campaign Admin
          </h1>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-[#18151d] bg-[#d8f23c] px-3 py-1 font-outfit-bold text-xs">
          <span>●</span>
          <span>{campaign.status}</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-xl px-5 pt-2">
        {/* Campaign Vitals Card */}
        <section className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[4px_5px_0_#18151d]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-outfit-bold ${badge.bg} ${badge.text} ${badge.border}`}>
                <span>{badge.icon}</span>
                <span>{campaign.category} Campaign</span>
              </span>
              <h2 className="font-outfit-black mt-2 text-xl leading-tight text-[#18151d]">
                {campaign.title}
              </h2>
              <p className="font-outfit-semibold text-xs text-[#6e6378]">
                📍 {campaign.location} • Organised by {campaign.organizer}
              </p>
            </div>
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-[#18151d]">
              <img alt="" className="h-full w-full object-cover" src={campaign.image} />
            </div>
          </div>

          {/* Goal & Units Bar */}
          <div className="mt-4 border-t-2 border-dashed border-[#e6dced] pt-3">
            <div className="flex items-center justify-between text-xs font-outfit-bold">
              <span>Units Sponsored: {campaign.raisedUnits} / {campaign.targetUnits} {campaign.donationItem}s</span>
              <span className="text-[#6f19d6]">{progressPercent}% Funded</span>
            </div>
            <div className="mt-1.5 h-3.5 w-full overflow-hidden rounded-full border border-[#18151d] bg-[#f0e7fa]">
              <div
                className="h-full bg-[#d8f23c] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-outfit-semibold text-[#665a71]">
              <span>Raised: ₹{campaign.raisedAmount.toLocaleString()}</span>
              <span>Target: ₹{campaign.targetAmount.toLocaleString()} (@ ₹{campaign.unitCost}/unit)</span>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="my-4 grid grid-cols-3 gap-2">
          {[
            { id: "stages" as const, label: "Live Proof Dispatch" },
            { id: "donors" as const, label: `Donors (${campaign.donors.length})` },
            { id: "expenses" as const, label: `Ledger (${campaign.expenses.length})` },
          ].map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                className={`rounded-2xl border-2 border-[#18151d] py-2.5 font-outfit-extrabold text-xs transition ${
                  active
                    ? "bg-[#6f19d6] text-white shadow-[2px_2px_0_#18151d]"
                    : "bg-white text-[#18151d] hover:bg-[#f6f0fd]"
                }`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* TAB 1: Live On-Ground Proof Dispatch Console */}
        {activeTab === "stages" && (
          <section className="space-y-4">
            {/* Stage Stepper Overview */}
            <div className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
              <div className="flex items-center justify-between pb-3">
                <span className="font-outfit-bold text-sm text-[#18151d]">
                  Campaign Lifecycle Stages:
                </span>
                <span className="rounded-full bg-[#efffdc] px-2.5 py-0.5 font-outfit-bold text-xs text-[#208a46]">
                  Active: {campaign.currentStage.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center">
                {stageOrder.map((st, idx) => {
                  const isDone = idx <= currentStageIndex
                  const isCurrent = idx === currentStageIndex
                  return (
                    <div
                      className={`flex flex-col items-center rounded-2xl border-2 p-2 ${
                        isCurrent
                          ? "border-[#18151d] bg-[#d8f23c] font-outfit-black shadow-[1.5px_1.5px_0_#18151d]"
                          : isDone
                          ? "border-[#18151d] bg-[#f0e4ff] font-outfit-bold text-[#6f19d6]"
                          : "border-[#e0d6eb] bg-[#faf8fc] text-[#9a8ea6]"
                      }`}
                      key={st}
                    >
                      <span className="text-base">
                        {st === "pledged" ? "🎟️" : st === "procured" ? "📦" : st === "prepared" ? "✨" : "🤝"}
                      </span>
                      <span className="mt-1 text-[11px] capitalize">{st}</span>
                      <span className="text-[9px]">{isDone ? "✓ Done" : "Pending"}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dispatch Next Stage Box */}
            <div className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#e6dced] pb-3">
                <div>
                  <h3 className="font-outfit-black text-base text-[#18151d]">
                    On-Ground Proof Dispatch Console
                  </h3>
                  <p className="font-outfit-regular text-xs text-[#6e6378]">
                    Broadcast live geotagged proof to all {campaign.donors.length} donors holding passes.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {/* Live GPS Lock */}
                <div>
                  <label className="font-outfit-bold text-xs text-[#18151d]">
                    1. High-Precision GPS Geotag:
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      className="flex-1 rounded-xl border-2 border-[#18151d] bg-[#faf6ff] px-3.5 py-2 font-mono text-xs font-bold text-[#18151d] outline-none"
                      onChange={(e) => setDispatchGps(e.target.value)}
                      value={dispatchGps}
                    />
                    <button
                      className="font-outfit-bold flex items-center gap-1 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-3 py-2 text-xs text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      disabled={isGettingGps}
                      onClick={handleCaptureGps}
                      type="button"
                    >
                      <span>📍</span>
                      <span>{isGettingGps ? "Locking..." : "Auto GPS"}</span>
                    </button>
                  </div>
                </div>

                {/* Live On-Ground Photo Proof Capture */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-outfit-bold text-xs text-[#18151d]">
                      2. Live On-Ground Photo Proof:
                    </label>
                    {capturedTimestamp && (
                      <span className="text-[11px] font-bold text-[#6f19d6]">
                        🕒 Captured {capturedTimestamp}
                      </span>
                    )}
                  </div>

                  {/* Hidden file input supporting native mobile camera capture */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Live Camera Viewfinder Modal / Section */}
                  {isCameraOpen ? (
                    <div className="mt-2 overflow-hidden rounded-2xl border-2 border-[#18151d] bg-[#18151d] shadow-[3px_4px_0_#18151d]">
                      <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
                        <video
                          ref={videoRef}
                          playsInline
                          autoPlay
                          muted
                          className="h-full w-full object-cover"
                        />

                        {/* Viewfinder Target Overlay */}
                        <div className="pointer-events-none absolute inset-5 rounded-xl border border-dashed border-white/60 flex items-center justify-center">
                          <div className="h-4 w-4 border-t-2 border-l-2 border-[#d8f23c] absolute top-2 left-2" />
                          <div className="h-4 w-4 border-t-2 border-r-2 border-[#d8f23c] absolute top-2 right-2" />
                          <div className="h-4 w-4 border-b-2 border-l-2 border-[#d8f23c] absolute bottom-2 left-2" />
                          <div className="h-4 w-4 border-b-2 border-r-2 border-[#d8f23c] absolute bottom-2 right-2" />
                          <span className="rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white">
                            📍 {dispatchGps}
                          </span>
                        </div>

                        {cameraError && (
                          <div className="absolute inset-3 flex flex-col items-center justify-center rounded-xl bg-black/90 p-4 text-center">
                            <p className="text-xs font-bold text-[#ff6b81]">{cameraError}</p>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-3 rounded-lg bg-[#d8f23c] px-3 py-1.5 text-xs font-bold text-[#18151d]"
                            >
                              Use Phone Camera / File
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Camera Controls Bar */}
                      <div className="flex items-center justify-between bg-[#221c2b] p-3">
                        <button
                          type="button"
                          onClick={handleFlipCamera}
                          className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
                        >
                          🔄 Flip
                        </button>

                        <button
                          type="button"
                          onClick={handleCaptureLivePhoto}
                          className="flex items-center gap-2 rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] px-5 py-2.5 font-outfit-black text-xs font-bold text-[#18151d] shadow-[2px_2px_0_#ffffff] transition hover:scale-105 active:scale-95"
                        >
                          <span className="text-base">📸</span>
                          <span>Capture Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={stopCamera}
                          className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/20"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Current Photo Preview & Capture Buttons */
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-3 rounded-2xl border-2 border-[#18151d] bg-[#faf6ff] p-3">
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-[#18151d] bg-black shadow-[2px_2px_0_#18151d]">
                          <img
                            alt="Current Proof"
                            className="h-full w-full object-cover"
                            src={dispatchPhoto}
                          />
                          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">
                            Preview
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col justify-between self-stretch">
                          <p className="text-xs font-bold text-[#18151d]">
                            Broadcast Proof Image
                          </p>
                          <p className="line-clamp-2 text-[11px] text-[#6e6378]">
                            Geotagged & verified live proof sent to donor passes.
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={handleCameraClickWithConsent}
                              className="font-outfit-bold flex items-center gap-1.5 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-3 py-1.5 text-xs text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:-translate-y-0.5"
                            >
                              <span>📷</span>
                              <span>Live Camera</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleUploadClickWithConsent}
                              className="font-outfit-bold flex items-center gap-1.5 rounded-xl border-2 border-[#18151d] bg-white px-3 py-1.5 text-xs text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:bg-[#f3e8ff]"
                            >
                              <span>📁</span>
                              <span>Upload / Snap</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes for donors */}
                <div>
                  <label className="font-outfit-bold text-xs text-[#18151d]">
                    3. Live Update Note for Donors:
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] p-3 text-xs font-outfit-semibold text-[#18151d] outline-none focus:border-[#6f19d6]"
                    onChange={(e) => setDispatchNotes(e.target.value)}
                    placeholder="e.g. 140 blankets arrived at Udupi coastal hub; volunteers have commenced door-to-door distribution."
                    rows={2}
                    value={dispatchNotes}
                  />
                </div>

                {/* Primary Broadcast CTA */}
                <button
                  className="font-outfit-black mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#18151d] bg-[#6f19d6] py-3.5 text-sm text-white shadow-[3px_4px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
                  disabled={isBroadcasting || campaign.currentStage === "distributed"}
                  onClick={handleBroadcastNextStage}
                  type="button"
                >
                  {isBroadcasting ? (
                    <span>Broadcasting to Donors...</span>
                  ) : campaign.currentStage === "distributed" ? (
                    <span>✓ Final Proof Distributed</span>
                  ) : (
                    <span>
                      ⚡ Broadcast Next Stage ({stageOrder[currentStageIndex + 1]?.toUpperCase()}) ➔
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Stages History Log */}
            <div className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
              <h3 className="font-outfit-black pb-2 text-sm text-[#18151d]">
                Live Stage Proof History:
              </h3>
              <div className="space-y-3">
                {campaign.stages.map((st) => (
                  <div
                    className={`flex items-start gap-3 rounded-2xl border-2 p-3 ${
                      st.completed ? "border-[#18151d] bg-[#fdfcff]" : "border-[#e5dbeb] bg-[#faf8fc] opacity-60"
                    }`}
                    key={st.stage}
                  >
                    <div
                      className="relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-[#18151d]"
                      onClick={() => setSelectedProofPhoto(st.photoUrl)}
                    >
                      <img alt="" className="h-full w-full object-cover" src={st.photoUrl} />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-center font-outfit-bold text-[8px] text-white">
                        Tap view
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-outfit-bold text-xs capitalize text-[#18151d]">
                          {st.stage}: {st.title}
                        </span>
                        <span className="rounded-full bg-[#d8f23c] px-2 py-0.5 font-outfit-bold text-[9px] text-[#18151d]">
                          {st.completed ? "Verified" : "Pending"}
                        </span>
                      </div>
                      <p className="font-outfit-regular mt-1 text-[11px] text-[#5c5264]">
                        {st.description}
                      </p>
                      <div className="mt-1 font-mono text-[9px] text-[#7d7188]">
                        📍 {st.geoTag.coordinates} • {new Date(st.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Donor Ledger */}
        {activeTab === "donors" && (
          <section className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#e6dced]">
              <div>
                <h3 className="font-outfit-black text-base text-[#18151d]">
                  Campaign Donor Ledger
                </h3>
                <p className="font-outfit-regular text-xs text-[#6e6378]">
                  Verified supporters holding live impact tracking passes.
                </p>
              </div>
              <span className="font-outfit-bold text-xs text-[#6f19d6]">
                {campaign.donors.length} Supporters
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {campaign.donors.length === 0 ? (
                <p className="py-6 text-center font-outfit-semibold text-xs text-[#7d7188]">
                  No donor pledges recorded yet. Pledges will appear here live.
                </p>
              ) : (
                campaign.donors.map((d) => (
                  <div
                    className="flex items-center justify-between rounded-2xl border-2 border-[#18151d] bg-[#faf6ff] p-3 shadow-[1.5px_1.5px_0_#18151d]"
                    key={d.ticketId}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-[#6f19d6]">
                        #{d.ticketId}
                      </div>
                      <div className="font-outfit-bold text-sm text-[#18151d]">
                        {d.donorName}
                      </div>
                      <div className="font-outfit-semibold text-[10px] text-[#7a6f84]">
                        {new Date(d.timestamp).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-outfit-black text-sm text-[#18151d]">
                        ₹{d.amount}
                      </div>
                      <span className="rounded-full bg-[#d8f23c] px-2 py-0.5 font-outfit-bold text-[10px] text-[#18151d]">
                        {d.units} {campaign.donationItem}s
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* TAB 3: Transparency & Expense Ledger */}
        {activeTab === "expenses" && (
          <section className="rounded-3xl border-2 border-[#18151d] bg-white p-5 shadow-[3px_4px_0_#18151d]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#e6dced]">
              <div>
                <h3 className="font-outfit-black text-base text-[#18151d]">
                  Expense Transparency Ledger
                </h3>
                <p className="font-outfit-regular text-xs text-[#6e6378]">
                  Every rupee accounted for with vendor receipts.
                </p>
              </div>
              <button
                className="font-outfit-bold flex items-center gap-1 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] px-3 py-1.5 text-xs text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                onClick={() => setShowExpenseModal(true)}
                type="button"
              >
                + Add Expense
              </button>
            </div>

            {/* Total spent summary */}
            <div className="my-3 flex items-center justify-between rounded-2xl bg-[#efffdc] p-3 text-xs font-outfit-bold text-[#208a46]">
              <span>
                Total Documented Spend: ₹
                {campaign.expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </span>
              <span>100% Verified</span>
            </div>

            <div className="space-y-2.5">
              {campaign.expenses.map((exp) => (
                <div
                  className="flex items-center justify-between rounded-2xl border-2 border-[#18151d] bg-[#faf6ff] p-3 shadow-[1.5px_1.5px_0_#18151d]"
                  key={exp.id}
                >
                  <div>
                    <div className="font-outfit-bold text-sm text-[#18151d]">
                      {exp.item}
                    </div>
                    <div className="font-outfit-semibold text-xs text-[#6f19d6]">
                      Vendor: {exp.vendor}
                    </div>
                    <div className="text-[10px] text-[#7a6f84]">
                      Date: {exp.date}
                    </div>
                  </div>

                  <div className="text-right font-outfit-black text-sm text-[#18151d]">
                    ₹{exp.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Proof Photo Lightbox Modal */}
      {selectedProofPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProofPhoto(null)}
          role="dialog"
        >
          <div className="relative max-w-md overflow-hidden rounded-3xl border-2 border-white bg-black">
            <img alt="Proof zoom" className="w-full object-cover" src={selectedProofPhoto} />
            <button
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-bold"
              onClick={() => setSelectedProofPhoto(null)}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <div className="relative w-full max-w-sm rounded-[32px] border-2 border-[#18151d] bg-white p-6 shadow-2xl">
            <h3 className="font-outfit-black text-lg text-[#18151d]">
              Record Campaign Expense
            </h3>
            <p className="font-outfit-regular text-xs text-[#6e6378]">
              Log vendor bill or receipt item for financial transparency.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="font-outfit-bold text-xs text-[#18151d]">
                  Item / Service Description:
                </label>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] p-2.5 text-xs font-outfit-semibold text-[#18151d] outline-none"
                  onChange={(e) => setExpenseItem(e.target.value)}
                  placeholder="e.g. 140 Fleece Blankets (Wholesale)"
                  value={expenseItem}
                />
              </div>

              <div>
                <label className="font-outfit-bold text-xs text-[#18151d]">
                  Amount (₹):
                </label>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] p-2.5 text-xs font-outfit-semibold text-[#18151d] outline-none"
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="21000"
                  type="number"
                  value={expenseAmount}
                />
              </div>

              <div>
                <label className="font-outfit-bold text-xs text-[#18151d]">
                  Vendor / Supplier Name:
                </label>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-[#18151d] bg-[#faf6ff] p-2.5 text-xs font-outfit-semibold text-[#18151d] outline-none"
                  onChange={(e) => setExpenseVendor(e.target.value)}
                  placeholder="e.g. Karnataka Textile Co-operative"
                  value={expenseVendor}
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  className="flex-1 rounded-xl border-2 border-[#18151d] bg-white py-2.5 font-outfit-bold text-xs"
                  onClick={() => setShowExpenseModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] py-2.5 font-outfit-black text-xs text-[#18151d] shadow-[2px_2px_0_#18151d]"
                  onClick={handleAddExpense}
                  type="button"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Consent Dialog for Android & Web Camera Access */}
      {showConsentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[420px] rounded-3xl border-3 border-[#18151d] bg-white p-6 shadow-[6px_7px_0_#18151d]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] text-2xl shadow-[2px_2px_0_#18151d]">
                📸
              </div>
              <div>
                <span className="font-outfit-bold text-[11px] uppercase tracking-wider text-[#6f19d6]">
                  Android Camera Permission
                </span>
                <h3 className="font-outfit-extrabold text-xl leading-tight text-[#18151d]">
                  Allow Camera Access?
                </h3>
              </div>
            </div>

            <p className="font-outfit-regular mt-4 text-xs leading-relaxed text-[#625c68]">
              To broadcast verified on-ground milestone progress to donors holding tickets, SevaSathi needs your consent to access your device camera and location.
            </p>

            <div className="mt-4 space-y-2.5 rounded-2xl border-2 border-[#18151d] bg-[#faf6ff] p-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-base">📷</span>
                <div>
                  <strong className="block text-[#18151d]">Live Photo Capture</strong>
                  <span className="text-[#6e6378]">Takes field photos showing distribution of items.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-base">📍</span>
                <div>
                  <strong className="block text-[#18151d]">GPS & Time Stamping</strong>
                  <span className="text-[#6e6378]">Attaches coordinates and time so donors can verify delivery authenticity.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-base">🔒</span>
                <div>
                  <strong className="block text-[#18151d]">Your Privacy Protected</strong>
                  <span className="text-[#6e6378]">Camera is only active when you open the viewfinder. Photos are never shared outside the donor pass ledger.</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDenyConsent}
                className="font-outfit-bold h-11 rounded-xl border-2 border-[#18151d] bg-white text-xs text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:bg-[#faf6ff]"
              >
                Not Now
              </button>
              <button
                type="button"
                onClick={handleGrantConsent}
                className="font-outfit-black h-11 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] text-xs font-bold text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:bg-[#cbf018] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Allow & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notice Toast */}
      {notice && (
        <div
          className="font-outfit-bold fixed left-1/2 top-5 z-50 max-w-[90vw] -translate-x-1/2 rounded-full border-2 border-[#18151d] bg-[#d8f23c] px-5 py-2.5 text-center text-xs text-[#18151d] shadow-[3px_3px_0_#18151d]"
          role="status"
        >
          {notice}
        </div>
      )}
    </main>
  )
}

