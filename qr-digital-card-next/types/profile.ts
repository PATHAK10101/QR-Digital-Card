export interface Profile {
  id?: number
  slug?: string

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

  photoUrl: string
}

export type ProfileField =
  | "name"
  | "role"
  | "company"
  | "bio"
  | "email"
  | "phone"
  | "location"
  | "github"
  | "linkedin"
  | "website"
  | "photoUrl"