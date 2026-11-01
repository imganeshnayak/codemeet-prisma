export type ApiUser = {
  id: string
  name: string
  email: string
  location: string
  bio: string
  interests: string[]
  photoUrl?: string
  createdAt?: string
  updatedAt?: string
}

export type ProfileUpdate = Pick<
  ApiUser,
  "name" | "email" | "location" | "bio" | "interests"
>

export type ApiMemory = {
  id: string
  label: string
  src: string
  type: "image" | "video"
  uploaded?: boolean
  likesCount?: number
  liked?: boolean
  createdAt?: string
}

export type ApiEvent = {
  id: string
  role: "attending" | "organizing"
  title: string
  description: string
  category: string
  date: string
  time: string
  location: string
  capacity: number
  skills: string
  image: string
  status: "Upcoming" | "Ongoing" | "Completed"
  organizer: string
  assignment?: string
  volunteers: number
  tasks: number
<<<<<<< HEAD
=======
}

export type ApiTask = {
  id: string
  creatorId?: string
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
  donation?: boolean
>>>>>>> 688a833486bc0931d6082525e6ee8de2bf311d3a
}

export type AuthInput = {
  name?: string
  email: string
  password: string
}

type AuthResponse = { token: string; user: ApiUser }
type UserResponse = { user: ApiUser }
type EventsResponse = { events: ApiEvent[] }
type EventResponse = { event: ApiEvent }
type TasksResponse = { tasks: ApiTask[] }
type TaskResponse = { task: ApiTask }

const API_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"
).replace(/\/$/, "")

