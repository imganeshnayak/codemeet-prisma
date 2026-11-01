import { ChangeEvent, useEffect, useRef, useState } from "react"
import NavigationIcon from "./NavigationIcon"

const assetPath = "/assets/memories"

const assets = {
  avatar: `${assetPath}/07b22.png`,
  heroPhoto: `${assetPath}/ed246.png`,
  photos: [
    `${assetPath}/456f9.png`,
    `${assetPath}/96576.png`,
    `${assetPath}/3aaf6.png`,
    `${assetPath}/8725e.png`,
    `${assetPath}/a6546.png`,
    `${assetPath}/ebe36.png`,
    `${assetPath}/de5b6.png`,
    `${assetPath}/ed246.png`,
    `${assetPath}/b6429.png`,
  ],
  waves: `${assetPath}/9b5b4.svg`,
  leftSprig: `${assetPath}/f8b85.svg`,
  rightSprig: `${assetPath}/b38fa.svg`,
  ribbon: `${assetPath}/b6745.svg`,
  brandRays: `${assetPath}/04263.svg`,
  bell: `${assetPath}/339e5.svg`,
  cameraShadow: `${assetPath}/be30e.svg`,
  shutter: `${assetPath}/8887c.svg`,
  camera: `${assetPath}/569f1.svg`,
  viewfinder: `${assetPath}/15454.svg`,
  flash: `${assetPath}/01664.svg`,
  lens: `${assetPath}/a81f9.svg`,
  flashRays: `${assetPath}/1d775.svg`,
  heartSticker: `${assetPath}/4f574.svg`,
  leaves: `${assetPath}/6a1fd.svg`,
  shield: `${assetPath}/aa160.svg`,
  upload: `${assetPath}/e6339.svg`,
  arrow: `${assetPath}/3bbbf.svg`,
  titleAccent: `${assetPath}/2c3d7.svg`,
  galleryAccentLeft: `${assetPath}/bbdf3.svg`,
  galleryAccentRight: `${assetPath}/bc9f4.svg`,
  memories: `${assetPath}/597ac.svg`,
  volunteers: `${assetPath}/d28a8.svg`,
  events: `${assetPath}/a6795.svg`,
  ngos: `${assetPath}/208ff.svg`,
  home: `${assetPath}/6f969.svg`,
  tasks: `${assetPath}/8b571.svg`,
  myEvents: `${assetPath}/8cca2.svg`,
  memoryNav: `${assetPath}/cbd81.svg`,
  profile: `${assetPath}/ff5eb.svg`,
}

type MemoryMedia = {
  id: string
  label: string
  src: string
  type: "image" | "video"
  uploaded?: boolean
}

const initialMemories: MemoryMedia[] = assets.photos.map((src, index) => ({
  id: `community-memory-${index + 1}`,
  label: [
    "Volunteers celebrating after an event",
    "A community volunteer gathering",
    "Friends sharing a volunteering moment",
    "Volunteers working together outdoors",
    "A joyful community service day",
    "Team members at a local event",
    "Volunteers making an impact together",
    "A keepsake from the volunteer community",
    "Community members celebrating their work",
  ][index],
  src,
  type: "image",
}))

const stats = [
  { icon: assets.memories, value: "1.2K+", label: "Memories" },
  { icon: assets.volunteers, value: "10K+", label: "Volunteers" },
  { icon: assets.events, value: "320+", label: "Events" },
  { icon: assets.ngos, value: "50+", label: "NGOs" },
]

function MediaFrame({
  duplicate = false,
  media,
  onOpen,
}: {
  duplicate?: boolean
  media: MemoryMedia
  onOpen: (media: MemoryMedia) => void
}) {
  return (
    <button
      aria-label={`Open ${media.type}: ${media.label}`}
      className="memory-reel-frame"
      onClick={() => onOpen(media)}
      tabIndex={duplicate ? -1 : 0}
      type="button"
    >
      {media.type === "video" ? (
        <>
          <video
            aria-hidden="true"
            className="memory-reel-media"
            muted
            playsInline
            preload="metadata"
            src={media.src}
          />
          <span className="memory-video-badge">
            <span aria-hidden="true">▶</span>
            Video
          </span>
        </>
      ) : (
        <img className="memory-reel-media" src={media.src} alt={media.label} />
      )}
      {media.uploaded && <span className="memory-new-badge">New</span>}
      <span className="memory-frame-shine" />
    </button>
  )
}

