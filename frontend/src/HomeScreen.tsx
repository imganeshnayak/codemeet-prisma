import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import NavigationIcon from "./NavigationIcon"

type Destination =
  | "home"
  | "tasks"
  | "arena"
  | "my-events"
  | "memories"
  | "profile"

type IconName = "bell" | "bookmark" | "calendar" | "check" | "heart" | "home" | "image" | "leaf" | "plus" | "profile" | "sun" | "tasks" | "x"

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C12 4 6 8 6 14c0 3 2 5 5 5 6 0 9-7 9-15Z" />
        <path d="M4 21c2-5 6-9 12-12" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    tasks: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="m8 8 1.5 1.5L12 7M8 14h8" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
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

type HomeArticle = {
  id: string
  alt: string
  category: string
  image: string
  meta: string
  title: string
  description: string
}

const seedArticles: HomeArticle[] = [
  {
    id: "plantation",
    alt: "Hands planting a young seedling in rich soil",
    category: "Green Initiative",
    image: "/assets/home-planting.jpg",
    meta: "2h ago · Mangaluru",
    title: "Plant Today, Breathe Tomorrow",
    description:
      "A small step towards a greener planet — join the tree plantation drive this weekend!",
  },
  {
    id: "community-garden",
    alt: "Volunteers working together in a community garden",
    category: "Community Action",
    image: "/assets/task-garden.jpg",
    meta: "4h ago · Bengaluru",
    title: "A Garden Grown Together",
    description:
      "Neighbours transformed an unused corner into a thriving garden for local families.",
  },
  {
    id: "forest-care",
    alt: "A green forest cared for by local volunteers",
    category: "Nature Care",
    image: "/assets/task-forest.jpg",
    meta: "Yesterday · Coorg",
    title: "Restore a Forest, Renew Hope",
    description:
      "Local volunteers are bringing native plants back and protecting a shared green future.",
  },
  {
    id: "food-drive",
    alt: "Volunteers preparing food donations for families",
    category: "Food Support",
    image: "/assets/53027.png",
    meta: "Yesterday · Udupi",
    title: "Meals That Carry Hope",
    description:
      "A weekend food drive brought warm meals and essential supplies to families across the community.",
  },
  {
    id: "clean-city",
    alt: "Volunteers taking part in an environmental drive",
    category: "Clean Community",
    image: "/assets/9f66a.png",
    meta: "2 days ago · Mysuru",
    title: "Small Actions, Cleaner Streets",
    description:
      "Young volunteers came together to clean shared spaces and inspire better everyday habits.",
  },
  {
    id: "planting-team",
    alt: "A community team planting trees together",
    category: "Volunteer Story",
    image: "/assets/b3227.png",
    meta: "3 days ago · Mangaluru",
    title: "Growing Roots and Friendships",
    description:
      "What began as a planting drive became a day of teamwork, learning, and new friendships.",
  },
  {
    id: "clothes-drive",
    alt: "Clothes collected and prepared for donation",
    category: "Donation Drive",
    image: "/assets/6d276.png",
    meta: "4 days ago · Udupi",
    title: "Warm Clothes, Warmer Hearts",
    description:
      "Hundreds of clean clothes are ready to reach children and families before the rainy season.",
  },
  {
    id: "community-table",
    alt: "Community volunteers sorting donated essentials",
    category: "Kindness in Action",
    image: "/assets/405bb.png",
    meta: "5 days ago · Bengaluru",
    title: "A Community That Shows Up",
    description:
      "Volunteers sorted, packed, and prepared essential donations for neighbours who need them most.",
  },
]

