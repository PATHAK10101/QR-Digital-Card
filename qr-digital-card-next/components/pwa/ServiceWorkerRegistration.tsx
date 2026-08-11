"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register(
          "/sw.js",
          {
            scope: "/",
          },
        )
      } catch (error) {
        console.error(
          "QRCard service worker registration failed:",
          error,
        )
      }
    }

    registerServiceWorker()
  }, [])

  return null
}