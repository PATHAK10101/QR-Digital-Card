const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000/api"

export interface ApiProfile {
  id: number
  slug: string

  name: string
  role: string
  company: string
  bio: string

  email: string
  phone: string
  location: string

  github: string
  linkedin: string
  website: string

  photo: string | null
  photo_url: string | null

  is_public: boolean

  created_at: string
  updated_at: string
}

async function getErrorMessage(
  response: Response,
  fallback: string,
) {
  try {
    const data = await response.json()

    if (typeof data?.detail === "string") {
      return data.detail
    }

    const firstError = Object.values(data ?? {})
      .flat()
      .find(
        (value): value is string =>
          typeof value === "string",
      )

    if (firstError) {
      return firstError
    }
  } catch {
    return fallback
  }

  return fallback
}

export async function createProfile(
  formData: FormData,
): Promise<ApiProfile> {
  const response = await fetch(
    `${API_URL}/profiles/`,
    {
      method: "POST",
      body: formData,
    },
  )

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to create your profile.",
      ),
    )
  }

  return response.json()
}

export async function getProfile(
  slug: string,
): Promise<ApiProfile> {
  const response = await fetch(
    `${API_URL}/profiles/${encodeURIComponent(slug)}/`,
    {
      cache: "no-store",
    },
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("PROFILE_NOT_FOUND")
    }

    throw new Error(
      "Unable to load this profile.",
    )
  }

  return response.json()
}

export async function updateProfile(
  slug: string,
  formData: FormData,
): Promise<ApiProfile> {
  const response = await fetch(
    `${API_URL}/profiles/${encodeURIComponent(slug)}/`,
    {
      method: "PATCH",
      body: formData,
    },
  )

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to update your profile.",
      ),
    )
  }

  return response.json()
}