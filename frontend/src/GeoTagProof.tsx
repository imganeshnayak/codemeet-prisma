import { useState } from "react"

const asset = (name: string) => `/assets/geo-proof/${name}`

export default function GeoTagProof({ onBack }: { onBack: () => void }) {
  const [captured, setCaptured] = useState(false)

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
          <img
            alt="Two volunteers planting a sapling"
            className="geo-proof-photo"
            src={asset("dbbe5.png")}
          />
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

        <button
          aria-label="Take proof photo"
          className="geo-proof-shutter"
          onClick={() => setCaptured(true)}
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
              <span>Mangaluru, Karnataka</span>
            </p>
            <p>
              <img alt="" src={asset("d1264.svg")} />
              <span>12 Oct 2025, 09:17 AM</span>
            </p>
            <p>
              <img alt="" src={asset("7aa3c.svg")} />
              <span>Lat: 12.9141° N, Lon: 74.8560° E</span>
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
          onClick={() => setCaptured(true)}
          type="button"
        >
          <img alt="" src={asset("9c3e4.svg")} />
          <span>{captured ? "Proof Captured" : "Capture Proof"}</span>
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
