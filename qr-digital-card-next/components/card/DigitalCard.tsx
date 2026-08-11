"use client"

import {
  useState,
  type KeyboardEvent,
} from "react"

import type { Profile } from "@/types/profile"

import CardBack from "./CardBack"
import CardFront from "./CardFront"

interface DigitalCardProps {
  profile: Profile
}

export default function DigitalCard({
  profile,
}: DigitalCardProps) {
  const [flipped, setFlipped] = useState(false)

  const toggleCard = () => {
    setFlipped((current) => !current)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault()
      toggleCard()
    }
  }

  return (
    <div
      className="
        card-perspective
        mx-auto
        w-full
        max-w-[420px]
        touch-manipulation
        select-none
      "
      onClick={toggleCard}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? "Show front of digital card"
          : "Show back of digital card"
      }
    >
      <div
        className={`card-3d ${
          flipped ? "card-3d-flipped" : ""
        }`}
      >
        <CardFront profile={profile} />
        <CardBack profile={profile} />
      </div>
    </div>
  )
}