import { FormEvent, useRef, useState } from "react"
import GeoTagProof from "./GeoTagProof"
import MemoryReel from "./MemoryReel"
import DonationTracker from "./DonationTracker"
import PixelAdventureMap from "./PixelAdventureMap"
import PixelLeaderboard from "./PixelLeaderboard"
import SwipeDonation from "./SwipeDonation"
import CreateEvent from "./CreateEvent"
import EventVolunteers from "./EventVolunteers"
import TaskAssignments from "./TaskAssignments"
import MyEvents from "./MyEvents"
import HomeScreen from "./HomeScreen"
import NavigationIcon from "./NavigationIcon"
import {
  CreateEventInput,
  initialEvents,
  SevaEvent,
} from "./events"

type Screen = "login" | "register" | "home" | "tasks" | "arena" | "memories" | "profile" | "edit-profile" | "geo-proof" | "event-photos" | "swipe-donation" | "create-event" | "event-volunteers" | "task-assignments" | "donation-tracker" | "my-events"
type AppScreen = "home" | "tasks" | "arena" | "memories" | "profile" | "my-events"
type IconName = "arrow" | "award" | "back" | "bell" | "bolt" | "calendar" | "camera" | "chart" | "check" | "chevron" | "close" | "edit" | "eye" | "flame" | "heart" | "home" | "image" | "leaf" | "location" | "lock" | "mail" | "profile" | "settings" | "shield" | "spark" | "star" | "target" | "tasks" | "trophy" | "users"

type ProfileData = {
  name: string
  email: string
  location: string
  bio: string
  interests: string[]
}

type Task = {
  category: string
  title: string
  location: string
  description: string
  date: string
  time: string
  volunteers: string
  points: string
  days: string
  image: string
  createEvent?: boolean
}

const tasks: Task[] = [
  {
    category: "Environment",
    title: "Tree Plantation Drive",
    location: "Mangaluru, Karnataka",
    description:
      "Join our green initiative to plant trees and help create a cleaner, healthier environment for future generations.",
    date: "Sat, 12 Oct 2025",
    time: "9:00 AM – 12:00 PM",
    volunteers: "15",
    points: "50",
    days: "3 days left",
    image: "/assets/task-tree.jpg",
  },
  {
    category: "Clothes Drive",
    title: "Warm Clothes for Kids",
    location: "Udupi, Karnataka",
    description:
      "Help children in need with clean and comfortable clothes this season.",
    date: "Sat, 18 Oct 2025",
    time: "9:00 AM – 1:00 PM",
    volunteers: "85",
    points: "72",
    days: "Create event",
    image: "/assets/d7a6c.png",
    createEvent: true,
  },
  {
    category: "Community",
    title: "Community Garden Day",
    location: "Bengaluru, Karnataka",
    description:
      "Help neighbours prepare shared garden beds and grow fresh food for families across the community.",
    date: "Sun, 20 Oct 2025",
    time: "8:30 AM – 11:30 AM",
    volunteers: "24",
    points: "65",
    days: "6 days left",
    image: "/assets/task-garden.jpg",
  },
  {
    category: "Conservation",
    title: "Forest Care Weekend",
    location: "Coorg, Karnataka",
    description:
      "Work alongside local volunteers to restore native plants and care for a growing community forest.",
    date: "Sat, 2 Nov 2025",
    time: "10:00 AM – 2:00 PM",
    volunteers: "18",
    points: "80",
    days: "9 days left",
    image: "/assets/task-forest.jpg",
  },
]

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12-2 9 5.5-3 5.5 3-2-9" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    chart: <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    flame: (
      <path d="M12 22c4.4 0 8-3.4 8-7.7 0-3.1-1.7-5.9-5-8.3.1 2.8-1 4.7-2.6 5.6.3-4.5-2-7.5-5.1-9.6.2 3.9-3.3 6.4-3.3 11.7C4 18.3 7.6 22 12 22Z" />
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C12 4 6 8 6 14c0 3 2 5 5 5 6 0 9-7 9-15Z" />
        <path d="M4 21c2-5 6-9 12-12" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 15.5a2 2 0 0 0 .4 2.2l.1.1-2.7 2.7-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8v.2H9.5v-.2A2 2 0 0 0 8.3 20a2 2 0 0 0-2.2.4l-.1.1-2.7-2.7.1-.1a2 2 0 0 0 .4-2.2A2 2 0 0 0 2 14.3v-3.8A2 2 0 0 0 3.8 9a2 2 0 0 0-.4-2.2l-.1-.1L6 4l.1.1a2 2 0 0 0 2.2.4A2 2 0 0 0 9.5 2.7v-.2h3.8v.2a2 2 0 0 0 1.2 1.8 2 2 0 0 0 2.2-.4l.1-.1 2.7 2.7-.1.1A2 2 0 0 0 19 9a2 2 0 0 0 1.8 1.2v3.8A2 2 0 0 0 19 15.5Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    spark: (
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    ),
    star: (
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    ),
    tasks: (
      <>
        <rect x="3" y="4" width="7" height="8" rx="1.5" />
        <rect x="14" y="4" width="7" height="8" rx="1.5" />
        <rect x="6" y="12" width="7" height="8" rx="1.5" />
        <rect x="15" y="12" width="6" height="8" rx="1.5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM10 17h4M12 13v4M8 20h8" />
        <path d="M8 6H4v2a4 4 0 0 0 5 4M16 6h4v2a4 4 0 0 1-5 4" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <button
      className={`font-outfit-extrabold relative text-[30px] leading-none tracking-[-1.3px] ${
        inverse ? "text-white" : "text-[#111]"
      }`}
      onClick={() => window.location.reload()}
      type="button"
    >
      Seva
      <span className={inverse ? "text-[#d8f23c]" : "text-[#8d24e8]"}>
        Sathi
      </span>
      <span className="absolute -right-5 -top-3 rotate-[-22deg] text-[22px] text-[#6f19d6]">
        ••
      </span>
    </button>
  )
}

