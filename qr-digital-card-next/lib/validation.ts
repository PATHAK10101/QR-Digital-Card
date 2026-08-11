import type { Profile } from "@/types/profile"

export function isValidEmail(email: string): boolean {
  if (!email.trim()) {
    return true
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateProfile(profile: Profile): string[] {
  const errors: string[] = []

  if (!profile.name.trim()) {
    errors.push("Name is required.")
  }

  if (!profile.role.trim()) {
    errors.push("Role is required.")
  }

  if (!isValidEmail(profile.email)) {
    errors.push("Please enter a valid email address.")
  }

  return errors
}