import Link from "next/link"
import { ArrowRight, QrCode, ScanLine, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <header className="border-b border-white/7">
        <div className="mx-auto flex h-18 w-[min(1240px,calc(100%-32px))] items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5">
              <QrCode size={17} />
            </span>

            QR<span className="text-violet-300">Card</span>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-[11px] font-semibold text-black transition hover:bg-white/90"
          >
            Create card
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      <section className="relative mx-auto flex min-h-[calc(100vh-72px)] w-[min(1240px,calc(100%-32px))] items-center py-20">
        <div className="pointer-events-none absolute left-[50%] top-[20%] size-125 -translate-x-1/2 rounded-full bg-violet-500/8 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/5 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-violet-200/70">
            <Sparkles size={12} />
            DIGITAL IDENTITY, REIMAGINED
          </div>

          <h1 className="max-w-4xl text-6xl font-semibold leading-[0.94] tracking-[-0.075em] sm:text-8xl">
            Your digital card.
            <br />
            <span className="text-violet-300">
              One scan away.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/35 sm:text-lg">
            Create a beautiful interactive identity card, connect
            your contact details, and share everything through one
            simple QR code.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              Create your card
              <ArrowRight size={14} />
            </Link>

            <div className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-5 py-3 text-xs text-white/45">
              <ScanLine size={14} />
              Scan. Connect. Share.
            </div>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <Feature
              title="3D Card"
              description="Interactive front and back."
            />

            <Feature
              title="QR Sharing"
              description="One link for your identity."
            />

            <Feature
              title="Always Yours"
              description="Your profile, your details."
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/3 p-4">
      <h2 className="text-xs font-semibold text-white/75">
        {title}
      </h2>

      <p className="mt-1 text-[10px] leading-4 text-white/25">
        {description}
      </p>
    </div>
  )
}