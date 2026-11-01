import { useEffect, useRef, useState } from "react"

const asset = (name: string) => `/assets/geo-proof/${name}`

export default function GeoTagProof({ onBack }: { onBack: () => void }) {
  const [captured, setCaptured] = useState(false)
  const [photo, setPhoto] = useState("")
  const [cameraError, setCameraError] = useState("")
  const [location, setLocation] = useState({
    label: "Location unavailable",
    coordinates: "Location unavailable",
  })
  const [capturedAt, setCapturedAt] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
            "Camera access was denied or unavailable. Check browser permissions and use HTTPS.",
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
          label: "Location unavailable",
          coordinates: "Location permission not granted",
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
      setCameraError("The camera is not ready yet. Please try again.")
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

  async function retakePhoto() {
    setPhoto("")
    setCaptured(false)
    setCapturedAt("")
    setCameraError("")
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
      setCameraError("Camera access is unavailable. Check browser permissions.")
    }
  }

  return (
    <main className="geo-proof-page">
      <header className="geo-proof-header">
        <button
          aria-label="Back to tasks"
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
        <h1>Geo-Tag Proof</h1>
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
            type="button"
          >
            <img alt="" src={asset("bebab.svg")} />
          </button>
          <img alt="" className="geo-proof-guides" src={asset("5eae8.svg")} />
        </div>
        <canvas className="geo-proof-canvas" ref={canvasRef} />

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

        <button
          className={`geo-proof-capture ${captured ? "is-captured" : ""}`}
          onClick={captured ? retakePhoto : capturePhoto}
          type="button"
        >
          <img alt="" src={asset("9c3e4.svg")} />
          <span>{captured ? "Retake Photo" : "Capture Proof"}</span>
          <img alt="" src={asset("3b555.svg")} />
        </button>
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
