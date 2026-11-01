import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { CreateEventInput } from "./events"
import { ApiDonationCampaign, ApiError, donationsApi } from "./api"
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

const defaultMapCenter: L.LatLngExpression = [12.9141, 74.856]

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
          onChange={(event) => {
            setSearch(event.target.value)
            setSearchError("")
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              void searchLocation()
            }
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
            : "Search for a place or click the map to select the location.")}
      </p>
    </div>
  )
}

export default function CreateEvent({
  onBack,
  onCreated,
  onCampaignCreated,
}: {
  onBack: () => void
  onCreated: (event: CreateEventInput) => void | Promise<void>
  onCampaignCreated?: (campaign: ApiDonationCampaign) => void
}) {
  const [initiativeType, setInitiativeType] = useState<
    "volunteer_event" | "donation_campaign"
  >("volunteer_event")

  // Volunteer Event Form State
  const [form, setForm] = useState(initialForm)

  // Donation Campaign Form State (Any Item / Cause)
  const [campaignTitle, setCampaignTitle] = useState("")
  const [campaignDesc, setCampaignDesc] = useState("")
  const [campaignCategory, setCampaignCategory] =
    useState<ApiDonationCampaign["category"]>("Clothes")
  const [donationItem, setDonationItem] = useState("Warm Blanket & Rainwear Kit")
  const [unitCost, setUnitCost] = useState("200")
  const [targetUnits, setTargetUnits] = useState("250")
  const [beneficiaryGroup, setBeneficiaryGroup] = useState(
    "Coastal Fisherfolk Families & Children",
  )
  const [campaignLocation, setCampaignLocation] = useState("")
  const [campaignImage, setCampaignImage] = useState("")
  const [campaignFileName, setCampaignFileName] = useState("")

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
      if (initiativeType === "donation_campaign") {
        setCampaignImage(reader.result)
        setCampaignFileName(file.name)
      } else {
        update("image", reader.result)
        setFileName(file.name)
      }
    }
    reader.onerror = () =>
      setError("We could not read that image. Please choose another file.")
    reader.readAsDataURL(file)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    // Handle Donation Campaign Submission
    if (initiativeType === "donation_campaign") {
      if (!campaignTitle.trim()) {
        setError("Please enter a campaign title.")
        return
      }
      if (!campaignDesc.trim()) {
        setError("Please provide a description of the donation cause.")
        return
      }
      if (!donationItem.trim()) {
        setError("Please name the item or kit being sponsored.")
        return
      }
      if (!campaignImage) {
        setError("Add a cover photo for your donation campaign.")
        return
      }

      const uCost = Math.max(1, Number(unitCost) || 100)
      const tUnits = Math.max(1, Number(targetUnits) || 50)
      const tAmount = uCost * tUnits

      setSaving(true)
      try {
        const res = await donationsApi.createCampaign({
          title: campaignTitle.trim(),
          description: campaignDesc.trim(),
          category: campaignCategory,
          donationItem: donationItem.trim(),
          unitCost: uCost,
          targetUnits: tUnits,
          targetAmount: tAmount,
          location: campaignLocation.trim() || "Mangaluru, Karnataka",
          beneficiaryGroup: beneficiaryGroup.trim() || "Local Community in Need",
          image: campaignImage,
        })

        if (res?.campaign && onCampaignCreated) {
          onCampaignCreated(res.campaign)
        } else {
          onBack()
        }
      } catch {
        // Fallback offline campaign
        const mockCampaign: ApiDonationCampaign = {
          id: "camp-" + Date.now(),
          campaignId:
            "CAMP-" +
            campaignCategory.toUpperCase().slice(0, 5) +
            "-" +
            Math.floor(100 + Math.random() * 900),
          organizer: "Aarav Sharma",
          title: campaignTitle.trim(),
          description: campaignDesc.trim(),
          category: campaignCategory,
          donationItem: donationItem.trim(),
          unitCost: uCost,
          targetUnits: tUnits,
          raisedUnits: 0,
          targetAmount: tAmount,
          raisedAmount: 0,
          location: campaignLocation.trim() || "Mangaluru, Karnataka",
          beneficiaryGroup: beneficiaryGroup.trim() || "Local Community",
          image: campaignImage,
          status: "Active",
          currentStage: "pledged",
          stages: [
            {
              stage: "pledged",
              title: `${donationItem} Drive Launched`,
              description: `Pledges open for ${tUnits} ${donationItem}s.`,
              timestamp: new Date().toISOString(),
              photoUrl: campaignImage,
              geoTag: {
                location: campaignLocation || "Mangaluru",
                coordinates: "12.8718° N, 74.8560° E",
                verified: true,
              },
              volunteer: {
                name: "Aarav Sharma",
                role: "Campaign Host",
                avatar: "AS",
              },
              completed: true,
            },
            {
              stage: "procured",
              title: `Procurement of ${donationItem}s`,
              description:
                "Wholesale items purchased directly from verified vendors.",
              timestamp: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
              photoUrl: "/assets/donation-tracker/405bb.png",
              geoTag: {
                location: campaignLocation || "Mangaluru",
                coordinates: "12.8718° N, 74.8560° E",
                verified: true,
              },
              volunteer: {
                name: "Aarav Sharma",
                role: "Procurement",
                avatar: "AS",
              },
              completed: false,
            },
            {
              stage: "prepared",
              title: "Sorted, Quality Checked & Packaged",
              description:
                "Volunteers assemble individual kits ready for distribution.",
              timestamp: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
              photoUrl: "/assets/donation-tracker/41231.png",
              geoTag: {
                location: campaignLocation || "Mangaluru",
                coordinates: "12.8718° N, 74.8560° E",
                verified: true,
              },
              volunteer: {
                name: "Aarav Sharma",
                role: "Assembly",
                avatar: "AS",
              },
              completed: false,
            },
            {
              stage: "distributed",
              title: "Distribution with Live Geotagged Proof",
              description:
                "Handover to beneficiaries with verified GPS timestamp.",
              timestamp: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
              photoUrl: "/assets/donation-tracker/ab234.png",
              geoTag: {
                location: campaignLocation || "Mangaluru",
                coordinates: "12.8718° N, 74.8560° E",
                verified: true,
              },
              volunteer: {
                name: "Aarav Sharma",
                role: "Field Distribution",
                avatar: "AS",
              },
              completed: false,
            },
          ],
          expenses: [],
          donors: [],
        }
        if (onCampaignCreated) onCampaignCreated(mockCampaign)
        else onBack()
      } finally {
        setSaving(false)
      }
      return
    }

    // Handle Volunteer Event Submission
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

  const calculatedGoal = (Number(unitCost) || 0) * (Number(targetUnits) || 0)

  return (
    <main className="create-event-page pb-20">
      <section className="relative z-10 h-[85px] px-[25px]">
        <div className="flex items-start gap-3">
          <button
            aria-label="Go back"
            className="mt-[-3px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d5c9e1] bg-white text-[#18151d] shadow-sm transition hover:bg-[#f7efff]"
            onClick={onBack}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 12H5m0 0 7 7m-7-7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <div>
            <h1 className="font-['Arimo:Bold'] text-[24px] font-bold">
              {initiativeType === "donation_campaign"
                ? "Create Donation Campaign"
                : "Create Volunteer Event"}
            </h1>
          </div>
        </div>
        <div className="event-illustration">
          <img alt="" src={asset("3bb07.svg")} />
          <img alt="" src={asset("7f547.svg")} />
          <img alt="" src={asset("e765d.svg")} />
          <img alt="" src={asset("886d5.svg")} />
        </div>
      </section>

      {/* Primary Initiative Type Switcher */}
      <div className="mx-auto max-w-[760px] px-[25px] pt-3">
        <div className="p-2.5">
          <span className="font-['Arimo:Bold'] text-xs font-bold text-[#18151d] block pb-2">
            Select What You Want to Organize:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`flex flex-col items-center rounded-xl border-2 p-2.5 transition ${
                initiativeType === "volunteer_event"
                  ? "border-[#18151d] bg-[#8c23df] text-white shadow-[2px_2px_0_#18151d]"
                  : "border-[#e0d5eb] bg-[#faf6ff] text-[#18151d] hover:bg-[#f2e7fc]"
              }`}
              onClick={() => {
                setInitiativeType("volunteer_event")
                setError("")
              }}
              type="button"
            >
              <span className="text-2xl">🤝</span>
              <span className="font-['Arimo:Bold'] text-xs font-bold mt-1">
                Volunteer Event
              </span>
              <span
                className={`text-[10px] mt-0.5 ${
                  initiativeType === "volunteer_event"
                    ? "text-white/80"
                    : "text-[#73677e]"
                }`}
              >
                Volunteers, shifts & tasks
              </span>
            </button>

            <button
              className={`flex flex-col items-center rounded-xl border-2 p-2.5 transition ${
                initiativeType === "donation_campaign"
                  ? "border-[#18151d] bg-[#8c23df] text-white shadow-[2px_2px_0_#18151d]"
                  : "border-[#e0d5eb] bg-[#faf6ff] text-[#18151d] hover:bg-[#f2e7fc]"
              }`}
              onClick={() => {
                setInitiativeType("donation_campaign")
                setError("")
              }}
              type="button"
            >
              <span className="text-2xl">🎟️</span>
              <span className="font-['Arimo:Bold'] text-xs font-bold mt-1">
                Donation Campaign
              </span>
              <span
                className={`text-[10px] mt-0.5 ${
                  initiativeType === "donation_campaign"
                    ? "text-white/80"
                    : "text-[#73677e]"
                }`}
              >
                Any item, funds & live GPS proof
              </span>
            </button>
          </div>
        </div>
      </div>

      <form className="event-form" onSubmit={submit}>
        {error && (
          <p
            className="rounded-lg border border-[#e13747] bg-[#fff0f2] px-3 py-2 font-['Arimo:Bold'] text-[11px] text-[#a01f31]"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* ========================================================================= */}
        {/* CASE 1: VOLUNTEER EVENT FORM                                              */}
        {/* ========================================================================= */}
        {initiativeType === "volunteer_event" ? (
          <>
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
                onLocationSelected={(loc) => update("location", loc)}
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
                      alt="Event cover preview"
                      className="h-full w-full object-cover"
                      src={form.image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f0e4ff] text-2xl">
                      🤝
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="event-submit" disabled={saving} type="submit">
              <img alt="" src={asset("2a937.svg")} />
              {saving ? "Creating..." : "Create Volunteer Event"}
            </button>
          </>
        ) : (
          /* ========================================================================= */
          /* CASE 2: DONATION CAMPAIGN FORM (ANY CAUSE / ITEM)                         */
          /* ========================================================================= */
          <>
            {/* Banner explaining Universal Donation */}
            <div className="p-3 text-xs">
              <span className="font-['Arimo:Bold'] font-bold text-[#1f8742] block">
                ✨ Universal Donation Campaign
              </span>
            </div>

            <EventField icon="d95ad.svg" label="Campaign Title">
              <input
                maxLength={80}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="Eg. Monsoon Warmth & Blanket Drive / School Kits"
                required
                value={campaignTitle}
              />
            </EventField>

            <EventField icon="c61e7.svg" label="Donation Cause & Category">
              <select
                onChange={(e) =>
                  setCampaignCategory(
                    e.target.value as ApiDonationCampaign["category"],
                  )
                }
                value={campaignCategory}
              >
                <option value="Clothes">👕 Clothes & Winter Warmth</option>
                <option value="Education">📚 Education & School Kits</option>
                <option value="Food">🍲 Food & Nutrition</option>
                <option value="Medical">🩺 Medical Aid & Health Kits</option>
                <option value="Animal Care">🐾 Animal Care & Shelter</option>
                <option value="Hygiene">💧 Hygiene & Clean Water</option>
                <option value="Emergency Relief">
                  🚨 Emergency Disaster Relief
                </option>
              </select>
            </EventField>

            <EventField icon="2e6fb.svg" label="Item / Kit Name to Sponsor">
              <input
                onChange={(e) => setDonationItem(e.target.value)}
                placeholder="Eg. Warm Blanket & Rainwear Kit / Backpack Set / Hot Thali"
                required
                value={donationItem}
              />
            </EventField>

            <div className="grid grid-cols-2 gap-3">
              <EventField icon="e38bd.svg" label="Cost per Unit (₹)">
                <input
                  min="1"
                  onChange={(e) => setUnitCost(e.target.value)}
                  placeholder="200"
                  required
                  type="number"
                  value={unitCost}
                />
              </EventField>

              <EventField icon="4d6bb.svg" label="Target Units Goal">
                <input
                  min="1"
                  onChange={(e) => setTargetUnits(e.target.value)}
                  placeholder="250"
                  required
                  type="number"
                  value={targetUnits}
                />
              </EventField>
            </div>

            {/* Live Calculated Goal Display */}
            <div className="rounded-xl border-2 border-[#18151d] bg-[#fbf7ff] p-3 text-xs">
              <div className="flex items-center justify-between font-['Arimo:Bold'] font-bold text-[#6f19d6]">
                <span>Total Fundraising Target:</span>
                <span className="text-sm">
                  {targetUnits} {donationItem || "Items"} × ₹{unitCost || 0} = ₹
                  {calculatedGoal.toLocaleString()}
                </span>
              </div>
            </div>

            <EventField icon="9d7cd.svg" label="Beneficiary Community">
              <input
                onChange={(e) => setBeneficiaryGroup(e.target.value)}
                placeholder="Eg. Malpe Coastal Fisherfolk Families / Govt School Children"
                required
                value={beneficiaryGroup}
              />
            </EventField>

            <EventField icon="2e6fb.svg" label="Campaign Story & Impact" large>
              <textarea
                maxLength={300}
                onChange={(e) => setCampaignDesc(e.target.value)}
                placeholder="Describe how items will be procured, who will receive them, and how live proof will be delivered..."
                required
                value={campaignDesc}
              />
              <small>{campaignDesc.length} / 300</small>
            </EventField>

            <EventField icon="bf5ca.svg" label="Target Location / Ward">
              <input
                onChange={(e) => setCampaignLocation(e.target.value)}
                placeholder="Eg. Malpe Beach Road, Udupi / Kadri Hills"
                required
                value={campaignLocation}
              />
            </EventField>
            <button
              className="event-map-toggle"
              onClick={() => setMapOpen((open) => !open)}
              type="button"
            >
              {mapOpen ? "Hide map" : "Select location on map"}
            </button>
            {mapOpen && (
              <MapPicker
                onLocationSelected={(loc) => setCampaignLocation(loc)}
              />
            )}

            <div>
              <p className="font-['Arimo:Bold'] text-[13px] font-bold">
                Campaign Cover Photo <b className="text-[#e13747]">*</b>
              </p>
              <div className="mt-[5px] flex items-center gap-4">
                <label className="event-upload">
                  <img alt="" src={asset("0cd3e.svg")} />
                  <b>{campaignFileName || "Upload Campaign Cover"}</b>
                  <small>JPG, PNG (Max 5 MB)</small>
                  <input
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={chooseImage}
                    type="file"
                  />
                </label>
                <div className="relative h-[76px] w-[77px] shrink-0 overflow-hidden rounded-xl">
                  {campaignImage ? (
                    <img
                      alt="Campaign cover preview"
                      className="h-full w-full object-cover"
                      src={campaignImage}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#fef3c7] text-2xl">
                      🎟️
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              className="event-submit bg-[#d8f23c] text-[#18151d] border-2 border-[#18151d] shadow-[3px_4px_0_#18151d] font-bold text-sm"
              disabled={saving}
              type="submit"
            >
              {saving ? "Launching..." : "Launch Donation Campaign ➔"}
            </button>
          </>
        )}
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
        <img alt="" src={asset(icon)} />
        {label}
        {optional && <i>(optional)</i>}
      </span>
      {children}
    </label>
  )
}

function GardenDecor() {
  return (
    <div aria-hidden="true" className="event-garden">
      <img alt="" className="garden-wave" src={asset("cea03.svg")} />
      <img alt="" className="garden-left-1" src={asset("3c411.svg")} />
      <img alt="" className="garden-left-2" src={asset("22810.svg")} />
      <img alt="" className="garden-left-3" src={asset("d469d.svg")} />
      <img alt="" className="garden-left-4" src={asset("bf6a7.svg")} />
      <img alt="" className="garden-right-1" src={asset("c5579.svg")} />
      <img alt="" className="garden-right-2" src={asset("fa39e.svg")} />
      <img alt="" className="garden-right-3" src={asset("a6790.svg")} />
    </div>
  )
}
