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
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 })

  const [isPinching, setIsPinching] = useState(false)
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const [initialZoomLevel, setInitialZoomLevel] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pinchCenter, setPinchCenter] = useState({ x: 50, y: 50 })

  const albumImageRef = useRef<HTMLDivElement>(null)
  const fullscreenImageRef = useRef<HTMLDivElement>(null)

  const currentImage = albumViews.find((view) => view.id === selectedView)?.image || albumViews[0].image

  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  const getMidpoint = useCallback((touch1: Touch, touch2: Touch, rect: DOMRect) => {
    const midX = (touch1.clientX + touch2.clientX) / 2
    const midY = (touch1.clientY + touch2.clientY) / 2
    const x = ((midX - rect.left) / rect.width) * 100
    const y = ((midY - rect.top) / rect.height) * 100
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
  }, [])

  // Handle touch events for the main thumbnail image
  const handleThumbnailTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStartTime(Date.now())
    setTouchStartPos({ x: touch.clientX, y: touch.clientY })
  }, [])

  const handleThumbnailTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      const touchEndTime = Date.now()
      const touchDuration = touchEndTime - touchStartTime
      const touch = e.changedTouches[0]
      const touchEndPos = { x: touch.clientX, y: touch.clientY }

      const distance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.x, 2) + Math.pow(touchEndPos.y - touchStartPos.y, 2),
      )

      // If it's a quick tap (< 200ms) and didn't move much (< 10px), enter fullscreen zoom
      if (touchDuration < 200 && distance < 10) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((touch.clientX - rect.left) / rect.width) * 100
        const y = ((touch.clientY - rect.top) / rect.height) * 100

        setZoomPosition({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        })
        setIsZoomed(true)
        setZoomLevel(2.5)
      }
    },
    [touchStartTime, touchStartPos],
  )

  // Handle touch events for the fullscreen zoom view
  const handleFullscreenTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        setTouchStartTime(Date.now())
        setTouchStartPos({ x: touch.clientX, y: touch.clientY })
      } else if (e.touches.length === 2) {
        e.preventDefault()
        setIsPinching(true)
        const distance = getDistance(e.touches[0], e.touches[1])
        setInitialPinchDistance(distance)
        setInitialZoomLevel(zoomLevel)

        if (fullscreenImageRef.current) {
          const rect = fullscreenImageRef.current.getBoundingClientRect()
          const center = getMidpoint(e.touches[0], e.touches[1], rect)
          setPinchCenter(center)
        }
      }
    },
    [getDistance, getMidpoint, zoomLevel],
  )

  const handleFullscreenTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && isPinching) {
        e.preventDefault()
        const currentDistance = getDistance(e.touches[0], e.touches[1])
        const scale = currentDistance / initialPinchDistance
        const newZoomLevel = Math.max(1, Math.min(8, initialZoomLevel * scale))

        setZoomLevel(newZoomLevel)

        if (fullscreenImageRef.current) {
          const rect = fullscreenImageRef.current.getBoundingClientRect()
          const center = getMidpoint(e.touches[0], e.touches[1], rect)
          setZoomPosition(center)
        }
      } else if (e.touches.length === 1 && zoomLevel > 1 && !isPinching) {
        e.preventDefault()

        // Get current touch position
        const touch = e.touches[0]
        const rect = fullscreenImageRef.current?.getBoundingClientRect()

        if (rect && touchStartPos) {
          // Calculate how much the finger has moved
          const deltaX = touch.clientX - touchStartPos.x
          const deltaY = touch.clientY - touchStartPos.y

          // Convert movement to percentage of container size (doubled for better sensitivity)
          const moveXPercent = (deltaX / rect.width) * 100 * 2
          const moveYPercent = (deltaY / rect.height) * 100 * 2

          // Apply movement directly (image follows finger)
          const newX = Math.max(0, Math.min(100, zoomPosition.x + moveXPercent))
          const newY = Math.max(0, Math.min(100, zoomPosition.y + moveYPercent))

          setZoomPosition({ x: newX, y: newY })

          // Update touch start position for next movement calculation
          setTouchStartPos({ x: touch.clientX, y: touch.clientY })
        }
      }
    },
    [
      isPinching,
      getDistance,
      getMidpoint,
      initialPinchDistance,
      initialZoomLevel,
      zoomLevel,
      touchStartPos,
      zoomPosition,
    ],
  )

  const handleFullscreenTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isPinching) {
        setIsPinching(false)
        if (zoomLevel <= 1.1) {
          setZoomLevel(1)
        }
      } else if (e.changedTouches.length === 1 && !isPinching) {
        e.preventDefault()
        const touchEndTime = Date.now()
        const touchDuration = touchEndTime - touchStartTime
        const touch = e.changedTouches[0]
        const touchEndPos = { x: touch.clientX, y: touch.clientY }

        const distance = Math.sqrt(
          Math.pow(touchEndPos.x - touchStartPos.x, 2) + Math.pow(touchEndPos.y - touchStartPos.y, 2),
        )

        // If it's a quick tap and didn't move much, exit fullscreen
        if (touchDuration < 200 && distance < 10) {
          setIsZoomed(false)
          setZoomLevel(1)
          setZoomPosition({ x: 50, y: 50 })
        }
      }
    },
    [touchStartTime, touchStartPos, isPinching, zoomLevel],
  )

  const handleThumbnailSelect = useCallback((viewId: string) => {
    setSelectedView(viewId)
    setIsZoomed(false)
    setZoomLevel(1)
    setZoomPosition({ x: 50, y: 50 })
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
        style={{
          fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          touchAction: "manipulation",
        }}
      >
        {/* Fullscreen Zoom Overlay - iOS Style */}
        {isZoomed && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div
              ref={fullscreenImageRef}
              className="w-full h-full relative overflow-hidden"
              onTouchStart={handleFullscreenTouchStart}
              onTouchMove={handleFullscreenTouchMove}
              onTouchEnd={handleFullscreenTouchEnd}
              style={{
                touchAction: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
              }}
            >
              <div
                className="w-full h-full transition-all duration-300 ease-out"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundSize: `${100 * zoomLevel}%`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Fullscreen Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
                  {zoomLevel > 1 ? "Drag to pan • Pinch to zoom" : "Pinch to zoom in"}
                </div>
                <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
                  Tap to exit
                </div>
              </div>

              {/* Bottom Info Bar - iOS Style */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1">Sgt. Pepper's Lonely Heart Club Band</h3>
                  <p className="text-sm text-white/80">{albumViews.find((view) => view.id === selectedView)?.label}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Only visible when not in fullscreen zoom */}
        {!isZoomed && (
          <>
            {/* Header - Mobile Optimized */}
            <header className="w-full py-6 px-4">
              <div className="text-center">
                <h1 className="text-3xl font-black text-red-500 tracking-wider">GRADE A VINYL</h1>
              </div>
            </header>

            {/* Breadcrumb Navigation */}
            <nav className="max-w-7xl mx-auto px-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-gray-900 font-medium">Home</span>
                <span>›</span>
                <span className="text-gray-900 font-medium">Rock</span>
              </div>
            </nav>

            {/* Main Content - Mobile Stack Layout */}
            <main className="px-4 pb-8 pt-2">
              {/* Large Album Display */}
              <div className="mb-6">
                <div
                  ref={albumImageRef}
                  className="aspect-square w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 shadow-lg cursor-pointer select-none"
                  onTouchStart={handleThumbnailTouchStart}
                  onTouchEnd={handleThumbnailTouchEnd}
                  style={{
                    touchAction: "manipulation",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                  }}
                >
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt="Album view"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                    draggable={false}
                  />

                  {/* Zoom indicator */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Tap to zoom
                  </div>
                </div>

                {/* Album Title - Mobile Centered */}
                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-gray-900 px-4">Sgt. Pepper's Lonely Heart Club Band</h2>
                </div>
              </div>

              {/* Hasselblad Zoom Label - Mobile Optimized */}
              <div className="text-center mb-6 relative">
                <span
                  className="text-base font-medium text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                  onClick={() => setShowDialog(!showDialog)}
                >
                  Hasselblad Precision Zoom
                </span>

                {/* Mobile Dialog */}
                {showDialog && (
                  <div
                    className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowDialog(false)}
                  >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md max-h-[80vh] p-6 overflow-y-auto relative">
                      {/* Close button for mobile - Make sure it's visible */}
                      <button
                        onClick={() => setShowDialog(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl w-8 h-8 flex items-center justify-center z-10 bg-white rounded-full shadow-sm"
                      >
                        ×
                      </button>

                      <div className="flex flex-col h-full">
                        {/* Camera Image */}
                        <div className="flex justify-center mb-6 mt-0">
                          <Image
                            src="/images/hasselblad-x1d-50c.png"
                            alt="Hasselblad X1D-50c Camera"
                            width={200}
                            height={140}
                            className="object-contain"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">True-to-Life Imagery</h3>

                        {/* Text content */}
                        <div className="flex-1">
                          <p className="text-base text-gray-600 leading-relaxed">
                            Every record at Grade A Vinyl is meticulously photographed using a Hasselblad medium format
                            mirrorless camera celebrated for its extraordinary resolution.
                            <br />
                            <br />
                            We invest in this precision to capture every subtle detail, ensuring that what you see
                            online is an exact representation of your chosen record.
                            <br />
                            <br />
                            <b>We recommend exploring our collection on a desktop computer.</b>
                          </p>
                        </div>
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
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-active:bg-opacity-10 transition-all" />
                      {selectedView === view.id && (
                        <div className="absolute inset-0 border-2 border-red-500 rounded"></div>
                      )}
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
          </>
        )}
      </div>
    </>
  )
}