function AddArticleModal({
  onAdd,
  onClose,
}: {
  onAdd: (article: HomeArticle) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  const titleInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleInput.current?.focus()
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [onClose])

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.")
      event.target.value = ""
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Article image must be 5 MB or smaller.")
      event.target.value = ""
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result)
        setError("")
      }
    }
    reader.onerror = () => setError("We could not read that image.")
    reader.readAsDataURL(file)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!image) {
      setError("Add an image for your article.")
      return
    }
    onAdd({
      id: `community-article-${Date.now()}`,
      alt: `Cover for ${title.trim()}`,
      category: category.trim(),
      image,
      meta: `Just now · ${location.trim()}`,
      title: title.trim(),
      description: description.trim(),
    })
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#18151d]/60 p-3 sm:items-center"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose()
      }}
      role="dialog"
    >
      <div className="max-h-[92dvh] w-full max-w-[560px] overflow-y-auto rounded-[26px] border-2 border-[#18151d] bg-[#fffbff] p-5 shadow-[7px_8px_0_#18151d] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-outfit-semibold inline-flex rounded-full bg-[#edddff] px-3 py-1.5 text-xs text-[#6f19b6]">
              Community story
            </span>
            <h2 className="font-outfit-extrabold mt-3 text-3xl tracking-[-1px]">
              Add an article
            </h2>
            <p className="font-outfit-regular mt-1 text-sm text-[#6d6572]">
              Share an impact story with the SevaSathi community.
            </p>
          </div>
          <button
            aria-label="Close add article form"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#18151d] bg-white"
            onClick={onClose}
            type="button"
          >
            <Icon name="x" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          {error && (
            <p
              className="font-outfit-semibold rounded-xl border-2 border-[#d9425f] bg-[#fff0f3] px-4 py-3 text-sm text-[#a01f3a]"
              role="alert"
            >
              {error}
            </p>
          )}
          <label className="font-outfit-semibold block text-sm">
            Article title
            <input
              className="font-outfit-regular mt-2 h-12 w-full rounded-xl border-2 border-[#ded8e5] bg-white px-4 text-base outline-none focus:border-[#8c23df]"
              maxLength={80}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your story a clear title"
              ref={titleInput}
              required
              value={title}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="font-outfit-semibold block text-sm">
              Category
              <input
                className="font-outfit-regular mt-2 h-12 w-full rounded-xl border-2 border-[#ded8e5] bg-white px-4 text-base outline-none focus:border-[#8c23df]"
                maxLength={30}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Environment"
                required
                value={category}
              />
            </label>
            <label className="font-outfit-semibold block text-sm">
              Location
              <input
                className="font-outfit-regular mt-2 h-12 w-full rounded-xl border-2 border-[#ded8e5] bg-white px-4 text-base outline-none focus:border-[#8c23df]"
                maxLength={40}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Mangaluru"
                required
                value={location}
              />
            </label>
          </div>
          <label className="font-outfit-semibold block text-sm">
            Story
            <textarea
              className="font-outfit-regular mt-2 min-h-28 w-full resize-none rounded-xl border-2 border-[#ded8e5] bg-white p-4 text-base outline-none focus:border-[#8c23df]"
              maxLength={240}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what happened and the impact it created..."
              required
              value={description}
            />
            <span className="font-outfit-regular mt-1 block text-right text-xs text-[#8c8590]">
              {description.length}/240
            </span>
          </label>
          <label className="font-outfit-semibold block text-sm">
            Cover image
            <span className="mt-2 flex min-h-28 cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-[#a96cdb] bg-[#f8f1ff] p-3">
              {image ? (
                <img
                  alt="Article cover preview"
                  className="h-24 w-28 rounded-lg object-cover"
                  src={image}
                />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#8c23df]">
                  <Icon name="plus" />
                </span>
              )}
              <span>
                <strong className="font-outfit-bold block">
                  {image ? "Change image" : "Upload article image"}
                </strong>
                <small className="font-outfit-regular text-[#756c7b]">
                  JPG, PNG, or WebP · Max 5 MB
                </small>
              </span>
              <input
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={chooseImage}
                type="file"
              />
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              className="font-outfit-bold h-12 rounded-xl border-2 border-[#18151d] bg-white"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="font-outfit-bold h-12 rounded-xl border-2 border-[#18151d] bg-[#d8f23c] shadow-[3px_4px_0_#18151d]"
              type="submit"
            >
              Publish article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function HomeScreen({
  onNavigate,
  onVerify,
}: {
  onNavigate: (destination: Destination) => void
  onVerify: () => void
}) {
  const [articles, setArticles] = useState(seedArticles)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState("")
  const [articleIndex, setArticleIndex] = useState(0)
  const [changingArticle, setChangingArticle] = useState(false)
  const [showArticleForm, setShowArticleForm] = useState(false)
  const swipeStartY = useRef<number | null>(null)
  const article = articles[articleIndex]
  const nextArticle = articles[(articleIndex + 1) % articles.length]
  const followingArticle = articles[(articleIndex + 2) % articles.length]

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 1600)
  }

  function showNextArticle() {
    if (changingArticle) return
    setChangingArticle(true)
    window.setTimeout(() => {
      setArticleIndex((current) => (current + 1) % articles.length)
      setLiked(false)
      setSaved(false)
      setChangingArticle(false)
    }, 220)
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-[#f8f2ff] pb-[118px] text-[#15121b]">
      <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-white/70 blur-2xl" />
      <div className="pointer-events-none absolute -left-24 top-[430px] h-72 w-72 rounded-full bg-[#ead8ff]/75 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-[760px] items-center justify-between px-5 pb-4 pt-6">
        <div>
          <h1 className="font-outfit-extrabold text-[34px] leading-tight tracking-[-1.3px] sm:text-[40px]">
            Good Morning!
          </h1>
          <p className="font-outfit-regular mt-1 text-base text-[#4f4855] sm:text-lg">
            Let&apos;s spread kindness today
            <Icon
              className="ml-2 inline h-4 w-4 fill-current text-[#9a39df]"
              name="heart"
            />
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/70"
            type="button"
          >
            <Icon name="bell" />
            <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff4051]" />
          </button>
          <button
            aria-label="Open Arena"
            className="font-outfit-bold flex h-12 items-center justify-center rounded-full border-2 border-white bg-[#dec7ff] px-5 text-sm text-[#6f19d6] shadow-sm transition hover:bg-[#d2b5ff]"
            onClick={() => onNavigate("arena")}
            type="button"
          >
            Arena
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[760px] px-5">
        <div className="relative pt-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-5 bottom-[-12px] top-0 rotate-[-3deg] overflow-hidden rounded-[28px] border-2 border-white bg-white opacity-50 shadow-[0_10px_24px_rgba(105,48,150,0.13)]"
          >
            <img
              alt=""
              className="h-full w-full object-cover opacity-35"
              src={followingArticle.image}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-3 bottom-[-6px] top-2 rotate-[2deg] overflow-hidden rounded-[28px] border-2 border-white bg-white opacity-75 shadow-[0_10px_24px_rgba(105,48,150,0.15)]"
          >
            <img
              alt=""
              className="h-full w-full object-cover opacity-30"
              src={nextArticle.image}
            />
          </div>
          <article
            aria-label={`${article.title}. Swipe up for the next article.`}
            className={`touch-none relative z-10 overflow-hidden rounded-[28px] border-2 border-white bg-white shadow-[0_12px_34px_rgba(105,48,150,0.18)] transition duration-200 ${
              changingArticle
                ? "-translate-y-8 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
            onPointerCancel={() => {
              swipeStartY.current = null
            }}
            onPointerDown={(event) => {
              swipeStartY.current = event.clientY
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerUp={(event) => {
              const startY = swipeStartY.current
              swipeStartY.current = null
              if (startY !== null && startY - event.clientY > 50) {
                showNextArticle()
              }
            }}
            onWheel={(event) => {
              if (event.deltaY > 45) showNextArticle()
            }}
          >
            <div className="relative h-[330px] overflow-hidden sm:h-[420px]">
              <img
                alt={article.alt}
                className="h-full w-full object-cover"
                src={article.image}
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                <span className="font-outfit-bold flex items-center gap-2 rounded-full bg-[#edddff] px-5 py-3 text-sm text-[#5f168e] shadow-sm">
                  <Icon className="h-5 w-5 text-[#3f9a40]" name="leaf" />
                  {article.category}
                </span>
                <button
                  aria-label={saved ? "Remove saved story" : "Save this story"}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-md transition ${
                    saved
                      ? "bg-[#d8f23c] text-[#18151d]"
                      : "bg-white text-[#8d24e8]"
                  }`}
                  onClick={() => {
                    setSaved((current) => !current)
                    showNotice(
                      saved ? "Removed from saved stories" : "Story saved",
                    )
                  }}
                  type="button"
                >
                  {saved ? <Icon name="check" /> : <Icon name="bookmark" />}
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="font-outfit-semibold flex items-center gap-2 text-sm text-[#6d6572]">
                  <Icon className="h-5 w-5 text-[#8d24e8]" name="calendar" />
                  {article.meta}
                </p>
                <span className="font-outfit-bold rounded-full bg-[#f2e8fb] px-3 py-1 text-xs text-[#6f19b6]">
                  {articleIndex + 1} / {articles.length}
                </span>
              </div>
              <h2 className="font-outfit-extrabold mt-4 text-[32px] leading-[1.05] tracking-[-1px] sm:text-[40px]">
                {article.title}
              </h2>
              <p className="font-outfit-regular mt-4 text-[17px] leading-relaxed text-[#4f4855] sm:text-xl">
                {article.description}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button
                  className="font-outfit-semibold group flex flex-col items-center gap-2 text-sm"
                  onClick={() =>
                    showNotice("We’ll show fewer stories like this")
                  }
                  type="button"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe8f1] text-[#ff3d62] transition group-hover:scale-105">
                    <Icon className="h-8 w-8" name="x" />
                  </span>
                  Dislike
                </button>
                <button
                  aria-label="Verify this impact with geo-tag proof"
                  className="font-outfit-semibold group flex flex-col items-center gap-2 text-sm"
                  onClick={(event) => {
                    event.stopPropagation()
                    onVerify()
                  }}
                  onPointerDown={(event) => event.stopPropagation()}
                  type="button"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eadcff] text-[#8229d7] transition group-hover:scale-105">
                    <Icon className="h-8 w-8" name="check" />
                  </span>
                  Verify
                </button>
                <button
                  aria-pressed={liked}
                  className="font-outfit-semibold group flex flex-col items-center gap-2 text-sm"
                  onClick={() => {
                    setLiked((current) => !current)
                    showNotice(
                      liked ? "Like removed" : "Added to your interests",
                    )
                  }}
                  type="button"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full transition group-hover:scale-105 ${
                      liked
                        ? "bg-[#d8f23c] text-[#187b60]"
                        : "bg-[#ddfaf1] text-[#16a07a]"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 ${liked ? "fill-current" : ""}`}
                      name="heart"
                    />
                  </span>
                  Like
                </button>
              </div>
            </div>
          </article>
        </div>

        <button
          aria-label="Add an article"
          className="fixed bottom-[112px] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#d8f23c] text-[#6f19d6] shadow-[4px_5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_3px_0_#18151d] sm:right-8"
          onClick={() => setShowArticleForm(true)}
          type="button"
        >
          <Icon className="h-7 w-7" name="plus" />
        </button>
      </section>

      {notice && (
        <div
          className="font-outfit-semibold fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-full border-2 border-[#18151d] bg-white px-5 py-3 text-sm shadow-[3px_4px_0_#18151d]"
          role="status"
        >
          {notice}
        </div>
      )}

      {showArticleForm && (
        <AddArticleModal
          onAdd={(newArticle) => {
            setArticles((current) => [newArticle, ...current])
            setArticleIndex(0)
            setLiked(false)
            setSaved(false)
            setShowArticleForm(false)
            showNotice("Your article is now live")
          }}
          onClose={() => setShowArticleForm(false)}
        />
      )}

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto grid h-[88px] max-w-[760px] grid-cols-5 rounded-t-[32px] border-x-2 border-t-2 border-[#e3dce8] bg-white px-2 shadow-[0_-8px_30px_rgba(84,36,119,0.10)]"
      >
        {[
          { label: "Home", icon: "home" as const, screen: "home" as const },
          {
            label: "Tasks",
            icon: "tasks" as const,
            screen: "tasks" as const,
          },
          {
            label: "My Events",
            icon: "calendar" as const,
            screen: "my-events" as const,
          },
          {
            label: "Memories",
            icon: "image" as const,
            screen: "memories" as const,
          },
          {
            label: "Profile",
            icon: "profile" as const,
            screen: "profile" as const,
          },
        ].map((item) => (
          <button
            className={`bottom-nav-item ${
              item.label === "Home" ? "active" : ""
            }`}
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            type="button"
          >
            <NavigationIcon className="h-6 w-6" name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}