const TOKEN_KEY = "sevasathi.token"

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export function getStoredToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function storeToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(
  path: string,
  options: {
    method?: string
    body?: unknown
    auth?: boolean
    formData?: FormData
  } = {},
): Promise<T> {
  const { method = "GET", body, auth = true, formData } = options
  const headers: Record<string, string> = {}
  const token = getStoredToken()

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`
  }

  let payload: BodyInit | undefined

  if (formData) {
    payload = formData
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json"
    payload = JSON.stringify(body)
  }

  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: payload,
    })
  } catch {
    throw new ApiError(
      "Cannot reach the server. Make sure the backend is running.",
      0,
    )
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      (data as { message?: string } | null)?.message ??
        "Something went wrong. Please try again.",
      response.status,
    )
  }

  return data as T
}

export const authApi = {
  register: (input: AuthInput) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: input,
      auth: false,
    }),
  login: (input: AuthInput) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: input,
      auth: false,
    }),
  me: () => request<UserResponse>("/auth/me"),
}

export const memoriesApi = {
  list: () => request<{ memories: ApiMemory[] }>("/memories"),
  upload: (file: File, label: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("label", label)
    return request<{ memory: ApiMemory }>("/memories", {
      method: "POST",
      formData,
    })
  },
  remove: (id: string) =>
    request<{ success: boolean }>(`/memories/${id}`, { method: "DELETE" }),
  like: (id: string) =>
    request<{ memory: ApiMemory }>(`/memories/${id}/like`, { method: "POST" }),
}
export const profileApi = {
  update: (input: ProfileUpdate) =>
    request<UserResponse>("/profile", { method: "PATCH", body: input }),
  uploadPhoto: (file: File) => {
    const formData = new FormData()
    formData.append("photo", file)
    return request<UserResponse>("/profile/photo", {
      method: "POST",
      formData,
    })
  },
  removePhoto: () =>
    request<UserResponse>("/profile/photo", { method: "DELETE" }),
}

export const eventsApi = {
  listAll: () => request<EventsResponse>("/events"),
  listMine: () => request<EventsResponse>("/events/mine"),
  join: (id: string) =>
    request<EventResponse>(`/events/${id}/join`, { method: "POST" }),
  create: (input: {
    title: string
    description: string
    category: string
    date: string
    time: string
    location: string
    capacity: number
    skills: string
    image: string
  }) => request<EventResponse>("/events", { method: "POST", body: input }),
}

export const tasksApi = {
  listFeed: () => request<TasksResponse>("/tasks/feed"),
  create: (input: {
    eventId: string
    title: string
    description: string
    category: string
    volunteers: number
    points: string
    image?: string
  }) => request<TaskResponse>("/tasks", { method: "POST", body: input }),
}
export type ApiArticle = {
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
  likesCount?: number
  createdAt?: string
}

export const articlesApi = {
  list: () =>
    request<{ articles: ApiArticle[] }>("/articles", { auth: false }),
  get: (id: string) =>
    request<{ article: ApiArticle }>(`/articles/${id}`, { auth: false }),
  create: (input: Partial<ApiArticle>) =>
    request<{ article: ApiArticle }>("/articles", { method: "POST", body: input }),
  like: (id: string) =>
    request<{ success: boolean; likesCount: number }>(`/articles/${id}/like`, {
      method: "POST",
    }),
  addComment: (id: string, text: string, author?: string) =>
    request<{
      comment: NonNullable<ApiArticle["comments"]>[number]
      comments: ApiArticle["comments"]
    }>(`/articles/${id}/comments`, {
      method: "POST",
      body: { text, author },
    }),
}
export type ApiDonationStage = {
  stage: "pledged" | "procured" | "prepared" | "distributed"
  title: string
  description: string
  timestamp: string
  photoUrl: string
  geoTag: {
    location: string
    coordinates: string
    verified: boolean
  }
  volunteer: {
    name: string
    role: string
    avatar: string
  }
  completed: boolean
}

export type ApiDonationCampaign = {
  id: string
  campaignId: string
  organizer: string
  title: string
  description: string
  category:
    | "Clothes"
    | "Education"
    | "Food"
    | "Medical"
    | "Animal Care"
    | "Hygiene"
    | "Emergency Relief"
  donationItem: string
  unitCost: number
  targetUnits: number
  raisedUnits: number
  targetAmount: number
  raisedAmount: number
  location: string
  beneficiaryGroup: string
  image: string
  status: "Active" | "Procuring" | "Preparing" | "Distributed" | "Completed"
  currentStage: "pledged" | "procured" | "prepared" | "distributed"
  stages: ApiDonationStage[]
  expenses: {
    id: string
    item: string
    amount: number
    vendor: string
    date: string
    receiptUrl: string
  }[]
  donors: {
    ticketId: string
    donorName: string
    units: number
    amount: number
    timestamp: string
  }[]
  createdAt?: string
  updatedAt?: string
}

export type ApiDonationTicket = {
  id: string
  ticketId: string
  donorName: string
  donorEmail: string
  mealCount: number
  amount: number
  cause: string
  location: string
  beneficiaryGroup: string
  dedication?: string
  status: "pledged" | "procured" | "prepared" | "distributed"
  stages: ApiDonationStage[]
  createdAt: string
  updatedAt: string
}

export const donationsApi = {
  purchaseTicket: (input: {
    mealCount: number
    cause?: string
    location?: string
    dedication?: string
    donorName?: string
    donorEmail?: string
  }) =>
    request<{ success: boolean; ticket: ApiDonationTicket }>("/donations/ticket", {
      method: "POST",
      body: input,
    }),
  getTicket: (ticketId: string) =>
    request<{ ticket: ApiDonationTicket }>(`/donations/track/${ticketId}`, {
      auth: false,
    }),
  getLatest: () =>
    request<{ ticket: ApiDonationTicket }>("/donations/latest", {
      auth: false,
    }),
  listCampaigns: () =>
    request<{ campaigns: ApiDonationCampaign[] }>("/donations/campaigns", {
      auth: false,
    }),
  getCampaign: (id: string) =>
    request<{ campaign: ApiDonationCampaign }>(`/donations/campaigns/${id}`, {
      auth: false,
    }),
  createCampaign: (data: Partial<ApiDonationCampaign>) =>
    request<{ success: boolean; campaign: ApiDonationCampaign }>(
      "/donations/campaigns",
      { method: "POST", body: data }
    ),
  broadcastStage: (
    id: string,
    data: {
      stage?: string
      photoUrl?: string
      coordinates?: string
      location?: string
      notes?: string
    }
  ) =>
    request<{ success: boolean; campaign: ApiDonationCampaign }>(
      `/donations/campaigns/${id}/broadcast-stage`,
      { method: "POST", body: data }
    ),
  addExpense: (
    id: string,
    data: { item: string; amount: number; vendor?: string; date?: string }
  ) =>
    request<{ success: boolean; expenses: any[] }>(
      `/donations/campaigns/${id}/expenses`,
      { method: "POST", body: data }
    ),
  advanceStage: (ticketId: string) =>
    request<{ success: boolean; ticket: ApiDonationTicket }>(`/donations/${ticketId}/advance`, {
      method: "POST",
    }),
}
