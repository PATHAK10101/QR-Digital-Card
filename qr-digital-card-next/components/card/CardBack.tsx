"use client"

import {
  Building2,
  Globe,
  Link2,
  MapPin,
  QrCode,
} from "lucide-react"

import type { Profile } from "@/types/profile"

interface CardBackProps {
  profile: Profile
}

export default function CardBack({
  profile,
}: CardBackProps) {
  const hasExtraDetails =
    Boolean(profile.bio) ||
    Boolean(profile.company) ||
    Boolean(profile.location) ||
    Boolean(profile.github) ||
    Boolean(profile.linkedin) ||
    Boolean(profile.website)

  return (
    <article className="card-face card-back">
      <div className="card-noise" />
      <div className="card-orb card-orb-back" />

      <div className="relative z-10 flex shrink-0 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 text-[9px] font-semibold text-white/80 sm:text-[11px]">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 sm:size-8">
            <QrCode size={13} />
          </span>

          <span className="truncate">
            QRCard
          </span>
        </div>

        <span className="shrink-0 font-mono text-[7px] tracking-wider text-white/30 sm:text-[9px]">
          02 / 02
        </span>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        {profile.bio && (
          <div className="mb-4 sm:mb-5">
            <span className="mb-1.5 block text-[6px] font-bold uppercase tracking-[0.16em] text-white/35 sm:mb-2 sm:text-[8px]">
              About
            </span>

            <p
              className="line-clamp-3 text-[9px] leading-4 text-white/55 sm:text-[11px] sm:leading-5"
              title={profile.bio}
            >
              {profile.bio}
            </p>
          </div>
        )}

        {(profile.company || profile.location) && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {profile.company && (
              <InfoItem
                icon={<Building2 size={11} />}
                label="Company"
                value={profile.company}
              />
            )}

            {profile.location && (
              <InfoItem
                icon={<MapPin size={11} />}
                label="Location"
                value={profile.location}
              />
            )}
          </div>
        )}

        {(profile.github ||
          profile.linkedin ||
          profile.website) && (
          <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-3">
            {profile.github && (
              <LinkItem
                icon={
                  <span className="font-mono text-[8px] font-bold">
                    GH
                  </span>
                }
                label="GitHub"
              />
            )}

            {profile.linkedin && (
              <LinkItem
                icon={
                  <span className="font-mono text-[8px] font-bold">
                    in
                  </span>
                }
                label="LinkedIn"
              />
            )}

            {profile.website && (
              <LinkItem
                icon={<Globe size={11} />}
                label="Website"
              />
            )}
          </div>
        )}

        {!hasExtraDetails && (
          <div className="rounded-xl border border-dashed border-white/8 bg-white/[0.02] px-3 py-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg border border-white/8 bg-white/5 text-white/20">
              <Link2 size={14} />
            </div>

            <p className="mt-2 text-[8px] text-white/25 sm:text-[9px]">
              Add more details to personalize the back of your card.
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-between text-[7px] text-white/30 sm:text-[9px]">
        <span>
          Digital identity
        </span>

        <QrCode
          size={13}
          className="text-violet-300/70 sm:h-4 sm:w-4"
        />
      </div>
    </article>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/6 bg-white/[0.025] px-2.5 py-2 sm:px-3 sm:py-2.5">
      <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-white/7 bg-white/5 text-violet-300/80">
        {icon}
      </span>

      <div className="min-w-0">
        <span className="block text-[6px] font-bold uppercase tracking-[0.12em] text-white/25 sm:text-[7px]">
          {label}
        </span>

        <span
          className="mt-0.5 block truncate text-[8px] text-white/55 sm:text-[9px]"
          title={value}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

function LinkItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/6 bg-white/[0.025] px-2.5 py-2 sm:px-3 sm:py-2.5">
      <span className="shrink-0 text-violet-300/80">
        {icon}
      </span>

      <span className="truncate text-[8px] text-white/45 sm:text-[9px]">
        {label}
      </span>
    </div>
  )
}