export default function MemoryReel({
  onNavigate,
}: {
  onNavigate: (screen: "home" | "tasks" | "my-events" | "profile") => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrlsRef = useRef<string[]>([])
  const [uploadedMemories, setUploadedMemories] = useState<MemoryMedia[]>([])
  const [selectedMemory, setSelectedMemory] = useState("")
  const [activeMedia, setActiveMedia] = useState<MemoryMedia | null>(null)
  const memories = [...uploadedMemories, ...initialMemories]

  useEffect(() => {
    if (!activeMedia) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveMedia(null)
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [activeMedia])

  useEffect(() => {
    const objectUrls = objectUrlsRef.current
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  function chooseMemory(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    const uploads = files.map((file, index): MemoryMedia => {
      const src = URL.createObjectURL(file)
      objectUrlsRef.current.push(src)
      return {
        id: `upload-${file.name}-${file.lastModified}-${index}`,
        label: file.name.replace(/\.[^.]+$/, ""),
        src,
        type: file.type.startsWith("video/") ? "video" : "image",
        uploaded: true,
      }
    })

    setUploadedMemories((current) => [...uploads, ...current])
    setSelectedMemory(
      files.length === 1
        ? `${files[0].name} is ready to preview.`
        : `${files.length} new memories are ready to preview.`,
    )
    event.target.value = ""
  }

  return (
    <main className="memory-page">
      <img alt="" className="memory-waves" src={assets.waves} />

      <header className="memory-header">
        <div className="memory-title-row">
          <h1>Memory</h1>
          <span>Reel.</span>
          <img alt="" src={assets.titleAccent} />
        </div>
        <div className="memory-account">
          <button
            aria-label="Notifications"
            className="memory-notification"
            type="button"
          >
            <img alt="" src={assets.bell} />
            <span />
          </button>
          <button
            aria-label="Open profile"
            onClick={() => onNavigate("profile")}
            type="button"
          >
            <img
              alt="Aarav Sharma"
              className="memory-avatar"
              src={assets.avatar}
            />
          </button>
        </div>
      </header>

      <section className="memory-gallery">
        <div className="memory-reel-shell">
          <img
            alt=""
            aria-hidden="true"
            className="memory-gallery-accent memory-gallery-accent-left"
            src={assets.galleryAccentLeft}
          />
          <div className="memory-reel-viewport">
            <div className="memory-reel-track">
              {[0, 1].map((copy) => (
                <div
                  aria-hidden={copy === 1}
                  className={
                    copy === 0
                      ? "relative flex shrink-0 gap-[22px] overflow-hidden bg-black px-[18px] py-[54px] [&_.memory-reel-frame]:!aspect-[1.36] [&_.memory-reel-frame]:!w-[clamp(240px,72vw,330px)] [&_.memory-reel-frame]:!rounded-[10px] [&_.memory-reel-frame]:!border-[4px] [&_.memory-reel-frame]:!border-[#111] [&_.memory-reel-frame]:!shadow-[0_0_7px_rgba(255,255,255,0.72)]"
                      : "memory-reel-set"
                  }
                  key={copy}
                >
                  {copy === 0 && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[28px] h-[27px] border-y border-white/60 bg-[repeating-linear-gradient(90deg,transparent_0_15px,#fff_15px_31px,transparent_31px_46px)]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-[28px] h-[27px] border-y border-white/60 bg-[repeating-linear-gradient(90deg,transparent_0_15px,#fff_15px_31px,transparent_31px_46px)]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[5px] flex justify-around font-mono text-[15px] tracking-[3px] text-white/70"
                      >
                        <span>02 · ISO 100</span>
                        <span>03 · ISO 100</span>
                        <span>04 · ISO 100</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-[4px] flex justify-around font-mono text-[15px] tracking-[3px] text-white/70"
                      >
                        <span>02 · 03</span>
                        <span>03 · 04</span>
                        <span>04 · 05</span>
                      </span>
                    </>
                  )}
                  {memories.map((memory) => (
                    <MediaFrame
                      duplicate={copy === 1}
                      key={`${copy}-${memory.id}`}
                      media={memory}
                      onOpen={setActiveMedia}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="memory-gallery-accent memory-gallery-accent-right"
            src={assets.galleryAccentRight}
          />
        </div>

        <section aria-label="Community impact" className="memory-stats">
          {stats.map((stat) => (
            <div className="memory-stat" key={stat.label}>
              <img alt="" src={stat.icon} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      </section>

      <section className="memory-hero">
        <div className="memory-hero-copy">
          <p>
            Relive the moments that brought our volunteer community together.
          </p>
          <input
            accept="image/*,video/*"
            className="sr-only"
            multiple
            onChange={chooseMemory}
            ref={inputRef}
            type="file"
          />
          <button
            className="memory-share-button"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            <img alt="" src={assets.upload} />
            Share Your Memory
            <img alt="" src={assets.arrow} />
          </button>
          <div className="memory-approval" role="status">
            <img alt="" src={assets.shield} />
            <span>
              {selectedMemory ||
                "Photos and videos will appear after admin approval."}
            </span>
          </div>
        </div>

        <div className="memory-keepsakes" aria-hidden="true">
          <div className="memory-polaroid">
            <img alt="" src={assets.heroPhoto} />
          </div>
          <img
            alt=""
            className="memory-sticker-heart"
            src={assets.heartSticker}
          />
          <img alt="" className="memory-sticker-leaves" src={assets.leaves} />
          <div className="memory-camera">
            <img alt="" className="camera-shadow" src={assets.cameraShadow} />
            <img alt="" className="camera-body" src={assets.camera} />
            <img alt="" className="camera-shutter" src={assets.shutter} />
            <img alt="" className="camera-viewfinder" src={assets.viewfinder} />
            <img alt="" className="camera-flash" src={assets.flash} />
            <img alt="" className="camera-lens" src={assets.lens} />
            <img alt="" className="camera-rays" src={assets.flashRays} />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="memory-garden">
        <img alt="" src={assets.leftSprig} />
        <img alt="" src={assets.ribbon} />
        <img alt="" src={assets.rightSprig} />
      </div>

      <nav aria-label="Memories navigation" className="memory-nav">
        {[
          { icon: "home" as const, label: "Home", screen: "home" as const },
          { icon: "tasks" as const, label: "Tasks", screen: "tasks" as const },
          {
            icon: "calendar" as const,
            label: "My Events",
            screen: "my-events" as const,
          },
          { icon: "image" as const, label: "Memories", active: true },
          {
            icon: "profile" as const,
            label: "Profile",
            screen: "profile" as const,
          },
        ].map((item) => (
          <button
            className={item.active ? "active" : ""}
            key={item.label}
            onClick={() => item.screen && onNavigate(item.screen)}
            type="button"
          >
            <NavigationIcon className="h-[22px] w-[22px]" name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {activeMedia && (
        <div
          aria-label={activeMedia.label}
          aria-modal="true"
          className="memory-viewer"
          onClick={() => setActiveMedia(null)}
          role="dialog"
        >
          <div
            className="memory-viewer-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close memory viewer"
              className="memory-viewer-close"
              onClick={() => setActiveMedia(null)}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
            {activeMedia.type === "video" ? (
              <video
                autoPlay
                className="memory-viewer-media"
                controls
                playsInline
                src={activeMedia.src}
              />
            ) : (
              <img
                alt={activeMedia.label}
                className="memory-viewer-media"
                src={activeMedia.src}
              />
            )}
            <div className="memory-viewer-caption">
              <span>{activeMedia.type === "video" ? "Video memory" : "Photo memory"}</span>
              <strong>{activeMedia.label}</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
