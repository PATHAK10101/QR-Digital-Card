"use client"

import { useState } from "react"

import Link from "next/link"

import {
  ArrowLeft,
  Check,
  Loader2,
  QrCode,
  Save,
  Sparkles,
} from "lucide-react"

import DigitalCard from "@/components/card/DigitalCard"
import ProfileForm from "@/components/profile/ProfileForm"
import QRGenerator from "@/components/qr/QRGenerator"

import {
  createProfile,
  updateProfile,
} from "@/lib/api"

import type {
  Profile,
  ProfileField,
} from "@/types/profile"

const DEFAULT_PROFILE: Profile = {
  name: "",
  role: "",
  company: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  website: "",
  photoUrl: "",
}

export default function CreatePage() {
  const [profile, setProfile] =
    useState<Profile>(DEFAULT_PROFILE)

  const [photoFile, setPhotoFile] =
    useState<File | null>(null)

  const [slug, setSlug] =
    useState<string | null>(null)

  const [isSaving, setIsSaving] =
    useState(false)

  const [saved, setSaved] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const updateProfileField = (
    field: ProfileField,
    value: string,
  ) => {
    setSaved(false)
    setError(null)

    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handlePhotoChange = (
    file: File | null,
  ) => {
    if (!file) {
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Photo must be smaller than 5 MB.",
      )
      return
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a JPG, PNG, or WEBP image.",
      )
      return
    }

    setError(null)
    setSaved(false)
    setPhotoFile(file)

    const previewUrl =
      URL.createObjectURL(file)

    setProfile((current) => ({
      ...current,
      photoUrl: previewUrl,
    }))
  }

  const buildFormData = () => {
    const formData = new FormData()

    formData.append(
      "name",
      profile.name.trim(),
    )

    formData.append(
      "role",
      profile.role.trim(),
    )

    formData.append(
      "company",
      profile.company.trim(),
    )

    formData.append(
      "bio",
      profile.bio.trim(),
    )

    formData.append(
      "email",
      profile.email.trim(),
    )

    formData.append(
      "phone",
      profile.phone.trim(),
    )

    formData.append(
      "location",
      profile.location.trim(),
    )

    formData.append(
      "github",
      profile.github.trim(),
    )

    formData.append(
      "linkedin",
      profile.linkedin.trim(),
    )

    formData.append(
      "website",
      profile.website.trim(),
    )

    if (photoFile) {
      formData.append(
        "photo",
        photoFile,
      )
    }

    return formData
  }

  const handleSave = async () => {
    setError(null)
    setSaved(false)
    setIsSaving(true)

    try {
      const formData = buildFormData()

      if (!slug) {
        const created =
          await createProfile(formData)

        setSlug(created.slug)

        setProfile((current) => ({
          ...current,
          id: created.id,
          slug: created.slug,
          photoUrl:
            created.photo_url ??
            current.photoUrl,
        }))

        setPhotoFile(null)
        setSaved(true)
        return
      }

      const updated =
        await updateProfile(
          slug,
          formData,
        )

      setProfile((current) => ({
        ...current,

        id: updated.id,
        slug: updated.slug,

        name: updated.name ?? "",
        role: updated.role ?? "",
        company: updated.company ?? "",
        bio: updated.bio ?? "",

        email: updated.email ?? "",
        phone: updated.phone ?? "",
        location: updated.location ?? "",

        github: updated.github ?? "",
        linkedin: updated.linkedin ?? "",
        website: updated.website ?? "",

        photoUrl:
          updated.photo_url ??
          current.photoUrl,
      }))

      setPhotoFile(null)
      setSaved(true)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : slug
            ? "Unable to save your changes."
            : "Unable to create your card.",
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <header className="border-b border-white/7">
        <div className="mx-auto flex h-18 w-[min(1240px,calc(100%-32px))] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5">
              <QrCode size={17} />
            </span>

            QR

            <span className="text-violet-300">
              Card
            </span>
          </Link>

          <span className="flex items-center gap-2 text-[10px] text-white/30">
            <span className="size-1.5 rounded-full bg-emerald-300" />

            {slug
              ? "Card editor"
              : "Card builder"}
          </span>
        </div>
      </header>

      <div className="mx-auto w-[min(1240px,calc(100%-32px))] py-10 sm:py-14">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-xs text-white/30 transition hover:text-white/70"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/5 px-3 py-1.5 text-[10px] font-semibold text-violet-200/70">
            <Sparkles size={12} />

            {slug
              ? "EDIT DIGITAL IDENTITY"
              : "DIGITAL IDENTITY"}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
            {slug
              ? "Update your card."
              : "Create your card."}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
            {slug
              ? "Change anything you want. Your permanent QR code will continue to work."
              : "Add the details you want to share. Everything is optional. Create your card whenever you are ready."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <section className="rounded-3xl border border-white/8 bg-[#111218]/70 p-5 sm:p-7">
            <ProfileForm
              profile={profile}
              onChange={updateProfileField}
              onPhotoChange={handlePhotoChange}
            />

            {error && (
              <div className="mt-6 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3">
                <p className="text-xs text-red-200/70">
                  {error}
                </p>
              </div>
            )}

            {saved && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-300/10 bg-emerald-300/5 px-4 py-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-300/10 text-emerald-300">
                  <Check size={14} />
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-emerald-100/80">
                    {slug
                      ? "Your card has been updated"
                      : "Your card is live"}
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/30">
                    Your permanent QR code remains unchanged.
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSaving ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  {slug
                    ? "Saving changes..."
                    : "Creating your card..."}
                </>
              ) : slug ? (
                <>
                  Save changes
                  <Save size={15} />
                </>
              ) : (
                <>
                  Create my card
                  <QrCode size={15} />
                </>
              )}
            </button>
          </section>

          <aside className="rounded-3xl border border-white/8 bg-[#111218]/70 p-5 sm:p-7">
            <div>
              <p className="section-label">
                LIVE PREVIEW
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Your digital card
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Click the card to flip it.
              </p>
            </div>

            <div className="flex min-h-[360px] items-center justify-center py-8">
              <DigitalCard
                profile={profile}
              />
            </div>

            {slug ? (
              <div className="mt-2 border-t border-white/7 pt-7">
                <QRGenerator
                  profileId={slug}
                />
              </div>
            ) : (
              <div className="border-t border-white/7 pt-7">
                <div className="rounded-2xl border border-dashed border-white/8 bg-white/[0.02] p-6 text-center">
                  <div className="mx-auto grid size-10 place-items-center rounded-xl border border-white/8 bg-white/5 text-white/25">
                    <QrCode size={18} />
                  </div>

                  <p className="mt-3 text-xs font-medium text-white/45">
                    Your QR code will appear here
                  </p>

                  <p className="mx-auto mt-1 max-w-xs text-[10px] leading-4 text-white/20">
                    Add any details you want, then
                    create your card to generate a
                    permanent QR code.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}