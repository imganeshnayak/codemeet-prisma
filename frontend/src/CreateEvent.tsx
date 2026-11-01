import { ChangeEvent, FormEvent, useState } from "react"
import { CreateEventInput } from "./events"

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

export default function CreateEvent({
  onBack,
  onCreated,
}: {
  onBack: () => void
  onCreated: (event: CreateEventInput) => void
}) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")

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

  function submit(event: FormEvent<HTMLFormElement>) {
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

    onCreated({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      skills: form.skills.trim(),
      capacity,
    })
  }

  return (
    <main className="create-event-page">
      <section className="relative z-10 h-[85px] px-[25px]">
        <div className="flex items-start gap-3">
          <button
            aria-label="Go back"
            className="mt-[-3px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d5c9e1] bg-white text-[#18151d] shadow-sm transition hover:bg-[#f7efff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9036cd]"
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
              Create Event
            </h1>
            <p className="mt-1 w-[245px] font-['Arimo:Regular'] text-[12px] leading-[1.25]">
              Organize a meaningful event and bring
              <br />
              volunteers together for a real impact.
            </p>
          </div>
        </div>
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
        <button className="event-submit" type="submit">
          <img alt="" src={asset("2a937.svg")} />
          Create Event
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
