import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grade A Vinyl - demo",
  description: "Explore our premium vinyl collection with Hasselblad precision photography",
}

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
