export type NavigationIconName =
  | "home"
  | "tasks"
  | "calendar"
  | "image"
  | "profile"

export default function NavigationIcon({
  name,
  className = "h-6 w-6",
}: {
  name: NavigationIconName
  className?: string
}) {
  const paths: Record<NavigationIconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    tasks: (
      <>
        <rect x="3" y="4" width="7" height="8" rx="1.5" />
        <rect x="14" y="4" width="7" height="8" rx="1.5" />
        <rect x="6" y="12" width="7" height="8" rx="1.5" />
        <rect x="15" y="12" width="6" height="8" rx="1.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
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
