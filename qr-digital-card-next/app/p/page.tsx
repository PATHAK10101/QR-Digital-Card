import Link from "next/link"

export default function ProfilesPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#08090d] px-6 text-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/25">
          QRCard
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Profile directory
        </h1>

        <p className="mt-3 text-sm text-white/30">
          Public profiles will appear here in a future phase.
        </p>

        <Link
          href="/create"
          className="mt-6 inline-flex rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black"
        >
          Create a card
        </Link>
      </div>
    </main>
  )
}