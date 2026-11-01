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
  listMine: () => request<EventsResponse>("/events/mine"),
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
