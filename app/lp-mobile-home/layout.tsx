import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grade A Vinyl - demo",
  description: "Premium vinyl records with Hasselblad precision photography",
}

export default function LpMobileHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
