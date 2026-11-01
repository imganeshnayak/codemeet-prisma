import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { CreateEventInput } from "./events"
import { ApiError } from "./api"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const asset = (name: string) => `/assets/${name}`

type FormState = Omit<CreateEventInput, "capacity"> & {
  capacity: string
}

const initialForm: FormState = {
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  skills: "",
  image: "",
}

const defaultMapCenter: L.LatLngExpression = [12.9141, 74.8560]

function MapPicker({
  onLocationSelected,
}: {
  onLocationSelected: (location: string) => void
}) {
  const mapElement = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const marker = useRef<L.CircleMarker | null>(null)
  const onLocationSelectedRef = useRef(onLocationSelected)
  const [loadingAddress, setLoadingAddress] = useState(false)
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  onLocationSelectedRef.current = onLocationSelected

  useEffect(() => {
    if (!mapElement.current || map.current) return

    const mapInstance = L.map(mapElement.current).setView(defaultMapCenter, 12)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance)

    mapInstance.on("click", async (event: L.LeafletMouseEvent) => {
      marker.current?.remove()
      marker.current = L.circleMarker(event.latlng, {
        color: "#8300e8",
        fillColor: "#d8f23c",
        fillOpacity: 1,
        radius: 9,
        weight: 3,
      }).addTo(mapInstance)

      setLoadingAddress(true)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${event.latlng.lat}&lon=${event.latlng.lng}`,
        )
        if (!response.ok) throw new Error("Address lookup failed")
        const result = (await response.json()) as {
          display_name?: string
        }
        onLocationSelectedRef.current(
          result.display_name ||
            `${event.latlng.lat.toFixed(5)}, ${event.latlng.lng.toFixed(5)}`,
        )
      } catch {
        onLocationSelectedRef.current(
          `${event.latlng.lat.toFixed(5)}, ${event.latlng.lng.toFixed(5)}`,
        )
      } finally {
        setLoadingAddress(false)
      }
    })

    map.current = mapInstance
    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [])

  async function searchLocation() {
    const query = search.trim()
    if (!query) return

    setSearching(true)
    setSearchError("")
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
      )
      if (!response.ok) throw new Error("Location search failed")
      const results = (await response.json()) as Array<{
        lat: string
        lon: string
        display_name: string
      }>
      const result = results[0]
      if (!result || !map.current) {
        setSearchError("No matching location found.")
        return
      }

      const coordinates = L.latLng(Number(result.lat), Number(result.lon))
      map.current.setView(coordinates, 16)
      marker.current?.remove()
      marker.current = L.circleMarker(coordinates, {
        color: "#8300e8",
        fillColor: "#d8f23c",
        fillOpacity: 1,
        radius: 9,
        weight: 3,
      }).addTo(map.current)
      onLocationSelectedRef.current(result.display_name)
    } catch {
      setSearchError("Location search is unavailable. Try again or click the map.")
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#18151d]">
      <div className="event-map-search">
        <input
          aria-label="Search map location"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              void searchLocation()
            }
          }}
          onChange={(event) => {
            setSearch(event.target.value)
            setSearchError("")
          }}
          placeholder="Search city, venue, or address"
          value={search}
        />
        <button
          disabled={searching}
          onClick={() => void searchLocation()}
          type="button"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="event-map" ref={mapElement} />
      <p className="bg-white px-3 py-2 text-[11px] text-[#626067]">
        {searchError ||
          (loadingAddress
          ? "Finding this location..."
          : "Search for a place or click the map to select the event location.")}
      </p>
    </div>
  )
}

export default function CreateEvent({
  onBack,
  onCreated,
}: {
  onBack: () => void
  onCreated: (event: CreateEventInput) => void | Promise<void>
}) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const [saving, setSaving] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setError("")
  }

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Choose a JPG or PNG cover image.")
      event.target.value = ""
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Cover image must be 5 MB or smaller.")
      event.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("We could not read that image. Please choose another file.")
        return
      }
      update("image", reader.result)
      setFileName(file.name)
    }
    reader.onerror = () =>
      setError("We could not read that image. Please choose another file.")
    reader.readAsDataURL(file)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.image) {
      setError("Add a cover image before creating your event.")
      return
    }

    const capacity = Number(form.capacity)
    if (!Number.isFinite(capacity) || capacity < 1) {
      setError("Volunteer capacity must be at least 1.")
      return
    }

    setSaving(true)
    try {
      await onCreated({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        skills: form.skills.trim(),
        capacity,
      })
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "We could not create the event. Please try again.",
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="create-event-page">
      <section className="relative z-10 h-[85px] px-[25px]">
        <h1 className="font-['Arimo:Bold'] text-[24px] font-bold">
          Create Event
        </h1>
        <p className="mt-1 w-[245px] font-['Arimo:Regular'] text-[12px] leading-[1.25]">
          Organize a meaningful event and bring
          <br />
          volunteers together for a real impact.
        </p>
        <div className="event-illustration">
          <img alt="" src={asset("3bb07.svg")} />
          <img alt="" src={asset("7f547.svg")} />
          <img alt="" src={asset("e765d.svg")} />
          <img alt="" src={asset("886d5.svg")} />
        </div>
      </section>

      <form className="event-form" onSubmit={submit}>
        {error && (
          <p
            className="rounded-lg border border-[#e13747] bg-[#fff0f2] px-3 py-2 font-['Arimo:Bold'] text-[11px] text-[#a01f31]"
            role="alert"
          >
            {error}
          </p>
        )}

        <EventField icon="d95ad.svg" label="Event Title">
          <input
            maxLength={80}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Eg. Tree Plantation Drive"
            required
            value={form.title}
          />
        </EventField>

        <EventField icon="2e6fb.svg" label="Event Description" large>
          <textarea
            maxLength={300}
            onChange={(event) => update("description", event.target.value)}
            placeholder="Tell about the event, its goal and impact..."
            required
            value={form.description}
          />
          <small>{form.description.length} / 300</small>
        </EventField>

        <EventField icon="c61e7.svg" label="Event Category">
          <select
            onChange={(event) => update("category", event.target.value)}
            required
            value={form.category}
          >
            <option disabled value="">
              Select Category
            </option>
            <option>Community</option>
            <option>Conservation</option>
            <option>Education</option>
            <option>Environment</option>
            <option>Health</option>
          </select>
        </EventField>

        <div className="grid grid-cols-2 gap-[15px]">
          <EventField icon="e38bd.svg" label="Date">
            <input
              onChange={(event) => update("date", event.target.value)}
              required
              type="date"
              value={form.date}
            />
          </EventField>
          <EventField icon="a57cd.svg" label="Time">
            <input
              onChange={(event) => update("time", event.target.value)}
              required
              type="time"
              value={form.time}
            />
          </EventField>
        </div>

        <EventField icon="bf5ca.svg" label="Location">
          <input
            onChange={(event) => update("location", event.target.value)}
            placeholder="Select Venue / Add Location"
            required
            value={form.location}
          />
        </EventField>
        <button
          className="event-map-toggle"
          onClick={() => setMapOpen((open) => !open)}
          type="button"
        >
          {mapOpen ? "Hide map" : "Choose location on map"}
        </button>
        {mapOpen && (
          <MapPicker
            onLocationSelected={(location) => update("location", location)}
          />
        )}

        <div className="grid grid-cols-[151px_1fr] gap-4">
          <EventField icon="4d6bb.svg" label="Volunteer Capacity">
            <input
              min="1"
              onChange={(event) => update("capacity", event.target.value)}
              placeholder="Eg. 30"
              required
              type="number"
              value={form.capacity}
            />
          </EventField>
          <EventField icon="9d7cd.svg" label="Required Skills" optional>
            <input
              onChange={(event) => update("skills", event.target.value)}
              placeholder="Eg. Teamwork"
              value={form.skills}
            />
          </EventField>
        </div>

        <div>
          <p className="font-['Arimo:Bold'] text-[13px] font-bold">
            Event Cover Image <b className="text-[#e13747]">*</b>
          </p>
          <div className="mt-[5px] flex items-center gap-4">
            <label className="event-upload">
              <img alt="" src={asset("0cd3e.svg")} />
              <b>{fileName || "Upload Event Image"}</b>
              <small>JPG, PNG (Max 5 MB)</small>
              <input
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={chooseImage}
                type="file"
              />
            </label>
            <div className="relative h-[76px] w-[77px] shrink-0 overflow-hidden rounded-xl">
              {form.image ? (
                <img
                  alt="Selected event cover preview"
                  className="h-full w-full object-cover"
                  src={form.image}
                />
              ) : (
                <>
                  <img
                    alt=""
                    className="absolute inset-2 -rotate-6"
                    src={asset("3e345.svg")}
                  />
                  <img
                    alt=""
                    className="absolute inset-2 rotate-6"
                    src={asset("5301e.svg")}
                  />
                  <img
                    alt=""
                    className="absolute inset-2"
                    src={asset("99908.svg")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <button className="event-submit" disabled={saving} type="submit">
          <img alt="" src={asset("2a937.svg")} />
          {saving ? "Creating..." : "Create Event"}
        </button>
      </form>
      <GardenDecor />
    </main>
  )
}

function EventField({
  children,
  icon,
  label,
  large = false,
  optional = false,
}: {
  children: React.ReactNode
  icon: string
  label: string
  large?: boolean
  optional?: boolean
}) {
  return (
    <label className="event-field">
      <span>
        {label}
        {optional ? <em> (Optional)</em> : <b> *</b>}
      </span>
      <span className={large ? "event-input event-textarea" : "event-input"}>
        <img alt="" src={asset(icon)} />
        {children}
      </span>
    </label>
  )
}

function GardenDecor() {
  return (
    <div aria-hidden="true" className="event-garden">
      <img alt="" src={asset("cea03.svg")} />
      <img alt="" src={asset("22810.svg")} />
      <img alt="" src={asset("c5579.svg")} />
    </div>
  )
}
