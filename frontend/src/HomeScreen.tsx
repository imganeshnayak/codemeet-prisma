import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { articlesApi } from "./api"
import NavigationIcon from "./NavigationIcon"

type Destination =
  | "home"
  | "tasks"
  | "arena"
  | "my-events"
  | "memories"
  | "profile"

type IconName =
  | "bell"
  | "bookmark"
  | "calendar"
  | "check"
  | "heart"
  | "home"
  | "image"
  | "leaf"
  | "plus"
  | "profile"
  | "sun"
  | "tasks"
  | "x"
  | "arrow-left"
  | "share"
  | "map-pin"
  | "award"
  | "message-circle"
  | "chevron-up"
  | "chevron-down"

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
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    "map-pin": (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    ),
    "message-circle": <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />,
    "chevron-up": <path d="m18 15-6-6-6 6" />,
    "chevron-down": <path d="m6 9 6 6 6-6" />,
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

export type HomeArticle = {
  id: string
  alt: string
  category: string
  image: string
  meta: string
  title: string
  description: string
  readTime?: string
  quote?: string
  content?: string[]
  organizer?: {
    name: string
    avatar: string
    verified: boolean
    role: string
  }
  stats?: { label: string; value: string }[]
  geoTag?: {
    location: string
    verified: boolean
  }
  relatedEvent?: {
    title: string
    date: string
    time: string
    location: string
    volunteers: string
    xp: number
  }
  comments?: {
    id: string
    author: string
    avatar: string
    time: string
    text: string
  }[]
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
    readTime: "3 min read",
    quote: "500 saplings planted in 3 hours by 45 volunteers — turning an arid roadside into a thriving green corridor.",
    content: [
      "Over forty-five community volunteers gathered early Sunday morning at Kadri Hills, equipped with saplings, shovels, and organic compost provided by local green partners.",
      "The initiative aimed to stabilize the hillside soil ahead of the monsoon season while expanding Mangaluru's native tree canopy. Species planted included Neem, Peepal, and Indian Mahogany, chosen for their resilience and ecosystem value.",
      "Every planted sapling was geotagged with high-accuracy coordinates and assigned to a volunteer guardian who committed to bi-weekly watering visits over the next three months."
    ],
    organizer: {
      name: "Green Mangaluru",
      avatar: "GM",
      verified: true,
      role: "Urban Ecology NGO"
    },
    stats: [
      { label: "Saplings Planted", value: "520" },
      { label: "Active Volunteers", value: "45" },
      { label: "Hours Donated", value: "135h" },
      { label: "CO₂ Offset Target", value: "2.4T" }
    ],
    geoTag: {
      location: "Kadri Hills, Mangaluru",
      verified: true
    },
    relatedEvent: {
      title: "Tree Plantation Drive · Phase 2",
      date: "Sun, Oct 12",
      time: "9:00 AM – 12:00 PM",
      location: "Mangaluru, Karnataka",
      volunteers: "24/30 Joined",
      xp: 150
    },
    comments: [
      { id: "c1", author: "Pooja Hegde", avatar: "PH", time: "1h ago", text: "Proud to have planted 12 saplings with my team today! Incredible energy." },
      { id: "c2", author: "Karthik R.", avatar: "KR", time: "30m ago", text: "The soil preparation made planting so smooth. Already signed up for Phase 2!" }
    ]
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
    readTime: "4 min read",
    quote: "Neighbours did not just grow vegetables; they built a resilient food hub from the ground up.",
    content: [
      "An abandoned concrete plot in Indiranagar has found a vibrant second life as an organic urban kitchen garden, thanks to sixty dedicated neighbourhood volunteers.",
      "Working across four consecutive weekends, the team cleared 3 tons of debris, built 20 raised planter beds, and laid out an efficient drip-irrigation network.",
      "Fresh spinach, tomatoes, and herbs harvested this week have already reached local elderly residents and a nearby community kitchen."
    ],
    organizer: {
      name: "Namma Neighbourhood",
      avatar: "NN",
      verified: true,
      role: "Civic Action Alliance"
    },
    stats: [
      { label: "Planter Beds Built", value: "20" },
      { label: "Families Supported", value: "65+" },
      { label: "Fresh Harvest", value: "180kg" },
      { label: "Hours Donated", value: "210h" }
    ],
    geoTag: {
      location: "Indiranagar, Bengaluru",
      verified: true
    },
    relatedEvent: {
      title: "Community Garden Day · Harvest Workshop",
      date: "Sun, Oct 20",
      time: "8:30 AM – 11:30 AM",
      location: "Bengaluru, Karnataka",
      volunteers: "31/40 Joined",
      xp: 120
    },
    comments: [
      { id: "c1", author: "Sunita M.", avatar: "SM", time: "2h ago", text: "My kids learned how vegetables grow! Such a wonderful community spirit." }
    ]
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
    readTime: "5 min read",
    quote: "Restoring native biodiversity creates water security for the entire valley.",
    content: [
      "In the rolling valleys of Coorg, invasive lantana shrubs had overgrown natural streams and choked local wildlife trails.",
      "A collective of forest wardens, coffee estate workers, and youth volunteers launched a focused weekend clearing operation, replacing invasive cover with 800 native shola saplings.",
      "Long-term moisture sensors were installed to measure groundwater recovery, creating an open science dataset for regional environmentalists."
    ],
    organizer: {
      name: "Western Ghats Care",
      avatar: "WG",
      verified: true,
      role: "Biodiversity Trust"
    },
    stats: [
      { label: "Native Saplings", value: "800" },
      { label: "Acres Restored", value: "4.5" },
      { label: "Volunteers", value: "52" },
      { label: "XP Distributed", value: "6,500" }
    ],
    geoTag: {
      location: "Brahmagiri Range, Coorg",
      verified: true
    },
    relatedEvent: {
      title: "Stream Restoration & Trail Care",
      date: "Sat, Nov 08",
      time: "7:00 AM – 1:00 PM",
      location: "Coorg, Karnataka",
      volunteers: "18/25 Joined",
      xp: 200
    },
    comments: [
      { id: "c1", author: "Arjun Dev", avatar: "AD", time: "Yesterday", text: "Hiking up with the sapling packs was challenging but worth every drop of sweat!" }
    ]
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
    readTime: "3 min read",
    quote: "Nutritious food is a fundamental right. When we share meals, we build dignity and connection.",
    content: [
      "Volunteers from across Udupi assembled at dawn to prepare, pack, and safely distribute wholesome warm meals and monthly ration kits.",
      "Partnering with local grain merchants and community kitchens, the drive reached 350 families living in underserved coastal settlements.",
      "Care Circle ensures zero food wastage through direct coordination with neighbourhood coordinators."
    ],
    organizer: {
      name: "Care Circle",
      avatar: "CC",
      verified: true,
      role: "Community Kitchen Network"
    },
    stats: [
      { label: "Meals Distributed", value: "1,250" },
      { label: "Ration Kits", value: "350" },
      { label: "Volunteers Active", value: "38" },
      { label: "Communities Reached", value: "6" }
    ],
    geoTag: {
      location: "Malpe Coastal Ward, Udupi",
      verified: true
    },
    relatedEvent: {
      title: "Weekend Ration Packing Drive",
      date: "Sat, Oct 18",
      time: "10:00 AM – 2:00 PM",
      location: "Udupi, Karnataka",
      volunteers: "25/25 Filled",
      xp: 140
    },
    comments: [
      { id: "c1", author: "Meera Pai", avatar: "MP", time: "1d ago", text: "Seeing the children smile when they received the warm porridge touched all of us." }
    ]
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
    readTime: "3 min read",
    quote: "A clean street is the first stepping stone toward community pride and health.",
    content: [
      "Over eighty students and working professionals swept through the heritage market precinct in Mysuru, segregating dry recyclables from wet waste.",
      "The drive collected 1,400 kg of plastic waste that was sent directly to certified recycling units, while bio-waste was delivered to local compost pits.",
      "Informational posters in Kannada and English were installed across bus shelters to encourage commuters to keep the streets clean."
    ],
    organizer: {
      name: "Clean Mysuru Mission",
      avatar: "CM",
      verified: true,
      role: "Civic Hygiene NGO"
    },
    stats: [
      { label: "Waste Segregated", value: "1.4 Tons" },
      { label: "Streets Cleaned", value: "12" },
      { label: "Dustbins Placed", value: "16" },
      { label: "Volunteers", value: "84" }
    ],
    geoTag: {
      location: "Devaraja Market, Mysuru",
      verified: true
    },
    relatedEvent: {
      title: "Heritage Walk & Clean-up Drive",
      date: "Sun, Oct 26",
      time: "6:30 AM – 9:30 AM",
      location: "Mysuru, Karnataka",
      volunteers: "42/50 Joined",
      xp: 130
    },
    comments: [
      { id: "c1", author: "Raghu N.", avatar: "RN", time: "2d ago", text: "The shopkeepers even joined in with their own brooms! Collective change in action." }
    ]
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
    readTime: "4 min read",
    quote: "When you dig a trench together under the morning sun, strangers become lifelong companions.",
    content: [
      "Thirty volunteers from different colleges and workplaces met for the first time at the Panambur coastal belt for an afforestation effort.",
      "By afternoon, they had planted 300 casuarina saplings that form natural windbreaks against coastal sea erosion.",
      "The shared lunch afterwards sparked ideas for five new youth-led eco-initiatives across coastal Karnataka."
    ],
    organizer: {
      name: "Coastal Green Youth",
      avatar: "CG",
      verified: true,
      role: "Student Volunteering Chapter"
    },
    stats: [
      { label: "Coastal Saplings", value: "300" },
      { label: "First-time Volunteers", value: "22" },
      { label: "Impact Rating", value: "4.9/5" },
      { label: "Friendships Formed", value: "Countless" }
    ],
    geoTag: {
      location: "Panambur Beach Road, Mangaluru",
      verified: true
    },
    relatedEvent: {
      title: "Coastal Dune Care & Sapling Check",
      date: "Sat, Nov 01",
      time: "4:00 PM – 6:30 PM",
      location: "Mangaluru, Karnataka",
      volunteers: "19/30 Joined",
      xp: 110
    },
    comments: [
      { id: "c1", author: "Sneha Rao", avatar: "SR", time: "3d ago", text: "I came alone and left with a whole crew of passionate friends. 10/10 experience!" }
    ]
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
    readTime: "3 min read",
    quote: "Every neatly folded piece of clothing is a gesture of warmth and respect.",
    content: [
      "Ahead of the coastal monsoon season, volunteers gathered at the community center to sort, wash, iron, and size-package over 1,800 garments donated by residents.",
      "Special care packages were assembled for school children, containing sturdy rain jackets, warm sweaters, and clean school uniforms.",
      "All leftover textiles were donated to women's self-help groups to be upcycled into cloth shopping bags."
    ],
    organizer: {
      name: "Seva Vastra",
      avatar: "SV",
      verified: true,
      role: "Textile Re-use Foundation"
    },
    stats: [
      { label: "Garments Sorted", value: "1,850" },
      { label: "Children Clothed", value: "420" },
      { label: "Upcycled Bags Made", value: "310" },
      { label: "Volunteers", value: "28" }
    ],
    geoTag: {
      location: "Town Hall, Udupi",
      verified: true
    },
    relatedEvent: {
      title: "Winter Care & Blanket Distribution",
      date: "Sun, Nov 16",
      time: "9:00 AM – 1:00 PM",
      location: "Udupi, Karnataka",
      volunteers: "15/20 Joined",
      xp: 130
    },
    comments: [
      { id: "c1", author: "Deepak S.", avatar: "DS", time: "4d ago", text: "The quality check system was so efficient. Loved volunteering here!" }
    ]
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
    readTime: "4 min read",
    quote: "True community happens when we look out for one another in quiet, consistent ways.",
    content: [
      "Over the weekend, 40 volunteers assembled hygiene kits, dry rations, and learning kits for children in transient worker settlements around Whitefield.",
      "Each kit included essentials designed to sustain a family for two weeks, along with notebooks, crayons, and reading books donated by local school students.",
      "The program operates on 100% community contributions with full transparency in kit tracking."
    ],
    organizer: {
      name: "Sahayatha Bangalore",
      avatar: "SB",
      verified: true,
      role: "Relief & Aid Collective"
    },
    stats: [
      { label: "Kits Assembled", value: "500" },
      { label: "Children Reached", value: "280" },
      { label: "Volunteer Hours", value: "160h" },
      { label: "Delivery Accuracy", value: "100%" }
    ],
    geoTag: {
      location: "Whitefield Community Center, Bengaluru",
      verified: true
    },
    relatedEvent: {
      title: "Weekend Learning Kit Assembly",
      date: "Sat, Nov 22",
      time: "10:00 AM – 2:00 PM",
      location: "Bengaluru, Karnataka",
      volunteers: "30/35 Joined",
      xp: 140
    },
    comments: [
      { id: "c1", author: "Nikhil Verma", avatar: "NV", time: "5d ago", text: "Packaging the children's books brought back childhood memories. So glad I could help." }
    ]
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
  const [category, setCategory] = useState("Green Initiative")
  const [customCategory, setCustomCategory] = useState("")
  const [location, setLocation] = useState("Mangaluru, Karnataka")
  const [description, setDescription] = useState("")
  const [fullStory, setFullStory] = useState("")
  const [image, setImage] = useState("")
  const [authorName, setAuthorName] = useState("Aarav Sharma")
  const [authorRole, setAuthorRole] = useState("Community Volunteer")
  const [quote, setQuote] = useState("")
  const [metric1Val, setMetric1Val] = useState("")
  const [metric1Lbl, setMetric1Lbl] = useState("")
  const [metric2Val, setMetric2Val] = useState("")
  const [metric2Lbl, setMetric2Lbl] = useState("")
  const [nextEventTitle, setNextEventTitle] = useState("")
  const [nextEventXp, setNextEventXp] = useState("150")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"story" | "impact" | "author">("story")
  const titleInput = useRef<HTMLInputElement>(null)

  const quickCategories = [
    "Green Initiative",
    "Community Action",
    "Food Support",
    "Clean Community",
    "Nature Care",
    "Donation Drive",
    "Other",
  ]

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
    if (!title.trim()) {
      setError("Please enter an article title.")
      return
    }
    if (!image) {
      setError("Add a cover photo for your article.")
      return
    }
    if (!description.trim()) {
      setError("Please provide a short summary of the story.")
      return
    }

    const finalCategory =
      category === "Other" && customCategory.trim()
        ? customCategory.trim()
        : category

    // Split story into readable paragraphs
    const storyParagraphs = (fullStory.trim() || description.trim())
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)

    // Compute initials for author avatar
    const nameParts = authorName.trim().split(/\s+/)
    const initials =
      nameParts.length > 1
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : (nameParts[0]?.slice(0, 2) || "VO").toUpperCase()

    // Build real stats from user input if provided
    const userStats: { label: string; value: string }[] = []
    if (metric1Val.trim() && metric1Lbl.trim()) {
      userStats.push({ value: metric1Val.trim(), label: metric1Lbl.trim() })
    }
    if (metric2Val.trim() && metric2Lbl.trim()) {
      userStats.push({ value: metric2Val.trim(), label: metric2Lbl.trim() })
    }

    // Build related upcoming event if provided
    let userRelatedEvent = undefined
    if (nextEventTitle.trim()) {
      userRelatedEvent = {
        title: nextEventTitle.trim(),
        date: "Upcoming Weekend",
        time: "9:00 AM – 12:00 PM",
        location: location.trim(),
        volunteers: "Open for registration",
        xp: parseInt(nextEventXp, 10) || 150,
      }
    }

    onAdd({
      id: `community-article-${Date.now()}`,
      alt: `Cover for ${title.trim()}`,
      category: finalCategory,
      image,
      meta: `Just now · ${location.trim()}`,
      title: title.trim(),
      description: description.trim(),
      readTime: `${Math.max(2, Math.ceil(storyParagraphs.join(" ").split(" ").length / 65))} min read`,
      quote: quote.trim() || undefined,
      content: storyParagraphs,
      organizer: {
        name: authorName.trim() || "Community Volunteer",
        avatar: initials,
        verified: true,
        role: authorRole.trim() || "Active Volunteer",
      },
      stats: userStats.length > 0 ? userStats : undefined,
      geoTag: location.trim()
        ? {
            location: location.trim(),
            verified: true,
          }
        : undefined,
      relatedEvent: userRelatedEvent,
      comments: [],
    })
  }

  return (
    <div
      aria-labelledby="add-article-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-[32px] border-2 border-[#18151d] bg-white p-5 shadow-[0_-10px_40px_rgba(24,21,29,0.3)] sm:rounded-[36px] sm:p-7">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e9e2f0] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] text-[#6f19d6] shadow-[2px_2px_0_#18151d]">
              <Icon className="h-6 w-6" name="plus" />
            </span>
            <div>
              <h2
                className="font-outfit-extrabold text-xl text-[#18151d] sm:text-2xl leading-none"
                id="add-article-title"
              >
                Share Impact Story
              </h2>
              <p className="font-outfit-medium text-xs text-[#6d6572] mt-1">
                Collect & display your real community impact
              </p>
            </div>
          </div>
          <button
            aria-label="Close add article form"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6cadf] text-[#6d6572] transition hover:bg-[#f2e8fb]"
            onClick={onClose}
            type="button"
          >
            <Icon className="h-5 w-5" name="x" />
          </button>
        </div>

        {/* Form Tabs */}
        <div className="mt-4 flex rounded-2xl border-2 border-[#18151d] bg-[#f5edff] p-1 font-outfit-bold text-xs">
          <button
            className={`flex-1 rounded-xl py-2 transition ${
              activeTab === "story"
                ? "bg-[#18151d] text-[#d8f23c] shadow-sm"
                : "text-[#5b4e67] hover:text-[#18151d]"
            }`}
            onClick={() => setActiveTab("story")}
            type="button"
          >
            1. Story & Photo
          </button>
          <button
            className={`flex-1 rounded-xl py-2 transition ${
              activeTab === "author"
                ? "bg-[#18151d] text-[#d8f23c] shadow-sm"
                : "text-[#5b4e67] hover:text-[#18151d]"
            }`}
            onClick={() => setActiveTab("author")}
            type="button"
          >
            2. Author Info
          </button>
          <button
            className={`flex-1 rounded-xl py-2 transition ${
              activeTab === "impact"
                ? "bg-[#18151d] text-[#d8f23c] shadow-sm"
                : "text-[#5b4e67] hover:text-[#18151d]"
            }`}
            onClick={() => setActiveTab("impact")}
            type="button"
          >
            3. Impact & Event
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          {/* TAB 1: STORY & PHOTO */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-title"
                >
                  Headline / Title *
                </label>
                <input
                  className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-3 text-sm text-[#18151d] outline-none transition focus:border-[#7c1bd8] focus:bg-white"
                  id="article-title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 500 Saplings Planted at Kadri Hills"
                  ref={titleInput}
                  required
                  type="text"
                  value={title}
                />
              </div>

              <div>
                <label className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]">
                  Category *
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {quickCategories.map((cat) => (
                    <button
                      className={`rounded-full border px-3 py-1 font-outfit-bold text-xs transition ${
                        category === cat
                          ? "border-[#18151d] bg-[#18151d] text-[#d8f23c]"
                          : "border-[#d8cee5] bg-white text-[#52495b] hover:border-[#18151d]"
                      }`}
                      key={cat}
                      onClick={() => setCategory(cat)}
                      type="button"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {category === "Other" && (
                  <input
                    className="font-outfit-regular mt-2 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-xs text-[#18151d] outline-none"
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    type="text"
                    value={customCategory}
                  />
                )}
              </div>

              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-location"
                >
                  Location / City *
                </label>
                <input
                  className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-sm text-[#18151d] outline-none transition focus:border-[#7c1bd8] focus:bg-white"
                  id="article-location"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mangaluru, Karnataka"
                  required
                  type="text"
                  value={location}
                />
              </div>

              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-description"
                >
                  Card Summary / Hook *
                </label>
                <input
                  className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-sm text-[#18151d] outline-none transition focus:border-[#7c1bd8] focus:bg-white"
                  id="article-description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short 1-2 sentence hook for the feed card"
                  required
                  type="text"
                  value={description}
                />
              </div>

              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-fullstory"
                >
                  Full Story & Narrative *
                </label>
                <textarea
                  className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-3 text-sm text-[#18151d] outline-none transition focus:border-[#7c1bd8] focus:bg-white"
                  id="article-fullstory"
                  onChange={(e) => setFullStory(e.target.value)}
                  placeholder="What happened? What challenges did you face? How did volunteers solve them? Write the detailed paragraphs here..."
                  rows={4}
                  value={fullStory}
                />
              </div>

              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-image"
                >
                  Cover Photo *
                </label>
                <div className="mt-1.5 flex flex-col gap-3">
                  <label
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#18151d] bg-[#fbf9fe] px-4 py-3 text-center transition hover:border-[#7c1bd8] hover:bg-[#f6eeff]"
                    htmlFor="article-image"
                  >
                    <Icon className="h-5 w-5 text-[#7c1bd8]" name="image" />
                    <span className="font-outfit-semibold text-xs text-[#7c1bd8]">
                      {image ? "Change cover image" : "Upload field photograph"}
                    </span>
                    <input
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      id="article-image"
                      onChange={chooseImage}
                      type="file"
                    />
                  </label>
                  {image && (
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl border-2 border-[#18151d]">
                      <img
                        alt="Preview of article"
                        className="h-full w-full object-cover"
                        src={image}
                      />
                      <button
                        aria-label="Remove image"
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white"
                        onClick={() => setImage("")}
                        type="button"
                      >
                        <Icon className="h-4 w-4" name="x" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  className="font-outfit-bold flex items-center gap-1.5 rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] px-5 py-2.5 text-xs text-[#18151d] shadow-[2px_2px_0_#18151d]"
                  onClick={() => setActiveTab("author")}
                  type="button"
                >
                  <span>Next: Author Info</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AUTHOR & HIGHLIGHT */}
          {activeTab === "author" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                    htmlFor="author-name"
                  >
                    Your / Team Name
                  </label>
                  <input
                    className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-sm text-[#18151d] outline-none"
                    id="author-name"
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    type="text"
                    value={authorName}
                  />
                </div>
                <div>
                  <label
                    className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                    htmlFor="author-role"
                  >
                    Your Role / Title
                  </label>
                  <input
                    className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-sm text-[#18151d] outline-none"
                    id="author-role"
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="e.g. Volunteer Lead"
                    type="text"
                    value={authorRole}
                  />
                </div>
              </div>

              <div>
                <label
                  className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]"
                  htmlFor="article-quote"
                >
                  Key Impact Quote / Highlight (Optional)
                </label>
                <textarea
                  className="font-outfit-regular mt-1.5 w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-4 py-2.5 text-sm text-[#18151d] outline-none"
                  id="article-quote"
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder='e.g. "50 volunteers transformed 2km of coastal beach in under 3 hours."'
                  rows={2}
                  value={quote}
                />
                <span className="mt-1 block text-[11px] text-[#71657c]">
                  Displayed as a prominent callout box in the article detail view.
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  className="font-outfit-bold rounded-2xl border border-[#ded5e8] bg-[#fbf9fe] px-4 py-2.5 text-xs text-[#52495b]"
                  onClick={() => setActiveTab("story")}
                  type="button"
                >
                  ← Back
                </button>
                <button
                  className="font-outfit-bold flex items-center gap-1.5 rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] px-5 py-2.5 text-xs text-[#18151d] shadow-[2px_2px_0_#18151d]"
                  onClick={() => setActiveTab("impact")}
                  type="button"
                >
                  <span>Next: Impact Metrics</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: IMPACT METRICS & UPCOMING EVENT */}
          {activeTab === "impact" && (
            <div className="space-y-4">
              <div>
                <span className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]">
                  Measurable Impact Numbers (Optional)
                </span>
                <p className="font-outfit-regular text-xs text-[#71657c] mt-0.5 mb-2">
                  Add 1 or 2 concrete stats (e.g. "500" + "Trees Planted")
                </p>

                {/* Metric 1 */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    className="font-outfit-regular rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                    onChange={(e) => setMetric1Val(e.target.value)}
                    placeholder='Value: e.g. "500" or "120h"'
                    type="text"
                    value={metric1Val}
                  />
                  <input
                    className="font-outfit-regular rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                    onChange={(e) => setMetric1Lbl(e.target.value)}
                    placeholder='Label: e.g. "Saplings Planted"'
                    type="text"
                    value={metric1Lbl}
                  />
                </div>

                {/* Metric 2 */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="font-outfit-regular rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                    onChange={(e) => setMetric2Val(e.target.value)}
                    placeholder='Value: e.g. "45" or "1.5T"'
                    type="text"
                    value={metric2Val}
                  />
                  <input
                    className="font-outfit-regular rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                    onChange={(e) => setMetric2Lbl(e.target.value)}
                    placeholder='Label: e.g. "Volunteers Joined"'
                    type="text"
                    value={metric2Lbl}
                  />
                </div>
              </div>

              <div className="border-t border-[#e8dff2] pt-3">
                <span className="font-outfit-bold block text-xs uppercase tracking-wider text-[#4f4855]">
                  Connect an Upcoming Event / Action (Optional)
                </span>
                <p className="font-outfit-regular text-xs text-[#71657c] mt-0.5 mb-2">
                  Encourage readers to volunteer for the next phase or drive
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      className="font-outfit-regular w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                      onChange={(e) => setNextEventTitle(e.target.value)}
                      placeholder="e.g. Tree Plantation Drive · Phase 2"
                      type="text"
                      value={nextEventTitle}
                    />
                  </div>
                  <div>
                    <input
                      className="font-outfit-regular w-full rounded-2xl border-2 border-[#18151d] bg-[#fbf9fe] px-3.5 py-2 text-xs text-[#18151d] outline-none"
                      onChange={(e) => setNextEventXp(e.target.value)}
                      placeholder="XP: e.g. 150"
                      type="number"
                      value={nextEventXp}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  className="font-outfit-bold rounded-2xl border border-[#ded5e8] bg-[#fbf9fe] px-4 py-2.5 text-xs text-[#52495b]"
                  onClick={() => setActiveTab("author")}
                  type="button"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="font-outfit-semibold text-xs text-[#d11a2a]">
              {error}
            </p>
          )}

          <div className="pt-3 border-t border-[#f0e7f7]">
            <button
              className="font-outfit-extrabold flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#18151d] bg-[#7c1bd8] py-3.5 text-sm text-white shadow-[3px_4px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_2px_0_#18151d]"
              type="submit"
            >
              <span>Publish Impact Article</span>
              <Icon className="h-4 w-4" name="check" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ArticleDetailModal({
  article,
  onClose,
  onNavigate,
  onVerify,
  onNotice,
}: {
  article: HomeArticle
  onClose: () => void
  onNavigate: (destination: Destination) => void
  onVerify: () => void
  onNotice: (message: string) => void
}) {
  const [following, setFollowing] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(142)
  const [saved, setSaved] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(article.comments || [])

  useEffect(() => {
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", closeOnEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.body.style.overflow = ""
    }
  }, [onClose])

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      onNotice("Article link copied to clipboard!")
    }
  }

  async function handleAddComment(e: FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    const commentText = newComment.trim()
    const commentObj = {
      id: `comment-${Date.now()}`,
      author: "You",
      avatar: "YO",
      time: "Just now",
      text: commentText,
    }
    setComments((prev) => [commentObj, ...prev])
    setNewComment("")
    onNotice("Comment posted!")

    if (article.id) {
      try {
        const res = await articlesApi.addComment(article.id, commentText, "You")
        if (res?.comments) {
          setComments(res.comments)
        }
      } catch (err) {
        // Keep the optimistically added comment in UI
      }
    }
  }

  return (
    <div
      aria-labelledby="article-detail-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm"
      role="dialog"
    >
      <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col bg-[#faf8ff] shadow-2xl overflow-hidden sm:my-auto sm:h-[94vh] sm:rounded-[36px] sm:border-2 sm:border-[#18151d]">
        {/* Sticky Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e5dcf0] bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back to home feed"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded5e8] bg-[#fbf9fe] text-[#18151d] transition hover:bg-[#f1e6ff] active:scale-95"
              onClick={onClose}
              type="button"
            >
              <Icon className="h-5 w-5" name="arrow-left" />
            </button>
            <span className="font-outfit-bold flex items-center gap-1.5 rounded-full bg-[#edddff] px-3 py-1.5 text-xs text-[#5f168e]">
              <Icon className="h-3.5 w-3.5 text-[#3f9a40]" name="leaf" />
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label={saved ? "Saved to bookmarks" : "Bookmark this article"}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#ded5e8] transition active:scale-95 ${
                saved ? "bg-[#d8f23c] text-[#18151d] border-[#18151d]" : "bg-[#fbf9fe] text-[#6d6572] hover:bg-[#f1e6ff]"
              }`}
              onClick={() => {
                setSaved((curr) => !curr)
                onNotice(saved ? "Removed from bookmarks" : "Story bookmarked!")
              }}
              type="button"
            >
              <Icon className="h-4 w-4" name={saved ? "check" : "bookmark"} />
            </button>
            <button
              aria-label="Share article"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded5e8] bg-[#fbf9fe] text-[#18151d] transition hover:bg-[#f1e6ff] active:scale-95"
              onClick={handleShare}
              type="button"
            >
              <Icon className="h-4 w-4" name="share" />
            </button>
            <button
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded5e8] bg-[#fbf9fe] text-[#18151d] transition hover:bg-[#f1e6ff] active:scale-95"
              onClick={onClose}
              type="button"
            >
              <Icon className="h-5 w-5" name="x" />
            </button>
          </div>
        </header>

        {/* Scrollable Story Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-7">
          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-[26px] border-2 border-[#18151d] bg-black shadow-[3px_4px_0_#18151d]">
            <img
              alt={article.alt}
              className="h-56 w-full object-cover sm:h-80"
              src={article.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
              <span className="font-outfit-semibold flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                {article.meta}
              </span>
              <span className="font-outfit-bold rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm text-[#d8f23c]">
                {article.readTime || "3 min read"}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mt-5">
            <h1
              className="font-outfit-extrabold text-[26px] leading-[1.12] tracking-[-0.8px] text-[#18151d] sm:text-[34px]"
              id="article-detail-title"
            >
              {article.title}
            </h1>
            <p className="font-outfit-medium mt-2.5 text-[15px] leading-relaxed text-[#595061] sm:text-base">
              {article.description}
            </p>
          </div>

          {/* Organizer / Author Card */}
          {article.organizer && (
            <div className="mt-5 flex items-center justify-between rounded-2xl border-2 border-[#18151d] bg-white p-3.5 shadow-[2px_3px_0_#18151d]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#f2e8fb] font-outfit-extrabold text-sm text-[#6f19d6]">
                  {article.organizer.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-outfit-bold text-sm text-[#18151d]">
                      {article.organizer.name}
                    </span>
                    {article.organizer.verified && (
                      <span
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-[#18151d] text-[10px] text-[#d8f23c]"
                        title="Verified Community Organization"
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="font-outfit-regular text-xs text-[#756a7d]">
                    {article.organizer.role}
                  </span>
                </div>
              </div>

              <button
                className={`font-outfit-bold rounded-xl border-2 border-[#18151d] px-3.5 py-1.5 text-xs transition ${
                  following
                    ? "bg-[#18151d] text-white"
                    : "bg-[#d8f23c] text-[#18151d] shadow-[2px_2px_0_#18151d] hover:-translate-y-0.5"
                }`}
                onClick={() => {
                  setFollowing((f) => !f)
                  onNotice(following ? "Unfollowed" : `Following ${article.organizer?.name}`)
                }}
                type="button"
              >
                {following ? "Following" : "+ Follow"}
              </button>
            </div>
          )}

          {/* Highlight Quote Callout */}
          {article.quote && (
            <div className="mt-5 rounded-2xl border-l-4 border-l-[#7c1bd8] border-y border-r border-[#e8dcf7] bg-[#f7f0ff] p-4">
              <span className="font-serif text-3xl font-black leading-none text-[#7c1bd8]">“</span>
              <p className="font-outfit-semibold -mt-2 text-sm italic leading-snug text-[#3f2557] sm:text-base">
                {article.quote}
              </p>
            </div>
          )}

          {/* Narrative Content */}
          <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-[#3b3342] sm:text-[15px]">
            {(article.content || [article.description]).map((para, idx) => (
              <p className="font-outfit-regular" key={idx}>
                {para}
              </p>
            ))}
          </div>

          {/* Verified Impact Metrics */}
          {article.stats && article.stats.length > 0 && (
            <div className="mt-7">
              <h3 className="font-outfit-extrabold flex items-center gap-2 text-base text-[#18151d]">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#d8f23c] text-[#18151d]">
                  <Icon className="h-4 w-4" name="award" />
                </span>
                Verified Impact Snapshot
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {article.stats.map((stat, i) => (
                  <div
                    className="flex flex-col rounded-2xl border-2 border-[#18151d] bg-white p-3 text-center shadow-[2px_2px_0_#18151d]"
                    key={i}
                  >
                    <span className="font-outfit-extrabold text-xl text-[#7c1bd8] sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="font-outfit-semibold mt-0.5 text-xs text-[#6e6378]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geo-Tag Proof Banner */}
          {article.geoTag && (
            <div className="mt-5 flex items-center justify-between rounded-2xl border-2 border-[#18151d] bg-[#ddfaf1] p-3.5 shadow-[2px_2px_0_#18151d]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#16a07a] text-white">
                  <Icon className="h-5 w-5" name="map-pin" />
                </span>
                <div>
                  <div className="font-outfit-bold text-xs text-[#0f5c46]">
                    GPS Verified Impact
                  </div>
                  <div className="font-outfit-medium text-xs text-[#18151d]">
                    {article.geoTag.location}
                  </div>
                </div>
              </div>

              <button
                className="font-outfit-bold flex items-center gap-1.5 rounded-xl border-2 border-[#18151d] bg-white px-3 py-1.5 text-xs text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5"
                onClick={() => {
                  onClose()
                  onVerify()
                }}
                type="button"
              >
                <span>View Proof</span>
                <Icon className="h-3.5 w-3.5 text-[#16a07a]" name="check" />
              </button>
            </div>
          )}

          {/* Connected Action: Upcoming Opportunity / Bridge */}
          {article.relatedEvent && (
            <div className="mt-7 rounded-[26px] border-2 border-[#18151d] bg-gradient-to-br from-[#f5edff] to-[#ecdcff] p-4 sm:p-5 shadow-[4px_5px_0_#18151d]">
              <div className="flex items-center justify-between">
                <span className="font-outfit-extrabold rounded-full bg-[#d8f23c] px-3 py-1 text-xs text-[#18151d] border border-[#18151d]">
                  Next Action Opportunity
                </span>
                <span className="font-outfit-bold text-xs text-[#6f19d6] flex items-center gap-1">
                  ⭐ +{article.relatedEvent.xp} XP
                </span>
              </div>

              <h4 className="font-outfit-extrabold mt-3 text-lg text-[#18151d]">
                {article.relatedEvent.title}
              </h4>

              <div className="mt-2.5 space-y-1 text-xs text-[#52495b] font-outfit-medium">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#7c1bd8]" name="calendar" />
                  <span>{article.relatedEvent.date} · {article.relatedEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#7c1bd8]" name="map-pin" />
                  <span>{article.relatedEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#3f9a40]" name="leaf" />
                  <span>{article.relatedEvent.volunteers}</span>
                </div>
              </div>

              <button
                className="font-outfit-extrabold mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#18151d] bg-[#18151d] py-3 text-sm text-[#d8f23c] shadow-[2px_3px_0_#7c1bd8] transition hover:-translate-y-0.5 active:translate-y-0.5"
                onClick={() => {
                  onClose()
                  onNavigate("my-events")
                  onNotice(`Registered interest in ${article.relatedEvent?.title}`)
                }}
                type="button"
              >
                <span>Join Event & Claim {article.relatedEvent.xp} XP</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* Social Proof & Comments Section */}
          <div className="mt-8 border-t border-[#e8dff2] pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className={`font-outfit-bold flex items-center gap-1.5 rounded-full border-2 border-[#18151d] px-4 py-2 text-xs transition ${
                    liked
                      ? "bg-[#d8f23c] text-[#18151d] shadow-[2px_2px_0_#18151d]"
                      : "bg-white text-[#18151d] hover:bg-[#f3eaff]"
                  }`}
                  onClick={() => {
                    setLiked((l) => !l)
                    setLikeCount((c) => (liked ? c - 1 : c + 1))
                    onNotice(liked ? "Like removed" : "Cheered this story!")
                  }}
                  type="button"
                >
                  <Icon
                    className={`h-4 w-4 ${liked ? "text-[#e0245e] fill-current" : "text-[#756a7d]"}`}
                    name="heart"
                  />
                  <span>{likeCount} Cheered</span>
                </button>
              </div>

              <span className="font-outfit-semibold flex items-center gap-1 text-xs text-[#756a7d]">
                <Icon className="h-4 w-4 text-[#7c1bd8]" name="message-circle" />
                {comments.length} Volunteer Voices
              </span>
            </div>

            {/* Comment input */}
            <form className="mt-4 flex gap-2" onSubmit={handleAddComment}>
              <input
                className="font-outfit-regular flex-1 rounded-2xl border-2 border-[#18151d] bg-white px-4 py-2.5 text-xs text-[#18151d] outline-none transition focus:border-[#7c1bd8]"
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your encouragement or thoughts..."
                type="text"
                value={newComment}
              />
              <button
                className="font-outfit-bold rounded-2xl border-2 border-[#18151d] bg-[#d8f23c] px-4 py-2.5 text-xs text-[#18151d] shadow-[2px_2px_0_#18151d] transition hover:-translate-y-0.5 active:translate-y-0"
                type="submit"
              >
                Post
              </button>
            </form>

            {/* Comments list */}
            <div className="mt-4 space-y-3">
              {comments.map((comm) => (
                <div
                  className="rounded-2xl border border-[#e4d9f0] bg-white p-3 text-xs"
                  key={comm.id}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f2e8fb] font-outfit-bold text-[10px] text-[#7c1bd8]">
                        {comm.avatar}
                      </div>
                      <span className="font-outfit-bold text-[#18151d]">
                        {comm.author}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8e8596]">{comm.time}</span>
                  </div>
                  <p className="font-outfit-regular mt-1.5 text-[#42394a]">
                    {comm.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next")
  const [showArticleForm, setShowArticleForm] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<HomeArticle | null>(null)
  const [isDbConnected, setIsDbConnected] = useState(false)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const swipeStartY = useRef<number | null>(null)

  useEffect(() => {
    let active = true
    articlesApi
      .list()
      .then((res) => {
        if (active && res?.articles && res.articles.length > 0) {
          setArticles(res.articles)
          setIsDbConnected(true)
        }
      })
      .catch((err) => {
        console.warn("Backend not reached, falling back to cached stories:", err)
        setIsDbConnected(false)
      })
      .finally(() => {
        if (active) setLoadingArticles(false)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedArticle || showArticleForm) return
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        showNextArticle()
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        showPreviousArticle()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedArticle, showArticleForm, articles.length, changingArticle])

  const article = articles[articleIndex]
  const nextArticle = articles[(articleIndex + 1) % articles.length]
  const followingArticle = articles[(articleIndex + 2) % articles.length]

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2000)
  }

  function showPreviousArticle() {
    if (changingArticle || articles.length <= 1) return
    setSlideDirection("prev")
    setChangingArticle(true)
    window.setTimeout(() => {
      setArticleIndex((current) => (current - 1 + articles.length) % articles.length)
      setLiked(false)
      setSaved(false)
      setChangingArticle(false)
    }, 220)
  }

  function showNextArticle() {
    if (changingArticle || articles.length <= 1) return
    setSlideDirection("next")
    setChangingArticle(true)
    window.setTimeout(() => {
      setArticleIndex((current) => (current + 1) % articles.length)
      setLiked(false)
      setSaved(false)
      setChangingArticle(false)
    }, 220)
  }

  return (
    <main className="font-outfit-regular relative min-h-dvh overflow-x-hidden bg-[#faf8ff] text-[#18151d] antialiased">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#f3e7ff] opacity-70 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#e8fbe8] opacity-70 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2 sm:px-8 sm:pt-6">
        <div>
          <h1 className="font-outfit-extrabold text-2xl leading-none tracking-tight sm:text-3xl">
            Seva<span className="text-[#6f19d6]">Sathi</span>
          </h1>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isDbConnected ? "bg-[#34c759] shadow-[0_0_8px_#34c759]" : "bg-[#f59e0b]"
              }`}
            />
            <p className="font-outfit-semibold text-xs text-[#6d6572]">
              {isDbConnected ? "Live Database Connected" : "Community Impact Feed"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="View notifications"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#18151d] bg-white shadow-[2px_3px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#18151d]"
            onClick={() => showNotice("No new notifications")}
            type="button"
          >
            <Icon className="h-5 w-5 text-[#18151d]" name="bell" />
          </button>
        </div>
      </header>

      {/* Main Card Viewport */}
      <section className="relative z-10 mx-auto flex max-w-md flex-col px-4 pt-2 pb-28 sm:max-w-lg sm:px-6">
        {/* Navigation Indicator & Arrows */}
        <div className="mb-2 flex items-center justify-between px-2 text-xs font-outfit-semibold text-[#6d6572]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6f19d6]" />
            Story {articleIndex + 1} of {articles.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Previous story"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#18151d] bg-white text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              onClick={showPreviousArticle}
              title="Previous story (Scroll Down / Arrow Up)"
              type="button"
            >
              <Icon className="h-3.5 w-3.5" name="chevron-up" />
            </button>
            <button
              aria-label="Next story"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#18151d] bg-white text-[#18151d] shadow-[1.5px_1.5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              onClick={showNextArticle}
              title="Next story (Scroll Up / Arrow Down)"
              type="button"
            >
              <Icon className="h-3.5 w-3.5" name="chevron-down" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full">
          {/* Card Stack Shadows */}
          <div
            aria-hidden="true"
            className="absolute inset-x-5 bottom-[-12px] top-4 rotate-[4deg] overflow-hidden rounded-[28px] border-2 border-white bg-white opacity-50 shadow-[0_10px_24px_rgba(105,48,150,0.12)]"
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

          {/* Active Article Card */}
          <article
            aria-label={`${article.title}. Tap to read full story. Swipe down for previous, swipe up for next.`}
            className={`touch-none relative z-10 overflow-hidden rounded-[28px] border-2 border-white bg-white shadow-[0_12px_34px_rgba(105,48,150,0.18)] transition-all duration-200 ${
              changingArticle
                ? slideDirection === "next"
                  ? "-translate-y-8 opacity-0 scale-[0.98]"
                  : "translate-y-8 opacity-0 scale-[0.98]"
                : "translate-y-0 opacity-100 scale-100"
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
              if (startY !== null) {
                const diff = startY - event.clientY
                if (diff > 45) {
                  showNextArticle() // Swiped up -> show next
                } else if (diff < -45) {
                  showPreviousArticle() // Swiped down -> show previous
                }
              }
            }}
            onWheel={(event) => {
              if (event.deltaY > 40) {
                showNextArticle()
              } else if (event.deltaY < -40) {
                showPreviousArticle()
              }
            }}
          >
            {/* Tappable Media Area */}
            <div
              className="group relative h-[230px] cursor-pointer overflow-hidden sm:h-[400px]"
              onClick={() => setSelectedArticle(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedArticle(article)
                }
              }}
            >
              <img
                alt={article.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                src={article.image}
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <span className="font-outfit-bold flex items-center gap-1.5 rounded-full bg-[#edddff] px-3.5 py-2 text-[13px] text-[#5f168e] shadow-sm sm:px-5 sm:py-3 sm:text-sm">
                  <Icon className="h-4 w-4 text-[#3f9a40] sm:h-5 sm:w-5" name="leaf" />
                  {article.category}
                </span>
                <button
                  aria-label={saved ? "Remove saved story" : "Save this story"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md transition sm:h-12 sm:w-12 ${
                    saved
                      ? "bg-[#d8f23c] text-[#18151d]"
                      : "bg-white text-[#8d24e8]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
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

              {/* Tap prompt badge */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 font-outfit-semibold text-xs text-white backdrop-blur-sm transition group-hover:bg-[#7c1bd8]">
                Read story ↗
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="font-outfit-semibold text-[13px] text-[#6d6572] sm:text-sm">
                  {article.meta}
                </p>
                <span className="font-outfit-bold rounded-full bg-[#f2e8fb] px-3 py-1 text-xs text-[#6f19b6]">
                  {articleIndex + 1} / {articles.length}
                </span>
              </div>

              {/* Title & snippet */}
              <div
                className="cursor-pointer"
                onClick={() => setSelectedArticle(article)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelectedArticle(article)
                  }
                }}
              >
                <h2 className="font-outfit-extrabold mt-2.5 text-[24px] leading-[1.08] tracking-[-0.8px] text-[#18151d] transition hover:text-[#6f19d6] sm:mt-4 sm:text-[38px]">
                  {article.title}
                </h2>
                <p className="font-outfit-regular mt-2 text-[15px] leading-relaxed text-[#4f4855] sm:mt-4 sm:text-xl">
                  {article.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
                <button
                  className="font-outfit-semibold group flex flex-col items-center gap-2 text-[13px] sm:text-sm"
                  onClick={() =>
                    showNotice("We’ll show fewer stories like this")
                  }
                  type="button"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe8f1] text-[#ff3d62] transition group-hover:scale-105 sm:h-16 sm:w-16">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" name="x" />
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eadcff] text-[#8229d7] transition group-hover:scale-105 sm:h-16 sm:w-16">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" name="check" />
                  </span>
                  Verify
                </button>
                <button
                  aria-pressed={liked}
                  className="font-outfit-semibold group flex flex-col items-center gap-2 text-sm"
                  onClick={() => {
                    const willLike = !liked
                    setLiked(willLike)
                    if (willLike && article?.id) {
                      articlesApi.like(article.id).catch(() => {})
                    }
                    showNotice(
                      willLike ? "Saved to your liked impact stories" : "Like removed",
                    )
                  }}
                  type="button"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition group-hover:scale-105 sm:h-16 sm:w-16 ${
                      liked
                        ? "bg-[#d8f23c] text-[#187b60]"
                        : "bg-[#ddfaf1] text-[#16a07a]"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 sm:h-8 sm:w-8 ${liked ? "fill-current" : ""}`}
                      name="heart"
                    />
                  </span>
                  Like
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Floating Add Article Button */}
        <button
          aria-label="Add an article"
          className="fixed bottom-[calc(112px+env(safe-area-inset-bottom))] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#18151d] bg-[#d8f23c] text-[#6f19d6] shadow-[4px_5px_0_#18151d] transition hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_3px_0_#18151d] sm:right-8"
          onClick={() => setShowArticleForm(true)}
          type="button"
        >
          <Icon className="h-7 w-7" name="plus" />
        </button>
      </section>

      {notice && (
        <div
          className="font-outfit-semibold fixed left-1/2 top-5 z-50 max-w-[92vw] -translate-x-1/2 rounded-full border-2 border-[#18151d] bg-white px-4 py-2.5 text-center text-[13px] shadow-[3px_4px_0_#18151d] sm:px-5 sm:py-3 sm:text-sm"
          role="status"
        >
          {notice}
        </div>
      )}

      {/* Add Article Modal */}
      {showArticleForm && (
        <AddArticleModal
          onAdd={async (newArticle) => {
            try {
              const res = await articlesApi.create(newArticle)
              if (res?.article) {
                setArticles((current) => [res.article, ...current])
                setIsDbConnected(true)
                showNotice("Saved to database & published!")
              } else {
                setArticles((current) => [newArticle, ...current])
                showNotice("Your article is now live")
              }
            } catch (err) {
              setArticles((current) => [newArticle, ...current])
              showNotice("Your article is live (local backup)")
            }
            setArticleIndex(0)
            setLiked(false)
            setSaved(false)
            setShowArticleForm(false)
          }}
          onClose={() => setShowArticleForm(false)}
        />
      )}

      {/* Article Detail Plan Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onNavigate={onNavigate}
          onNotice={showNotice}
          onVerify={onVerify}
        />
      )}

      {/* Bottom Navigation */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto grid h-[calc(78px+env(safe-area-inset-bottom))] max-w-[760px] grid-cols-5 rounded-t-[28px] border-x-2 border-t-2 border-[#e3dce8] bg-white px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(84,36,119,0.10)]"
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
