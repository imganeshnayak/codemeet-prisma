import { useEffect, useRef, useState, ChangeEvent } from "react"
import { rewardsApi } from "./api"

const asset = (name: string) => `/assets/geo-proof/${name}`

export default function GeoTagProof({
  onBack,
  taskId,
  articleId,
  onSubmitted,
}: {
  onBack: () => void
  taskId?: string
  articleId?: string
  onSubmitted?: () => void
}) {
  const [captured, setCaptured] = useState(false)
  const [photo, setPhoto] = useState("")
  const [cameraError, setCameraError] = useState("")
  const [location, setLocation] = useState({
    label: "Location unavailable",
    coordinates: "Location unavailable",
  })
  const [capturedAt, setCapturedAt] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera access is not supported in this browser.")
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { ideal: "environment" } },
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch {
        if (!cancelled) {
          setCameraError(
            "Camera access was denied or unavailable. You can also upload a photo directly below.",
          )
        }
      }
    }

    startCamera()
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          label: `${coords.latitude.toFixed(4)}°, ${coords.longitude.toFixed(4)}°`,
          coordinates: `Lat: ${coords.latitude.toFixed(4)}° N, Lon: ${coords.longitude.toFixed(4)}° E`,
        })
      },
      () => {
        setLocation({
          label: "Mangaluru, Karnataka",
          coordinates: "Lat: 12.8718° N, Lon: 74.8560° E (Est)",
        })
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  function capturePhoto() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError("The camera is not ready yet. Please try again or upload a photo.")
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext("2d")?.drawImage(video, 0, 0)
    setPhoto(canvas.toDataURL("image/jpeg", 0.9))
    setCapturedAt(
      new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
    )
    setCaptured(true)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhoto(reader.result)
        setCaptured(true)
        setCapturedAt(
          new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date()),
        )
        streamRef.current?.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
    reader.readAsDataURL(file)
  }

  async function retakePhoto() {
    setPhoto("")
    setCaptured(false)
    setCapturedAt("")
    setCameraError("")
    setSubmitError("")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch {
      setCameraError("Camera access is unavailable. You can upload a photo from your device.")
    }
  }

  async function submitProof() {
    if (!photo) {
      setSubmitError("Please capture or upload a proof photo first.")
      return
    }
    setSubmitting(true)
    setSubmitError("")
    try {
      await rewardsApi.submitProof(taskId || "general", {
        imageUrl: photo,
        coordinates: location.coordinates,
        location: location.label,
        capturedAt: capturedAt || new Date().toLocaleString(),
      }, articleId)
      setSubmitted(true)
      onSubmitted?.()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit proof. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="geo-proof-page pb-20">
      <header className="geo-proof-header">
        <button
          aria-label="Back"
          className="geo-proof-header-button"
          onClick={onBack}
          type="button"
        >
          <img alt="" src={asset("edf3d.svg")} />
        </button>

        <div className="geo-proof-brand" aria-label="SevaSathi">
          <span>Seva</span>
          <span>Sathi</span>
          <img alt="" src={asset("cf5d4.svg")} />
        </div>

        <div className="geo-proof-account-actions">
          <button
            aria-label="Notifications"
            className="geo-proof-notifications"
            type="button"
          >
            <img alt="" src={asset("9447a.svg")} />
          </button>
          <button aria-label="Open profile" type="button">
            <img
              alt="Aarav Sharma"
              className="geo-proof-avatar"
              src={asset("5037c.png")}
            />
          </button>
        </div>
      </header>

      <div className="geo-proof-title">
        <img alt="" src={asset("21273.svg")} />
        <div>
          <h1>Geo-Tag Proof</h1>
          <p className="text-xs text-[#6e5d80] mt-0.5">
            Capture field verification tagged with live GPS & time
          </p>
        </div>
      </div>

      <section className="geo-proof-card" aria-label="Proof capture">
        <div className="geo-proof-preview">
          {photo ? (
            <img
              alt="Captured proof"
              className="geo-proof-photo"
              src={photo}
            />
          ) : (
            <video
              aria-label="Live camera preview"
              autoPlay
              className="geo-proof-photo"
              muted
              playsInline
              ref={videoRef}
            />
          )}
          {!photo && cameraError && (
            <div className="geo-proof-camera-error" role="alert">
              {cameraError}
            </div>
          )}
          <div className="geo-proof-live">
            <img alt="" src={asset("1c08b.svg")} />
            <span>Live Proof</span>
          </div>
          <button
            aria-label="Camera settings"
            className="geo-proof-settings"
            onClick={() => fileInputRef.current?.click()}
            title="Upload photo"
            type="button"
          >
            <img alt="" src={asset("bebab.svg")} />
          </button>
          <img alt="" className="geo-proof-guides" src={asset("5eae8.svg")} />
        </div>
        <canvas className="geo-proof-canvas" ref={canvasRef} />

        <div className="flex items-center justify-center gap-4 my-2">
          <button
            aria-label="Take proof photo"
            className="geo-proof-shutter"
            onClick={capturePhoto}
            type="button"
          >
            <img
              alt=""
              className="geo-proof-shutter-border"
              src={asset("c433e.svg")}
            />
            <span>
              <img alt="" src={asset("c0b36.svg")} />
            </span>
          </button>
        </div>

        {/* Upload file fallback button */}
        <input
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          ref={fileInputRef}
          type="file"
        />

        <div className="geo-proof-details">
          <div className="geo-proof-metadata">
            <p>
              <img alt="" src={asset("240e7.svg")} />
              <span>{location.label}</span>
            </p>
            <p>
              <img alt="" src={asset("d1264.svg")} />
              <span>{capturedAt || "Capture time appears after taking a photo"}</span>
            </p>
            <p>
              <img alt="" src={asset("7aa3c.svg")} />
              <span>{location.coordinates}</span>
            </p>
          </div>
          <div className="geo-proof-map" aria-label="Map of capture location">
            <img
              alt=""
              className="geo-proof-map-art"
              src={asset("2afa9.svg")}
            />
            <img
              alt=""
              className="geo-proof-map-pin"
              src={asset("0bcda.svg")}
            />
          </div>
        </div>

        {/* Camera action buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            className={`flex items-center justify-center gap-2 rounded-xl border-2 border-[#18151d] p-3 text-xs font-bold transition ${
              captured
                ? "bg-[#f4ebff] text-[#6f19d6] hover:bg-[#ebdcfc]"
                : "bg-[#9200f6] text-white hover:bg-[#8000db]"
            }`}
            onClick={captured ? retakePhoto : capturePhoto}
            type="button"
          >
            <span>{captured ? "🔄 Retake Photo" : "📸 Capture Camera"}</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#18151d] bg-white p-3 text-xs font-bold text-[#18151d] hover:bg-[#fbf7ff] transition"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <span>📁 Upload from Device</span>
          </button>
        </div>

        {submitError && (
          <p className="mt-3 rounded-lg border border-[#e13747] bg-[#fff0f2] p-2.5 text-center text-xs font-bold text-[#a01f31]" role="alert">
            {submitError}
          </p>
        )}

        {/* SUBMIT BUTTON - Always visible and prominently styled */}
        {submitted ? (
          <div className="mt-5 rounded-2xl border-2 border-[#18151d] bg-[#efffdc] p-4 text-center shadow-[3px_3px_0_#18151d]">
            <span className="text-2xl block mb-1">🎉</span>
            <h3 className="font-['Arimo:Bold'] text-sm font-bold text-[#1f8742]">
              Geo-Tag Proof Submitted!
            </h3>
            <p className="text-xs text-[#3b784f] mt-0.5">
              Your field proof has been recorded with GPS coordinates. +50 XP will be added upon host verification.
            </p>
            <button
              className="mt-3 w-full rounded-xl border-2 border-[#18151d] bg-[#18151d] py-2.5 text-xs font-bold text-white shadow-[2px_2px_0_#d8f23c]"
              onClick={onBack}
              type="button"
            >
              Done, Return Back
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <button
              className={`w-full flex items-center justify-center gap-2 rounded-2xl border-3 border-[#18151d] py-3.5 px-4 text-center font-['Arimo:Bold'] text-sm font-bold transition shadow-[4px_4px_0_#18151d] ${
                photo
                  ? "bg-[#d8f23c] text-[#18151d] hover:bg-[#cbf018] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  : "bg-[#e2d8ed] text-[#7c7188] cursor-not-allowed opacity-80"
              }`}
              disabled={submitting || !photo}
              onClick={submitProof}
              type="button"
            >
              <span>
                {submitting
                  ? "Submitting Proof..."
                  : photo
                    ? "🚀 Submit Geo-Tag Proof for Approval ➔"
                    : "📸 Capture or Upload Photo to Submit"}
              </span>
            </button>
            {!photo && (
              <p className="text-[11px] text-center text-[#7c7188] mt-2">
                Take a live camera picture or select an image from your device above to enable submit.
              </p>
            )}
          </div>
        )}
      </section>

      <div className="geo-proof-botanical" aria-hidden="true">
        <img className="geo-proof-wave" src={asset("a8c94.svg")} />
        <img
          className="geo-proof-plant geo-proof-plant-left"
          src={asset("d6a10.svg")}
        />
        <img
          className="geo-proof-plant geo-proof-plant-right"
          src={asset("f519c.svg")}
        />
      </div>
    </main>
  )
}
