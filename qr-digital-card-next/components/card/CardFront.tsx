"use client"

import {
  ArrowRight,
  Mail,
  Phone,
  QrCode,
} from "lucide-react"
import { motion } from "framer-motion"

import type { Profile } from "@/types/profile"
import { getInitials } from "@/lib/utils"

interface CardFrontProps {
  profile: Profile
}

export default function CardFront({
  profile,
}: CardFrontProps) {
  const initials = getInitials(profile.name)

  const hasContact =
    Boolean(profile.email) ||
    Boolean(profile.phone)

  return (
    <article className="card-face card-front">
      <div className="card-noise" />
      <div className="card-orb" />

      <div className="relative z-10 flex shrink-0 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 text-[9px] font-semibold tracking-tight text-white/80 sm:text-[11px]">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 sm:size-8">
            <QrCode size={13} />
          </span>

          <span className="truncate">
            QRCard
          </span>
        </div>

        <span className="shrink-0 font-mono text-[7px] tracking-wider text-white/30 sm:text-[9px]">
          01 / 02
        </span>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_76px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_112px] sm:gap-5 lg:grid-cols-[minmax(0,1fr)_128px]">
          <div className="min-w-0">
            <span className="mb-1 block truncate text-[6px] font-bold uppercase tracking-[0.16em] text-white/35 sm:mb-2 sm:text-[8px] sm:tracking-[0.18em]">
              {profile.company || "Digital Identity"}
            </span>

            <h2
              className="truncate text-[20px] font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-3xl"
              title={profile.name || "Your Name"}
            >
              {profile.name || "Your Name"}
            </h2>

            {profile.role && (
              <p
                className="mt-1 truncate text-[8px] text-white/50 sm:mt-2 sm:text-[11px]"
                title={profile.role}
              >
                {profile.role}
              </p>
            )}
          </div>

          <div className="grid aspect-square w-full overflow-hidden rounded-[18px] border border-white/15 bg-white/5 shadow-2xl shadow-black/30 sm:rounded-[24px]">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={
                  profile.name
                    ? `${profile.name} profile photo`
                    : "Profile photo"
                }
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/10 text-2xl font-semibold text-violet-200 sm:text-3xl">
                {initials || "YO"}
              </div>
            )}
          </div>
        </div>

        {hasContact && (
          <div className="mt-3 grid min-w-0 grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
            {profile.email && (
              <ContactItem
                icon={<Mail size={10} />}
                value={profile.email}
              />
            )}

            {profile.phone && (
              <ContactItem
                icon={<Phone size={10} />}
                value={profile.phone}
              />
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-between text-[7px] text-white/30 sm:text-[9px]">
        <span>
          Tap to explore
        </span>

        <motion.span
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowRight
            size={13}
            className="sm:h-[14px] sm:w-[14px]"
          />
        </motion.span>
      </div>
    </article>
  )
}

function ContactItem({
  icon,
  value,
}: {
  icon: React.ReactNode
  value: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5 text-[7px] text-white/45 sm:gap-2 sm:text-[8px]">
      <span className="grid size-5 shrink-0 place-items-center rounded-md border border-white/8 bg-white/5 text-violet-300/80 sm:size-6">
        {icon}
      </span>

      <span
        className="min-w-0 truncate"
        title={value}
      >
        {value}
      </span>
    </div>
  )
}