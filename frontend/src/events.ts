export type EventRole = "attending" | "organizing"
export type EventStatus = "Upcoming" | "Ongoing" | "Completed"

export type SevaEvent = {
  id: string
  role: EventRole
  title: string
  description: string
  category: string
  date: string
  time: string
  location: string
  capacity: number
  skills: string
  image: string
  status: EventStatus
  organizer: string
  assignment?: string
  volunteers: number
  tasks: number
}

export type CreateEventInput = Pick<SevaEvent, "title" | "description" | "category" | "date" | "time" | "location" | "capacity" | "skills" | "image">

export const fallbackEventImage = "/assets/task-tree.jpg"

export const initialEvents: SevaEvent[] = [
  {
    id: "attending-tree-drive",
    role: "attending",
    title: "Tree Plantation Drive",
    description:
      "Plant native saplings with local volunteers and help restore a community green space.",
    category: "Environment",
    date: "2025-10-12",
    time: "9:00 AM – 12:00 PM",
    location: "Mangaluru, Karnataka",
    capacity: 30,
    skills: "Teamwork",
    image: "/assets/task-tree.jpg",
    status: "Ongoing",
    organizer: "Green Mangaluru",
    assignment: "Planting Saplings",
    volunteers: 24,
    tasks: 4,
  },
  {
    id: "attending-garden-day",
    role: "attending",
    title: "Community Garden Day",
    description:
      "Prepare shared garden beds and help neighbourhood families grow fresh food.",
    category: "Community",
    date: "2025-10-20",
    time: "8:30 AM – 11:30 AM",
    location: "Bengaluru, Karnataka",
    capacity: 40,
    skills: "Gardening, Teamwork",
    image: "/assets/task-garden.jpg",
    status: "Upcoming",
    organizer: "Namma Neighbourhood",
    assignment: "Garden Bed Prep",
    volunteers: 31,
    tasks: 5,
  },
  {
    id: "attending-food-drive",
    role: "attending",
    title: "Weekend Food Drive",
    description:
      "Sort and distribute essential groceries for families across the city.",
    category: "Community",
    date: "2025-09-28",
    time: "10:00 AM – 2:00 PM",
    location: "Udupi, Karnataka",
    capacity: 25,
    skills: "Organisation",
    image: "/assets/405bb.png",
    status: "Completed",
    organizer: "Care Circle",
    assignment: "Distribution Support",
    volunteers: 25,
    tasks: 3,
  },
  {
    id: "organizing-tree-drive",
    role: "organizing",
    title: "Tree Plantation Drive",
    description:
      "Bring volunteers together to plant native trees and create a healthier neighbourhood.",
    category: "Environment",
    date: "2025-10-12",
    time: "9:00 AM – 12:00 PM",
    location: "Mangaluru, Karnataka",
    capacity: 30,
    skills: "Teamwork, Photography",
    image: "/assets/b3227.png",
    status: "Ongoing",
    organizer: "Aarav Sharma",
    volunteers: 15,
    tasks: 4,
  },
  {
    id: "organizing-coastal-cleanup",
    role: "organizing",
    title: "Coastal Cleanup Morning",
    description:
      "Coordinate a focused cleanup to protect the shoreline and local wildlife.",
    category: "Conservation",
    date: "2025-11-02",
    time: "7:00 AM – 10:30 AM",
    location: "Panambur Beach, Mangaluru",
    capacity: 50,
    skills: "Teamwork",
    image: "/assets/task-forest.jpg",
    status: "Upcoming",
    organizer: "Aarav Sharma",
    volunteers: 28,
    tasks: 3,
  },
]

export function formatEventDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed)
}
