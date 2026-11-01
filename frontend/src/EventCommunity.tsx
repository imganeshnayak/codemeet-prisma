import { SevaEvent } from "./events"

import { useEffect, useRef, useState } from "react"

import { ApiChatMessage, ApiError, chatApi, getStoredToken } from "./api"

const TabIcon = ({
  name,
}: {
  name: "users" | "clipboard" | "image" | "chat"
}) => {
  const paths: Record<string, React.ReactNode> = {
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" />
      </>
    ),

    clipboard: (
      <>
        <rect x="4" y="4" width="16" height="18" rx="2" />
        <path d="M9 2h6v4H9z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),

    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),

    chat: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="size-[22px]"
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

export default function EventCommunity({
  event,

  onBack,

  onVolunteers,

  onAssignments,

  onPhotos,

  onCommunity,

  showNavigationTabs = true,
}: {
  event: SevaEvent

  onBack: () => void

  onVolunteers: () => void

  onAssignments: () => void

  onPhotos: () => void

  onCommunity: () => void

  showNavigationTabs?: boolean
}) {
  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState<ApiChatMessage[]>([])

  const [loading, setLoading] = useState(true)

  const [sending, setSending] = useState(false)

  const [error, setError] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const { messages: latest } = await chatApi.list(event.id)

        if (!active) return

        setMessages(latest)

        setError("")
      } catch (loadError) {
        if (!active) return

        setError(
          loadError instanceof ApiError
            ? loadError.message
            : "Could not load the chat.",
        )
      } finally {
        if (active) setLoading(false)
      }
    }

    if (getStoredToken()) {
      load()

      const interval = window.setInterval(load, 4000)

      return () => {
        active = false

        window.clearInterval(interval)
      }
    }

    setLoading(false)

    setError("Sign in to join the community chat.")

    return () => {
      active = false
    }
  }, [event.id])

  useEffect(() => {
    const chat = scrollRef.current

    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages, loading])

  async function send() {
    const trimmed = message.trim()

    if (!trimmed || sending) return

    setSending(true)

    try {
      const { message: sent } = await chatApi.send(event.id, trimmed)

      setMessages((current) =>
        current.some((m) => m.id === sent.id) ? current : [...current, sent],
      )

      setMessage("")

      setError("")
    } catch (sendError) {
      setError(
        sendError instanceof ApiError
          ? sendError.message
          : "Could not send the message.",
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-[#fcf8ff] content-stretch flex h-dvh w-full flex-col items-start overflow-hidden">
      <div className="relative flex h-[56px] w-full shrink-0 items-center px-4 sm:px-5">
        <button
          aria-label="Back to event"
          className="z-10 flex size-[34px] shrink-0 items-center justify-center rounded-full border border-[#d5c9e1] text-[18px] text-[#09090b] transition hover:bg-white"
          onClick={onBack}
          type="button"
        >
          ←
        </button>
        <p className="pointer-events-none absolute inset-x-0 text-center font-['Arimo:Bold'] text-[20px] font-bold text-[#09090b]">
          Community
        </p>
      </div>
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4 overflow-hidden px-3 pb-3 pt-2 sm:gap-[18px] sm:px-4 sm:pb-14 sm:pt-[10px]">
        <div
          className={
            showNavigationTabs
              ? "content-stretch flex flex-col gap-[9px] items-start relative shrink-0 w-full"
              : "hidden"
          }
          data-name="Event navigation"
        >
          <div className="content-stretch flex w-full gap-2 sm:gap-[9px]">
            <div
              className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[15px] px-1 py-3 sm:h-[90px] sm:gap-2"
              onClick={onVolunteers}
              role="button"
              tabIndex={0}
            >
              <div className="text-[#09090b]">
                <TabIcon name="users" />
              </div>
              <p className="text-center font-['Arimo:Bold'] text-[12px] font-bold leading-tight text-[#09090b] sm:text-[15px]">
                1. Volunteers
              </p>
            </div>
            <div
              className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[15px] px-1 py-3 sm:h-[90px] sm:gap-2"
              onClick={onAssignments}
              role="button"
              tabIndex={0}
            >
              <div className="text-[#09090b]">
                <TabIcon name="clipboard" />
              </div>
              <p className="text-center font-['Arimo:Bold'] text-[12px] font-bold leading-tight text-[#09090b] sm:text-[15px]">
                2. Task Assignments
              </p>
            </div>
          </div>
          <div className="content-stretch flex w-full gap-2 sm:gap-[9px]">
            <div
              className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[15px] px-1 py-3 sm:h-[90px] sm:gap-2"
              onClick={onPhotos}
              role="button"
              tabIndex={0}
            >
              <div className="text-[#09090b]">
                <TabIcon name="image" />
              </div>
              <div className="flex flex-col items-center gap-px">
                <p className="text-center font-['Arimo:Bold'] text-[12px] font-bold leading-tight text-[#09090b] sm:text-[15px]">
                  3. Event Photos
                </p>
                <p className="font-['Arimo:Regular'] text-[11px] text-[#09090b] sm:text-[13px]">
                  (Geo-Tag)
                </p>
              </div>
            </div>
            <div
              className="bg-[#933bc4] border border-[#933bc4] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[15px] px-1 py-3 sm:h-[90px] sm:gap-2"
              onClick={onCommunity}
              role="button"
              tabIndex={0}
            >
              <div className="text-white">
                <TabIcon name="chat" />
              </div>
              <div className="flex flex-col items-center gap-px">
                <p className="text-center font-['Arimo:Bold'] text-[12px] font-bold leading-tight text-white sm:text-[15px]">
                  4. Community
                </p>
                <p className="font-['Arimo:Regular'] text-[11px] text-white sm:text-[13px]">
                  (Chat)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch flex min-h-0 w-full flex-1 flex-col items-start overflow-hidden rounded-[15px] px-3 pb-3 pt-3 sm:min-h-[320px] sm:flex-none sm:px-4 sm:pb-2 sm:pt-[10px]">
          <p className="mb-2 font-['Arimo:Bold'] text-[18px] font-bold text-[#09090b] sm:mb-[10px] sm:text-[19px]">
            Volunteer Community Chat
          </p>
          {error && (
            <p className="mb-2 text-[12px] text-red-600" role="alert">
              {error}
            </p>
          )}
          <div
            ref={scrollRef}
            className="content-stretch flex min-h-0 flex-1 w-full flex-col items-start gap-[10px] overflow-y-auto overscroll-contain"
          >
            {loading ? (
              <p className="font-['Arimo:Regular'] text-[14px] text-[#6e5d80]">
                Loading messages...
              </p>
            ) : messages.length ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex w-full ${
                    m.mine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-[12px] px-[12px] py-[8px] ${
                      m.mine
                        ? "bg-[#933bc4] text-white"
                        : "bg-[#ead5f8] text-[#09090b]"
                    }`}
                  >
                    {!m.mine && (
                      <p className="font-['Arimo:Bold'] font-bold text-[11px] mb-[2px]">
                        {m.authorName}
                      </p>
                    )}
                    <p className="font-['Arimo:Regular'] text-[14px]">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-['Arimo:Regular'] text-[14px] text-[#6e5d80]">
                No messages yet. Start the conversation!
              </p>
            )}
          </div>
          <div className="content-stretch flex w-full shrink-0 items-center gap-[8px] border-t border-[#ead5f8] bg-[#fffcff] pt-3 mt-[10px]">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send()
              }}
              placeholder="Type a message..."
              disabled={loading || sending}
              className="h-[40px] min-w-0 flex-1 rounded-[10px] border border-[#d5c9e1] px-3 font-['Arimo:Regular'] text-[14px] outline-none focus:border-[#933bc4] focus:ring-2 focus:ring-[#ead5f8] disabled:opacity-60"
            />
            <button
              onClick={send}
              disabled={loading || sending || !message.trim()}
              className="h-[40px] shrink-0 rounded-[10px] bg-[#933bc4] px-3 font-['Arimo:Bold'] text-sm font-bold text-white transition hover:bg-[#7d2fa9] disabled:opacity-60"
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
