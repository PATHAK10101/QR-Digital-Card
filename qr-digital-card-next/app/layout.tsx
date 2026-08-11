import type { Metadata } from "next"
import { Geist } from "next/font/google"
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",
  ),
  title: {
    default: "QRCard — Your Digital Identity",
    template: "%s — QRCard",
  },
  description:
    "Create a beautiful digital identity card and share it with one QR code.",
  applicationName: "QRCard",
  keywords: [
    "digital business card",
    "QR business card",
    "digital identity",
    "QR profile",
    "online business card",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body>
        <ServiceWorkerRegistration />

        {children}
      </body>
    </html>
  )
}