function AuthScreen({
  mode,
  onChangeMode,
  onSuccess,
}: {
  mode: "login" | "register"
  onChangeMode: () => void
  onSuccess: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isRegister = mode === "register"

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSuccess()
  }

  return (
    <main className="auth-shell min-h-dvh bg-[#f8f4ff] p-3 text-[#18151d] sm:p-6">
      <div className="mx-auto grid min-h-[calc(100dvh-24px)] max-w-[1120px] overflow-hidden rounded-[28px] border-[2.5px] border-[#18151d] bg-white shadow-[8px_10px_0_#18151d] md:min-h-[calc(100dvh-48px)] md:grid-cols-[0.9fr_1.1fr]">
        <aside className="auth-art relative hidden overflow-hidden bg-[#7c28df] p-12 text-white md:flex md:flex-col md:justify-between">
          <Logo inverse />
          <div className="relative z-10">
            <span className="font-outfit-semibold mb-4 inline-flex rounded-full border-2 border-white/50 bg-white/15 px-4 py-2 text-sm">
              Small actions. Big impact.
            </span>
            <h1 className="font-outfit-extrabold max-w-[420px] text-[54px] leading-[0.98] tracking-[-2px]">
              Your next good deed starts here.
            </h1>
            <p className="font-outfit-regular mt-5 max-w-[390px] text-lg leading-relaxed text-white/80">
              Find meaningful volunteer tasks, meet your community, and watch
              your impact grow.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {["SK", "AM", "RT"].map((initials, index) => (
                <span
                  className={`font-outfit-bold flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#7c28df] text-sm text-[#18151d] ${
                    ["bg-[#d8f23c]", "bg-[#f38af5]", "bg-[#72dfd0]"][index]
                  }`}
                  key={initials}
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="font-outfit-semibold text-sm leading-tight">
              Join 10,000+
              <br />
              active volunteers
            </p>
          </div>
          <span className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#d8f23c]" />
          <span className="absolute right-20 top-16 h-20 w-20 rotate-12 rounded-[24px] border-[3px] border-[#18151d] bg-[#f38af5]" />
        </aside>

        <section className="flex items-center justify-center px-5 py-9 sm:px-12 md:px-16">
          <div className="w-full max-w-[460px]">
            <div className="mb-10 flex items-center justify-between md:hidden">
              <Logo />
              <button
                className="font-outfit-semibold text-sm text-[#7020d4]"
                onClick={() => onSuccess()}
                type="button"
              >
                View demo
              </button>
            </div>
            <p className="font-outfit-semibold mb-2 text-sm uppercase tracking-[0.18em] text-[#7c28df]">
              {isRegister ? "Join the movement" : "Welcome back"}
            </p>
            <h2 className="font-outfit-extrabold text-[38px] leading-tight tracking-[-1.2px] sm:text-[46px]">
              {isRegister ? "Create your account" : "Sign in to SevaSathi"}
            </h2>
            <p className="font-outfit-regular mt-3 text-[16px] text-[#686171]">
              {isRegister
                ? "Start discovering volunteer opportunities near you."
                : "Continue making a difference in your community."}
            </p>

            <form className="mt-8 flex flex-col gap-4" onSubmit={submit}>
              {isRegister && (
                <label className="auth-field">
                  <span>Full name</span>
                  <div>
                    <Icon name="profile" />
                    <input
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                      type="text"
                    />
                  </div>
                </label>
              )}
              <label className="auth-field">
                <span>Email address</span>
                <div>
                  <Icon name="mail" />
                  <input
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>
              </label>
              <label className="auth-field">
                <span>Password</span>
                <div>
                  <Icon name="lock" />
                  <input
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    minLength={6}
                    placeholder="At least 6 characters"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-[#6c6472]"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    <Icon name="eye" />
                  </button>
                </div>
              </label>
              {isRegister ? (
                <label className="font-outfit-regular flex items-start gap-3 text-sm leading-relaxed text-[#625c68]">
                  <input
                    className="mt-1 accent-[#7c28df]"
                    required
                    type="checkbox"
                  />
                  <span>
                    I agree to the Terms of Service and Privacy Policy.
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <label className="font-outfit-regular flex items-center gap-2 text-[#625c68]">
                    <input className="accent-[#7c28df]" type="checkbox" />
                    Remember me
                  </label>
                  <button
                    className="font-outfit-semibold text-[#7020d4]"
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button className="primary-auth-button" type="submit">
                {isRegister ? "Create account" : "Sign in"}
                <Icon name="arrow" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-sm text-[#8c8590]">
              <span className="h-px flex-1 bg-[#ded8e5]" />
              or continue with
              <span className="h-px flex-1 bg-[#ded8e5]" />
            </div>
            <button
              className="font-outfit-semibold flex h-[52px] w-full items-center justify-center gap-3 rounded-[13px] border-2 border-[#d8d1df] bg-white transition hover:border-[#7c28df] hover:bg-[#faf7ff]"
              onClick={onSuccess}
              type="button"
            >
              <span className="font-outfit-extrabold text-xl text-[#4285f4]">
                G
              </span>
              Google
            </button>
            <p className="font-outfit-regular mt-7 text-center text-[15px] text-[#686171]">
              {isRegister ? "Already have an account?" : "New to SevaSathi?"}{" "}
              <button
                className="font-outfit-bold text-[#7020d4] underline decoration-2 underline-offset-4"
                onClick={onChangeMode}
                type="button"
              >
                {isRegister ? "Sign in" : "Create an account"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

function TaskCard({
  task,
  className = "",
  onOpenProof,
  onSkip,
  onInterest,
  onTrack,
}: {
  task: Task
  className?: string
  onOpenProof?: () => void
  onSkip?: () => void
  onInterest?: () => void
  onTrack?: () => void
}) {
  return (
    <article
      className={`task-card touch-pan-y ${task.createEvent ? "cursor-pointer" : ""} ${className}`}
      onClick={task.createEvent ? onTrack : undefined}
      onKeyDown={
        task.createEvent
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onTrack?.()
              }
            }
          : undefined
      }
      role={task.createEvent ? "button" : undefined}
      tabIndex={task.createEvent ? 0 : undefined}
    >
      <div className="relative h-[208px] overflow-hidden rounded-t-[26px] sm:h-[250px]">
        <img
          alt="Gloved volunteers planting a young tree"
          className="h-full w-full object-cover"
          draggable={false}
          src={task.image}
        />
        <span className="font-outfit-semibold absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#f08be9] px-4 py-2 text-[15px] shadow-sm">
          <Icon className="h-4 w-4" name="leaf" />
          {task.category}
        </span>
        <div className="absolute right-5 top-5 flex gap-2">
          <button
            aria-label="Show interest"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#14a77f] shadow-md transition hover:scale-105"
            onClick={(event) => {
              event.stopPropagation()
              onInterest?.()
            }}
            type="button"
          >
            <Icon className="h-5 w-5 fill-current" name="heart" />
          </button>
        </div>
      </div>
      <div className="px-5 pb-5 pt-5 sm:px-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-outfit-extrabold text-[28px] leading-tight tracking-[-0.6px] sm:text-[32px]">
            {task.title}
          </h3>
          <span className="font-outfit-semibold shrink-0 rotate-[-3deg] rounded-lg bg-[#ffd8ef] px-3 py-2 text-sm text-[#8e246d]">
            {task.days}
          </span>
        </div>
        <p className="font-outfit-semibold mt-2 flex items-center gap-2 text-[16px]">
          <Icon className="h-5 w-5 text-[#8c23df]" name="location" />
          {task.location}
        </p>
        <p className="font-outfit-regular mt-4 text-[15px] leading-[1.45] text-[#5f5964] sm:text-[17px]">
          {task.description}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="task-detail">
            <Icon name="calendar" />
            <span>
              <strong>{task.date}</strong>
              {task.time}
            </span>
          </div>
          <div className="task-detail">
            <Icon name="users" />
            <span>
              <strong>{task.volunteers}</strong>
              Volunteers
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-outfit-semibold flex items-center gap-2 rounded-lg bg-[#efffdc] px-3 py-2 text-sm sm:text-[15px]">
            <Icon className="h-5 w-5 text-[#2f9c58]" name="leaf" />
            Earn {task.points} Impact Points
          </span>
          <button
            className="font-outfit-bold flex items-center gap-1 whitespace-nowrap text-[#8c23df]"
            onClick={onOpenProof}
            type="button"
          >
            View Details <Icon className="h-4 w-4" name="arrow" />
          </button>
        </div>
      </div>
    </article>
  )
}

const navItems = [
  { icon: "home" as const, label: "Home" },
  { icon: "tasks" as const, label: "Tasks" },
  { icon: "calendar" as const, label: "My Events" },
  { icon: "image" as const, label: "Memories" },
  { icon: "profile" as const, label: "Profile" },
]

function BottomNav({
  active,
  onNavigate,
}: {
  active: "Home" | "Tasks" | "Arena" | "Memories" | "Profile" | "My Events"
  onNavigate: (screen: AppScreen) => void
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto grid h-[88px] max-w-[760px] grid-cols-5 rounded-t-[32px] border-x-2 border-t-2 border-[#e3dce8] bg-white px-2 shadow-[0_-8px_30px_rgba(84,36,119,0.10)]"
    >
      {navItems.map((item) => (
        <button
          className={`bottom-nav-item ${item.label === active ? "active" : ""}`}
          key={item.label}
          onClick={() => {
            if (item.label === "Home") onNavigate("home")
            if (item.label === "Tasks") onNavigate("tasks")
            if (item.label === "My Events") onNavigate("my-events")
            if (item.label === "Memories") onNavigate("memories")
            if (item.label === "Profile") onNavigate("profile")
          }}
          type="button"
        >
          <NavigationIcon className="h-6 w-6" name={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function TasksScreen({
  onLogout,
  onNavigate,
  onOpenProof,
  onTrack,
}: {
  onLogout: () => void
  onNavigate: (screen: AppScreen) => void
  onOpenProof: () => void
  onTrack: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [notice, setNotice] = useState("")
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const suppressClick = useRef(false)

  function swipe(nextDirection: "left" | "right") {
    if (direction) return
    setDirection(nextDirection)
    setNotice(
      nextDirection === "right"
        ? "Task added to your interests"
        : "Task skipped",
    )
    window.setTimeout(() => {
      setCurrent((index) => (index + 1) % tasks.length)
      setDirection(null)
      window.setTimeout(() => setNotice(""), 1300)
    }, 350)
  }

  const task = tasks[current]
  const nextTask = tasks[(current + 1) % tasks.length]

  return (
    <main className="task-page min-h-dvh overflow-hidden bg-[#f7efff] pb-[104px] text-[#18151d]">
      <header className="mx-auto flex w-full max-w-[1100px] items-start justify-between gap-3 px-5 py-5 sm:items-center sm:px-8 sm:py-6">
        <h1 className="font-outfit-extrabold max-w-[220px] text-[26px] leading-[0.98] tracking-[-1.2px] sm:max-w-none sm:text-[36px]">
          Swipe Tasks.
          <span className="relative z-0 mt-1 block w-fit px-1.5 sm:mt-0 sm:ml-2 sm:inline-block">
            <span className="absolute inset-x-0 bottom-0 -z-10 h-[82%] -rotate-2 rounded-lg border-2 border-[#18151d] bg-[#d8f23c]" />
            Create Impact.
          </span>
        </h1>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
            type="button"
          >
            <Icon className="h-6 w-6" name="bell" />
            <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff3d56]" />
          </button>
          <button
            aria-label="Log out"
            className="font-outfit-bold flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#d8f23c] text-sm"
            onClick={onLogout}
            title="Log out"
            type="button"
          >
            AS
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="relative mx-auto max-w-[710px] pt-7">
          <div className="task-card task-card-back absolute inset-x-6 top-1 rotate-[5deg] opacity-70">
            <div className="h-[320px] overflow-hidden rounded-[26px]">
              <img
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
                src={nextTask.image}
              />
            </div>
          </div>
          <div
            className={`relative z-10 transition duration-300 ${
              direction === "left"
                ? "-translate-x-[120%] -rotate-12 opacity-0"
                : ""
            } ${
              direction === "right"
                ? "translate-x-[120%] rotate-12 opacity-0"
                : ""
            }`}
            onPointerCancel={() => {
              swipeStart.current = null
            }}
            onPointerDown={(event) => {
              if (
                direction ||
                (event.target instanceof Element &&
                  event.target.closest("button"))
              ) {
                return
              }
              swipeStart.current = { x: event.clientX, y: event.clientY }
            }}
            onPointerUp={(event) => {
              const start = swipeStart.current
              swipeStart.current = null
              if (!start) return
              const distanceX = event.clientX - start.x
              const distanceY = event.clientY - start.y
              if (
                Math.abs(distanceX) >= 70 &&
                Math.abs(distanceX) > Math.abs(distanceY)
              ) {
                suppressClick.current = true
                swipe(distanceX < 0 ? "left" : "right")
                window.setTimeout(() => {
                  suppressClick.current = false
                }, 0)
              }
            }}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const isRight = event.clientX - rect.left > rect.width / 2
              swipe(isRight ? "right" : "left")
            }}
            onClickCapture={(event) => {
              if (!suppressClick.current) return
              suppressClick.current = false
              event.preventDefault()
              event.stopPropagation()
            }}
          >
            <TaskCard
              onInterest={() => swipe("right")}
              onOpenProof={onOpenProof}
              onSkip={() => swipe("left")}
              onTrack={onTrack}
              task={task}
            />
          </div>
        </div>
      </section>

      {notice && (
        <div
          className="font-outfit-semibold fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-[#18151d] bg-white px-5 py-3 shadow-[4px_5px_0_#18151d]"
          role="status"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d8f23c]">
            <Icon name="check" />
          </span>
          {notice}
        </div>
      )}

      <BottomNav active="Tasks" onNavigate={onNavigate} />
    </main>
  )
}

function ProfileScreen({
  profile,
  onEdit,
  onLogout,
  onNavigate,
}: {
  profile: ProfileData
  onEdit: () => void
  onLogout: () => void
  onNavigate: (screen: AppScreen) => void
}) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const impactBars = [
    "h-[42px]",
    "h-[68px]",
    "h-[51px]",
    "h-[84px]",
    "h-[64px]",
    "h-[94px]",
    "h-[76px]",
  ]

  return (
    <main className="profile-page min-h-dvh pb-[112px] text-[#18151d]">
      <header className="mx-auto flex w-full max-w-[980px] items-center justify-between px-5 py-6 sm:px-8">
        <Logo />
        <button
          aria-expanded={settingsOpen}
          aria-label="Profile settings"
          className="profile-icon-button"
          onClick={() => setSettingsOpen((open) => !open)}
          type="button"
        >
          <Icon className="h-6 w-6" name="settings" />
        </button>
      </header>

      <section className="mx-auto w-full max-w-[980px] px-5 sm:px-8">
        {settingsOpen && (
          <div className="font-outfit-semibold ml-auto mb-4 flex max-w-[280px] flex-col rounded-[18px] border-2 border-[#18151d] bg-white p-2 shadow-[5px_6px_0_#18151d]">
            <button
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#eee0ff]"
              onClick={onEdit}
              type="button"
            >
              <Icon name="edit" /> Edit profile
            </button>
            <button
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[#d9384e] hover:bg-[#fff0f3]"
              onClick={onLogout}
              type="button"
            >
              <Icon name="close" /> Sign out
            </button>
          </div>
        )}

        <div className="profile-hero">
          <div className="relative shrink-0">
            <div className="font-outfit-extrabold flex h-28 w-28 items-center justify-center rounded-[34px] border-[3px] border-[#18151d] bg-[#d8f23c] text-[38px] shadow-[6px_7px_0_#18151d] sm:h-36 sm:w-36 sm:text-[48px]">
              AS
            </div>
            <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#f08be9]">
              <Icon className="h-5 w-5" name="spark" />
            </span>
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <span className="font-outfit-semibold inline-flex rounded-full bg-[#eee0ff] px-3 py-1 text-sm text-[#7c28df]">
              Community Champion
            </span>
            <h1 className="font-outfit-extrabold mt-3 text-[38px] leading-none tracking-[-1.2px] sm:text-[50px]">
              {profile.name}
            </h1>
            <p className="font-outfit-semibold mt-3 flex items-center justify-center gap-2 text-[#625c68] sm:justify-start">
              <Icon className="h-5 w-5 text-[#8c23df]" name="location" />
              {profile.location}
            </p>
            <p className="font-outfit-regular mt-4 max-w-[560px] leading-relaxed text-[#625c68]">
              {profile.bio}
            </p>
          </div>
          <button
            className="profile-edit-button"
            onClick={onEdit}
            type="button"
          >
            <Icon className="h-5 w-5" name="edit" />
            Edit profile
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { value: "126", label: "Hours", color: "bg-[#d8f23c]" },
            { value: "18", label: "Events", color: "bg-[#f08be9]" },
            { value: "1.2K", label: "Points", color: "bg-[#72dfd0]" },
          ].map((stat) => (
            <div className={`profile-stat ${stat.color}`} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <section className="profile-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-outfit-semibold text-sm uppercase tracking-[0.14em] text-[#7c28df]">
                  Your progress
                </p>
                <h2 className="font-outfit-extrabold mt-1 text-[27px]">
                  Impact this month
                </h2>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee0ff] text-[#7c28df]">
                <Icon name="chart" />
              </span>
            </div>
            <div className="mt-7 flex h-[116px] items-end gap-3">
              {impactBars.map((height, index) => (
                <div
                  className="flex flex-1 flex-col items-center gap-2"
                  key={`${height}-${index}`}
                >
                  <span
                    className={`impact-bar ${height} ${
                      index === 5 ? "bg-[#8c23df]" : "bg-[#dec6f7]"
                    }`}
                  />
                  <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f7f2fb] p-4">
              <div>
                <strong className="font-outfit-bold block text-lg">
                  32 hours
                </strong>
                <span className="font-outfit-regular text-sm text-[#6c6570]">
                  8 more than last month
                </span>
              </div>
              <span className="font-outfit-bold rounded-full bg-[#d8f23c] px-3 py-1 text-sm">
                +24%
              </span>
            </div>
          </section>

          <section className="profile-panel">
            <p className="font-outfit-semibold text-sm uppercase tracking-[0.14em] text-[#7c28df]">
              Latest badge
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border-2 border-[#18151d] bg-[#ffd786] shadow-[4px_5px_0_#18151d]">
                <Icon className="h-10 w-10 text-[#9e6400]" name="award" />
              </span>
              <div>
                <h2 className="font-outfit-extrabold text-[23px]">
                  Earth Keeper
                </h2>
                <p className="font-outfit-regular mt-1 text-sm leading-relaxed text-[#6c6570]">
                  Completed five environment-focused events.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="font-outfit-semibold mb-2 flex justify-between text-sm">
                <span>Next level</span>
                <span>780 / 1,000</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#eee8f1]">
                <div className="h-full w-[78%] rounded-full bg-[#14c99a]" />
              </div>
            </div>
          </section>
        </div>

        <section className="profile-panel mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-outfit-semibold text-sm uppercase tracking-[0.14em] text-[#7c28df]">
                Causes you care about
              </p>
              <h2 className="font-outfit-extrabold mt-1 text-[27px]">
                Your interests
              </h2>
            </div>
            <button
              className="font-outfit-bold text-sm text-[#7c28df]"
              onClick={onEdit}
              type="button"
            >
              Manage
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {profile.interests.map((interest, index) => (
              <span
                className={`font-outfit-semibold flex items-center gap-2 rounded-full border-2 border-[#18151d] px-4 py-2 text-sm ${
                  [
                    "bg-[#d8f23c]",
                    "bg-[#f08be9]",
                    "bg-[#72dfd0]",
                    "bg-[#a9d7ff]",
                  ][index % 4]
                }`}
                key={interest}
              >
                <Icon
                  className="h-4 w-4"
                  name={index === 1 ? "users" : "leaf"}
                />
                {interest}
              </span>
            ))}
          </div>
        </section>
      </section>

      <BottomNav active="Profile" onNavigate={onNavigate} />
    </main>
  )
}

function ArenaScreen({
  profile: _profile,
  onNavigate,
}: {
  profile: ProfileData
  onNavigate: (screen: AppScreen) => void
}) {
  const [arenaView, setArenaView] = useState<"map" | "leaderboard">("map")
  const [showReward, setShowReward] = useState(false)
  const [rewardClaimed, setRewardClaimed] = useState(false)
  const stageRef = useRef<HTMLElement | null>(null)
  const [canvasScale, setCanvasScale] = useState<number | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const compute = () => {
      if (window.innerWidth >= 768) {
        setCanvasScale(null)
        return
      }
      const base = arenaView === "leaderboard" ? 928 : 640
      const availableHeight = window.innerHeight - 88
      setCanvasScale(Math.min(stage.clientWidth / 390, availableHeight / base))
    }
    compute()
    const observer = new ResizeObserver(compute)
    observer.observe(stage)
    window.addEventListener("resize", compute)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", compute)
    }
  }, [arenaView])

  function changeArenaView(view: "map" | "leaderboard") {
    setArenaView(view)
    setShowReward(false)
  }

  return (
    <main
      className={`arena-pixel-page min-h-dvh pb-[88px] ${
        arenaView === "leaderboard" ? "is-leaderboard" : ""
      }`}
    >
      <section
        ref={stageRef}
        aria-label={
          arenaView === "map" ? "Adventure level map" : "Level 6 leaderboard"
        }
        className={`pixel-art-stage ${
          arenaView === "leaderboard"
            ? "pixel-art-stage-leaderboard"
            : "pixel-art-stage-map"
        } md:!h-[calc(100dvh-88px)] md:!min-h-0 md:[&_.pixel-art-canvas-map]:![transform:translate(-50%,-50%)_scale(1.03)] [@media(min-width:768px)_and_(min-height:800px)]:[&_.pixel-art-canvas-map]:![transform:translate(-50%,-50%)_scale(1.1)] [@media(min-width:768px)_and_(min-height:900px)]:[&_.pixel-art-canvas-map]:![transform:translate(-50%,-50%)_scale(1.25)] [@media(min-width:768px)_and_(min-height:1000px)]:[&_.pixel-art-canvas-map]:![transform:translate(-50%,-50%)_scale(1.4)]`}
        style={
          canvasScale !== null
            ? { height: (arenaView === "leaderboard" ? 928 : 640) * canvasScale }
            : undefined
        }
      >
        <div className="arena-view-toggle" aria-label="Arena view">
          <button
            aria-pressed={arenaView === "map"}
            className={arenaView === "map" ? "active" : ""}
            onClick={() => changeArenaView("map")}
            type="button"
          >
            Map
          </button>
          <button
            aria-pressed={arenaView === "leaderboard"}
            className={arenaView === "leaderboard" ? "active" : ""}
            onClick={() => changeArenaView("leaderboard")}
            type="button"
          >
            Leaderboard
          </button>
        </div>

        {arenaView === "map" ? (
          <>
            <div
              className="pixel-art-canvas pixel-art-canvas-map"
              style={
                canvasScale !== null
                  ? { transform: `translateX(-50%) scale(${canvasScale})`, height: 640 * canvasScale }
                  : undefined
              }
            >
              <PixelAdventureMap
                onLevelSix={() => setShowReward(true)}
                rewardClaimed={rewardClaimed}
              />
            </div>
            {showReward && (
              <div
                aria-label="Level 6 reward"
                aria-modal="true"
                className="arena-reward-card"
                role="dialog"
              >
                <button
                  aria-label="Close reward"
                  className="arena-reward-close"
                  onClick={() => setShowReward(false)}
                  type="button"
                >
                  <Icon className="h-4 w-4" name="close" />
                </button>
                <span className="arena-reward-star">
                  <Icon className="h-7 w-7" name="spark" />
                </span>
                <p className="arena-reward-kicker">Level 6 reached</p>
                <h2>
                  {rewardClaimed ? "Reward claimed!" : "Claim your reward"}
                </h2>
                <p className="arena-reward-copy">
                  {rewardClaimed
                    ? "Your 250 XP has been added. Check how you rank against other volunteers."
                    : "You completed the level. Collect your bonus XP before continuing the adventure."}
                </p>
                <button
                  className="arena-reward-action"
                  onClick={() => {
                    if (rewardClaimed) {
                      changeArenaView("leaderboard")
                    } else {
                      setRewardClaimed(true)
                    }
                  }}
                  type="button"
                >
                  {rewardClaimed ? (
                    <>
                      View leaderboard
                      <Icon className="h-4 w-4" name="arrow" />
                    </>
                  ) : (
                    <>
                      <Icon className="h-4 w-4" name="star" />
                      Claim 250 XP
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className="pixel-art-canvas pixel-art-canvas-leaderboard"
            style={
              canvasScale !== null
                ? { transform: `translateX(-50%) scale(${canvasScale})`, height: 928 * canvasScale }
                : undefined
            }
          >
            <PixelLeaderboard />
          </div>
        )}
      </section>

      <BottomNav active="Arena" onNavigate={onNavigate} />
    </main>
  )
}

function EditProfileScreen({
  profile,
  onCancel,
  onSave,
}: {
  profile: ProfileData
  onCancel: () => void
  onSave: (profile: ProfileData) => void
}) {
  const [draft, setDraft] = useState(profile)
  const interestOptions = [
    "Environment",
    "Education",
    "Community",
    "Animal Care",
    "Health",
  ]

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(draft)
  }

  function toggleInterest(interest: string) {
    setDraft((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
  }

  return (
    <main className="profile-page min-h-dvh px-5 py-6 text-[#18151d] sm:px-8">
      <div className="mx-auto max-w-[760px]">
        <header className="flex items-center justify-between">
          <button
            aria-label="Back to profile"
            className="profile-icon-button"
            onClick={onCancel}
            type="button"
          >
            <Icon className="h-6 w-6" name="back" />
          </button>
          <Logo />
          <span className="h-12 w-12" />
        </header>

        <section className="profile-panel mt-8">
          <p className="font-outfit-semibold text-sm uppercase tracking-[0.14em] text-[#7c28df]">
            Your profile
          </p>
          <h1 className="font-outfit-extrabold mt-1 text-[36px] tracking-[-1px] sm:text-[44px]">
            Edit your details
          </h1>
          <p className="font-outfit-regular mt-2 text-[#686171]">
            Keep your volunteer profile fresh and personal.
          </p>

          <div className="my-8 flex items-center gap-5">
            <div className="font-outfit-extrabold flex h-24 w-24 items-center justify-center rounded-[30px] border-[3px] border-[#18151d] bg-[#d8f23c] text-[32px] shadow-[5px_6px_0_#18151d]">
              AS
            </div>
            <button className="profile-edit-button" type="button">
              <Icon className="h-5 w-5" name="camera" />
              Change photo
            </button>
          </div>

          <form className="grid gap-5" onSubmit={submit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="auth-field">
                <span>Full name</span>
                <div>
                  <Icon name="profile" />
                  <input
                    onChange={(event) =>
                      setDraft({ ...draft, name: event.target.value })
                    }
                    required
                    type="text"
                    value={draft.name}
                  />
                </div>
              </label>
              <label className="auth-field">
                <span>Email address</span>
                <div>
                  <Icon name="mail" />
                  <input
                    onChange={(event) =>
                      setDraft({ ...draft, email: event.target.value })
                    }
                    required
                    type="email"
                    value={draft.email}
                  />
                </div>
              </label>
            </div>
            <label className="auth-field">
              <span>Location</span>
              <div>
                <Icon name="location" />
                <input
                  onChange={(event) =>
                    setDraft({ ...draft, location: event.target.value })
                  }
                  required
                  type="text"
                  value={draft.location}
                />
              </div>
            </label>
            <label className="font-outfit-semibold flex flex-col gap-2 text-sm">
              About you
              <textarea
                className="font-outfit-regular min-h-28 resize-none rounded-[13px] border-2 border-[#ded8e5] p-4 text-base outline-none transition focus:border-[#7c28df] focus:ring-3 focus:ring-[#7c28df]/10"
                maxLength={180}
                onChange={(event) =>
                  setDraft({ ...draft, bio: event.target.value })
                }
                value={draft.bio}
              />
              <span className="font-outfit-regular self-end text-xs text-[#8c8590]">
                {draft.bio.length}/180
              </span>
            </label>
            <fieldset>
              <legend className="font-outfit-semibold text-sm">
                Interests
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const selected = draft.interests.includes(interest)
                  return (
                    <button
                      className={`font-outfit-semibold rounded-full border-2 px-4 py-2 text-sm transition ${
                        selected
                          ? "border-[#18151d] bg-[#d8f23c] shadow-[2px_3px_0_#18151d]"
                          : "border-[#ded8e5] bg-white text-[#686171]"
                      }`}
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      type="button"
                    >
                      {selected && (
                        <Icon className="mr-1 inline h-4 w-4" name="check" />
                      )}
                      {interest}
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <button
                className="font-outfit-bold h-14 rounded-[13px] border-2 border-[#18151d] bg-white"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </button>
              <button className="primary-auth-button mt-0" type="submit">
                Save changes
                <Icon name="check" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [events, setEvents] = useState<SevaEvent[]>(initialEvents)
  const [selectedEventId, setSelectedEventId] = useState(
    "organizing-tree-drive",
  )
  const [createOrigin, setCreateOrigin] = useState<
    "swipe-donation" | "my-events" | "tasks"
  >("swipe-donation")
  const [proofOrigin, setProofOrigin] = useState<
    "home" | "tasks" | "my-events"
  >("tasks")
  const [donationOrigin, setDonationOrigin] = useState<
    "swipe-donation" | "tasks"
  >("tasks")
  const [profile, setProfile] = useState<ProfileData>({
    name: "Aarav Sharma",
    email: "aarav@example.com",
    location: "Mangaluru, Karnataka",
    bio: "Weekend volunteer, nature lover, and believer in the power of small actions to create lasting change.",
    interests: ["Environment", "Community", "Education"],
  })

  function navigateApp(destination: AppScreen) {
    setScreen(destination)
  }

  if (screen === "donation-tracker") {
    return <DonationTracker onBack={() => setScreen(donationOrigin)} />
  }

  if (screen === "swipe-donation") {
    return (
      <SwipeDonation
        onBack={() => setScreen("home")}
        onCreate={() => {
          setCreateOrigin("swipe-donation")
          setScreen("create-event")
        }}
        onTrack={() => {
          setDonationOrigin("swipe-donation")
          setScreen("donation-tracker")
        }}
      />
    )
  }

  if (screen === "home") {
    return (
      <HomeScreen
        onNavigate={(destination) => setScreen(destination)}
        onVerify={() => {
          setProofOrigin("home")
          setScreen("geo-proof")
        }}
      />
    )
  }

  if (screen === "create-event") {
    return (
      <CreateEvent
        onBack={() => setScreen(createOrigin)}
        onCreated={(createdEvent: CreateEventInput) => {
          const id = `created-event-${Date.now()}`
          const nextEvent: SevaEvent = {
            ...createdEvent,
            id,
            role: "organizing",
            status: "Upcoming",
            organizer: profile.name,
            volunteers: 0,
            tasks: 0,
          }
          setEvents((current) => [nextEvent, ...current])
          setSelectedEventId(id)
          setScreen("event-volunteers")
        }}
      />
    )
  }

  if (screen === "event-volunteers") {
    const selectedEvent =
      events.find((event) => event.id === selectedEventId) ??
      events.find((event) => event.role === "organizing")!
    return (
      <EventVolunteers
        event={selectedEvent}
        onAssignments={() => setScreen("task-assignments")}
        onBack={() => setScreen("my-events")}
        onPhotos={() => setScreen("event-photos")}
      />
    )
  }

  if (screen === "task-assignments") {
    const selectedEvent =
      events.find((event) => event.id === selectedEventId) ??
      events.find((event) => event.role === "organizing")!
    return (
      <TaskAssignments
        event={selectedEvent}
        onBack={() => setScreen("my-events")}
        onPhotos={() => setScreen("event-photos")}
        onVolunteers={() => setScreen("event-volunteers")}
      />
    )
  }

  if (screen === "my-events") {
    return (
      <MyEvents
        events={events}
        onCreate={() => {
          setCreateOrigin("my-events")
          setScreen("create-event")
        }}
        onManage={(event) => {
          setSelectedEventId(event.id)
          setScreen("event-volunteers")
        }}
        onNavigate={navigateApp}
        onProof={() => {
          setProofOrigin("my-events")
          setScreen("geo-proof")
        }}
        onTasks={(event) => {
          setSelectedEventId(event.id)
          setScreen("task-assignments")
        }}
      />
    )
  }

  if (screen === "tasks") {
    return (
      <TasksScreen
        onLogout={() => setScreen("login")}
        onNavigate={navigateApp}
        onOpenProof={() => {
          setProofOrigin("tasks")
          setScreen("geo-proof")
        }}
        onTrack={() => {
          setDonationOrigin("tasks")
          setScreen("donation-tracker")
        }}
      />
    )
  }

  if (screen === "profile") {
    return (
      <ProfileScreen
        onEdit={() => setScreen("edit-profile")}
        onLogout={() => setScreen("login")}
        onNavigate={navigateApp}
        profile={profile}
      />
    )
  }

  if (screen === "arena") {
    return (
      <ArenaScreen
        onNavigate={navigateApp}
        profile={profile}
      />
    )
  }

  if (screen === "memories") {
    return <MemoryReel onNavigate={navigateApp} />
  }

  if (screen === "edit-profile") {
    return (
      <EditProfileScreen
        onCancel={() => setScreen("profile")}
        onSave={(updatedProfile) => {
          setProfile(updatedProfile)
          setScreen("profile")
        }}
        profile={profile}
      />
    )
  }

  if (screen === "geo-proof") {
    return <GeoTagProof onBack={() => setScreen(proofOrigin)} />
  }

  if (screen === "event-photos") {
    return <GeoTagProof onBack={() => setScreen("event-volunteers")} />
  }

  return (
    <AuthScreen
      mode={screen}
      onChangeMode={() => setScreen(screen === "login" ? "register" : "login")}
      onSuccess={() => setScreen("tasks")}
    />
  )
}
