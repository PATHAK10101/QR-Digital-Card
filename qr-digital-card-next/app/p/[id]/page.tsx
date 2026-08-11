import { notFound } from "next/navigation"

import DigitalCard from "@/components/card/DigitalCard"
import { getProfile } from "@/lib/api"

interface ProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { id } = await params

  let profile

  try {
    profile = await getProfile(id)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "PROFILE_NOT_FOUND"
    ) {
      notFound()
    }

    throw error
  }

  return (
    <main className="min-h-screen bg-[#08090d] px-5 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <DigitalCard
          profile={{
            id: profile.id,
            slug: profile.slug,

            name: profile.name,
            role: profile.role,
            company: profile.company,
            bio: profile.bio,

            email: profile.email,
            phone: profile.phone,
            location: profile.location,

            github: profile.github,
            linkedin: profile.linkedin,
            website: profile.website,

            photoUrl:
              profile.photo_url ?? "",
          }}
        />
      </div>
    </main>
  )
}