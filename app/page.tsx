"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

const albumViews = [
  {
    id: "front",
    label: "FRONT",
    image: "/images/sgt-pepper-cover.png",
  },
  {
    id: "back",
    label: "BACK",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "sleeve-front",
    label: "SLEEVE FRONT",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "sleeve-back",
    label: "SLEEVE BACK",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "side-a",
    label: "SIDE A",
    image: "/images/vinyl-record.png",
  },
  {
    id: "side-b",
    label: "SIDE B",
    image: "/images/vinyl-record.png",
  },
]

export default function GradeAVinylSite() {
  const [selectedView, setSelectedView] = useState("front")
  const [isHovering, setIsHovering] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showDialog, setShowDialog] = useState(false)

  const thumbnailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const currentImage = albumViews.find((view) => view.id === selectedView)?.image || albumViews[0].image

  const handleMouseMove = useCallback((e: React.MouseEvent, viewId: string) => {
    const thumbnail = thumbnailRefs.current[viewId]
    if (!thumbnail) return

    const rect = thumbnail.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate relative position as percentage
    const relativeX = (x / rect.width) * 100
    const relativeY = (y / rect.height) * 100

    // For background-position with 200% size:
    const bgX = Math.max(0, Math.min(100, relativeX))
    const bgY = Math.max(0, Math.min(100, relativeY))

    setZoomPosition({ x: bgX, y: bgY })
    setMousePosition({ x: e.clientX, y: e.clientY })

    // Update CSS variables for cursor position
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`)
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`)
  }, [])

  const handleThumbnailEnter = useCallback((viewId: string) => {
    setSelectedView(viewId)
    setIsHovering(true)
  }, [])

  const handleThumbnailLeave = useCallback(() => {
    setIsHovering(false)
    setSelectedView("front")
  }, [])

  return (
    <div className="min-h-screen bg-white font-['Montserrat']">
      {/* Custom cursor */}
      {isHovering && (
        <div
          className="fixed w-[30px] h-[30px] bg-yellow-400 pointer-events-none z-50 border border-yellow-600"
          style={{
            left: "var(--mouse-x, 0px)",
            top: "var(--mouse-y, 0px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Header */}
      <header className="w-full py-4 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-4">
            <h1 className="text-4xl font-black text-red-500 tracking-wider">GRADE A VINYL</h1>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="text-gray-900 font-medium">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Rock</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Large Album Display - Zoomed View */}
          <div className="lg:col-span-2">
            <div className="aspect-square w-full max-w-2xl mx-auto relative overflow-hidden bg-gray-100 shadow-lg">
              {isHovering ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ) : (
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt="Album view"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              )}
            </div>

            {/* Album Title */}
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Sgt. Pepper's Lonely Heart Club Band <span className="text-red-500">[+]</span>
              </h2>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="space-y-6">
            {/* Zoom Label */}
            <div className="text-center relative">
              <span className="text-sm font-medium text-gray-500">
                Hasselblad Precision Zoom
                <span
                  className="text-red-500 hover:text-red-700 cursor-help relative inline-block ml-0.5"
                  onMouseEnter={() => setShowDialog(true)}
                  onMouseLeave={() => setShowDialog(false)}
                >
                  [?]
                </span>
              </span>

              {/* Floating Dialog */}
              {showDialog && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[400px] h-[520px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 p-6">
                  <div className="h-full flex flex-col">
                    {/* Camera Image - moved to top */}
                    <div className="flex justify-center mb-6">
                      <Image
                        src="/images/hasselblad-x1d-50c.png"
                        alt="Hasselblad X1D-50c Camera"
                        width={224}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    {/* Title - moved under camera */}
                    <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">True-to-Life Imagery</h3>

                    {/* Text content */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Every record at Grade A Vinyl is meticulously photographed using a Hasselblad medium format
                        mirrorless camera celebrated for its extraordinary resolution and color accuracy.
                        <br />
                        <br />
                        We invest in this precision to capture every subtle detail - from the intricate textures of the
                        jacket to the actual vinyl itself and the nuanced clarity of its labels. This ensures that what
                        you see online is an exact representation of your chosen record.
                      </p>
                    </div>
                  </div>
                  {/* Dialog arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-4">
              {albumViews.map((view) => (
                <div
                  key={view.id}
                  className="cursor-none"
                  ref={(el) => {
                    thumbnailRefs.current[view.id] = el
                  }}
                  onMouseEnter={() => handleThumbnailEnter(view.id)}
                  onMouseMove={(e) => handleMouseMove(e, view.id)}
                  onMouseLeave={handleThumbnailLeave}
                >
                  <div className="aspect-square relative group">
                    <Image
                      src={view.image || "/placeholder.svg"}
                      alt={view.label}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover shadow-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                  </div>
                  <div className="text-center mt-2">
                    <span
                      className={`text-xs font-medium ${
                        selectedView === view.id && isHovering ? "text-red-500 font-bold" : "text-gray-500"
                      }`}
                    >
                      {view.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
