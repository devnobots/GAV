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

export default function LpMobileHome() {
  const [selectedView, setSelectedView] = useState("front")
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [showDialog, setShowDialog] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [lastTouchTime, setLastTouchTime] = useState(0)

  const albumImageRef = useRef<HTMLDivElement>(null)

  const currentImage = albumViews.find((view) => view.id === selectedView)?.image || albumViews[0].image

  // Handle double-tap to zoom
  const handleImageTouch = useCallback(
    (e: React.TouchEvent) => {
      const currentTime = Date.now()
      const timeDiff = currentTime - lastTouchTime

      if (timeDiff < 300 && timeDiff > 0) {
        // Double tap detected
        e.preventDefault()
        setIsZoomed(!isZoomed)

        if (!isZoomed) {
          // Zoom in at touch point
          const rect = e.currentTarget.getBoundingClientRect()
          const touch = e.changedTouches[0]
          const x = ((touch.clientX - rect.left) / rect.width) * 100
          const y = ((touch.clientY - rect.top) / rect.height) * 100
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
        }
      }
      setLastTouchTime(currentTime)
    },
    [lastTouchTime, isZoomed],
  )

  // Handle panning when zoomed
  const handlePanStart = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed) {
        setIsPanning(true)
        e.preventDefault()
      }
    },
    [isZoomed],
  )

  const handlePanMove = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed && isPanning && albumImageRef.current) {
        e.preventDefault()
        const rect = albumImageRef.current.getBoundingClientRect()
        const touch = e.touches[0]
        const x = ((touch.clientX - rect.left) / rect.width) * 100
        const y = ((touch.clientY - rect.top) / rect.height) * 100
        setZoomPosition({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        })
      }
    },
    [isZoomed, isPanning],
  )

  const handlePanEnd = useCallback(() => {
    setIsPanning(false)
  }, [])

  const handleThumbnailSelect = useCallback((viewId: string) => {
    setSelectedView(viewId)
    setIsZoomed(false) // Reset zoom when switching images
  }, [])

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        {/* Header - Mobile Optimized */}
        <header className="w-full py-6 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-black text-red-500 tracking-wider">GRADE A VINYL</h1>
          </div>
        </header>

        {/* Main Content - Mobile Stack Layout */}
        <main className="px-4 pb-8">
          {/* Large Album Display with Mobile Zoom */}
          <div className="mb-6">
            <div
              ref={albumImageRef}
              className="aspect-square w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 shadow-lg cursor-pointer select-none"
              onTouchEnd={handleImageTouch}
              onTouchStart={handlePanStart}
              onTouchMove={handlePanMove}
              onTouchCancel={handlePanEnd}
              style={{ touchAction: isZoomed ? "none" : "auto" }}
            >
              {isZoomed ? (
                <div
                  className="w-full h-full transition-all duration-300 ease-out"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: "250%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ) : (
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt="Album view"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-all duration-300"
                  priority
                />
              )}

              {/* Zoom indicator */}
              {!isZoomed && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Double tap to zoom
                </div>
              )}

              {isZoomed && (
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Drag to pan • Double tap to zoom out
                </div>
              )}
            </div>

            {/* Album Title - Mobile Centered */}
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold text-gray-900 px-4">
                Sgt. Pepper's Lonely Heart Club Band <span className="text-red-500">[+]</span>
              </h2>
            </div>
          </div>

          {/* Hasselblad Zoom Label - Mobile Optimized */}
          <div className="text-center mb-6 relative">
            <span className="text-sm font-medium text-gray-500">
              Hasselblad Precision Zoom
              <span
                className="text-red-500 hover:text-red-700 cursor-pointer relative inline-block ml-1 text-base"
                onTouchStart={() => setShowDialog(true)}
                onTouchEnd={() => setShowDialog(false)}
                onClick={() => setShowDialog(!showDialog)}
              >
                [?]
              </span>
            </span>

            {/* Mobile Dialog - Repositioned */}
            {showDialog && (
              <div className="fixed inset-4 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 p-6 overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setShowDialog(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>

                  {/* Camera Image */}
                  <div className="flex justify-center mb-6 mt-4">
                    <Image
                      src="/images/hasselblad-x1d-50c.png"
                      alt="Hasselblad X1D-50c Camera"
                      width={200}
                      height={140}
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">True-to-Life Imagery</h3>

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
              </div>
            )}
          </div>

          {/* Thumbnail Grid - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {albumViews.map((view) => (
              <div key={view.id} className="cursor-pointer" onTouchEnd={() => handleThumbnailSelect(view.id)}>
                <div className="aspect-square relative group">
                  <Image
                    src={view.image || "/placeholder.svg"}
                    alt={view.label}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover shadow-md transition-transform active:scale-95"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-active:bg-opacity-10 transition-all" />
                  {selectedView === view.id && <div className="absolute inset-0 border-2 border-red-500 rounded"></div>}
                </div>
                <div className="text-center mt-2">
                  <span
                    className={`text-xs font-medium ${
                      selectedView === view.id ? "text-red-500 font-bold" : "text-gray-500"
                    }`}
                  >
                    {view.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
