import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Lora } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Grade A Vinyl - demo",
  description: "Premium vinyl records with Hasselblad precision photography",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} ${lora.variable}`}>{children}</body>
    </html>
  )
}
