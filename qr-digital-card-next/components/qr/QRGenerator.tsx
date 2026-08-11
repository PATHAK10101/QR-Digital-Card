"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import QRCode from "qrcode"

import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Printer,
  QrCode,
} from "lucide-react"

interface QRGeneratorProps {
  profileId: string
}

export default function QRGenerator({
  profileId,
}: QRGeneratorProps) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null)

  const [profileUrl, setProfileUrl] =
    useState("")

  const [copied, setCopied] =
    useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const url =
      `${window.location.origin}/p/${encodeURIComponent(profileId)}`

    setProfileUrl(url)
  }, [profileId])

  useEffect(() => {
    if (
      !canvasRef.current ||
      !profileUrl
    ) {
      return
    }

    QRCode.toCanvas(
      canvasRef.current,
      profileUrl,
      {
        width: 210,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#111111",
          light: "#ffffff",
        },
      },
    )
  }, [profileUrl])

  const copyLink = async () => {
    if (!profileUrl) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        profileUrl,
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  const downloadQR = () => {
    if (!canvasRef.current) {
      return
    }

    const link =
      document.createElement("a")

    link.download =
      `qrcard-${profileId}.png`

    link.href =
      canvasRef.current.toDataURL(
        "image/png",
      )

    link.click()
  }

  const printQR = () => {
    window.print()
  }

  const profilePage =
    `/p/${encodeURIComponent(profileId)}`

  return (
    <section className="print:rounded-none print:border-0 print:bg-white print:text-black">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg border border-white/8 bg-white/5 text-violet-300">
              <QrCode size={14} />
            </span>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-violet-300/60 print:text-black">
                YOUR QR
              </p>

              <h3 className="mt-0.5 text-sm font-semibold">
                Ready to share
              </h3>
            </div>
          </div>
        </div>

        <span className="rounded-full border border-emerald-300/10 bg-emerald-300/5 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
          Live
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-white/7 bg-black/15 p-4 print:border-black print:bg-white">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl bg-white p-3 shadow-xl shadow-black/20">
            <canvas
              ref={canvasRef}
              width={210}
              height={210}
              aria-label="QR code for digital card"
            />
          </div>

          <p className="mt-4 text-center text-[10px] font-medium text-white/45 print:text-black">
            Scan to open your digital card
          </p>

          <p className="mt-1 max-w-full truncate px-3 text-center font-mono text-[8px] text-white/20 print:text-black">
            {profileUrl}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 print:hidden">
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 bg-white/5 text-[10px] font-medium text-white/60 transition hover:bg-white/8 hover:text-white"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy link
              </>
            )}
          </button>

          <button
            type="button"
            onClick={downloadQR}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white text-[10px] font-semibold text-black transition hover:bg-white/90"
          >
            <Download size={12} />
            Download
          </button>

          <button
            type="button"
            onClick={printQR}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 bg-white/5 text-[10px] font-medium text-white/60 transition hover:bg-white/8 hover:text-white"
          >
            <Printer size={12} />
            Print QR
          </button>

          <a
            href={profilePage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 bg-white/5 text-[10px] font-medium text-white/60 transition hover:bg-white/8 hover:text-white"
          >
            <ExternalLink size={12} />
            Open profile
          </a>
        </div>
      </div>

      <div className="hidden print:block">
        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-black">
            Scan to view my digital card
          </p>

          <p className="mt-2 text-xs text-black">
            {profileUrl}
          </p>
        </div>
      </div>
    </section>
  )
}