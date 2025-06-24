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
  const [showPressingDetails, setShowPressingDetails] = useState(false)
  const [showStory, setShowStory] = useState(false)

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

      {/* Main Content Container - Everything aligned */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <header className="w-full pt-4 pb-2">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl text-center">
              {/* Logo */}
              <h1 className="text-4xl font-black text-red-500 tracking-wider mb-4">GRADE A VINYL</h1>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="mb-4">
          <div className="flex justify-start">
            <div className="w-full max-w-2xl">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-gray-900 font-medium">Home</span>
                <span>›</span>
                <span className="text-gray-900 font-medium">Rock</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-0">
          <div className="flex gap-12">
            {/* Large Album Display - 3D Flip Container */}
            <div className="flex-1 max-w-2xl">
              <div className="aspect-square w-full relative" style={{ perspective: "1000px" }}>
                <div
                  className={`w-full h-full relative transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
                    showPressingDetails ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: showPressingDetails ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side - Album Image */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-gray-100 shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                  >
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

                  {/* Back Side - Pressing Details */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-white p-6 overflow-hidden border border-black"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {/* Pressing Details Content */}
                    <div className="text-center mb-6 border-b border-gray-300 pb-4">
                      <div
                        className="text-xs font-normal text-gray-600 mb-1 tracking-wider"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        THE BEATLES
                      </div>
                      <h1
                        className="text-lg font-medium text-gray-900 tracking-wide"
                        style={{ fontFamily: "Franklin Gothic Medium, Arial Black, sans-serif" }}
                      >
                        SGT. PEPPERS LONELY HEARTS CLUB BAND
                      </h1>
                    </div>

                    <div className="relative overflow-hidden h-full">
                      {/* Pressing Details - slides left when story is shown */}
                      <div
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                          showStory ? "transform -translate-x-full" : "transform translate-x-0"
                        }`}
                      >
                        <div
                          className="grid h-full text-xs leading-tight"
                          style={{
                            fontFamily: "Lora, serif",
                            gridTemplateColumns: "1fr 1.2fr 1.3fr",
                            gap: "1.5rem",
                          }}
                        >
                          {/* Column 1 */}
                          <div className="space-y-4">
                            <h3
                              className="text-gray-900 text-sm border-b border-gray-200 pb-1"
                              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                            >
                              PRESSING DETAILS
                            </h3>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Matrix / Runout:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>Side A: XZAL-40001-A-RE1 RJ STERLING</div>
                                <div>Side B: XZAL-40001-B-RE1 RJ STERLING</div>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Audio & Mastering:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Source:</span> All Analog (AAA)
                                </div>
                                <div>
                                  <span className="font-medium">Mastering:</span> Giles Martin, Sam Okell
                                </div>
                                <div>
                                  <span className="font-medium">Lacquer:</span> Miles Showell
                                </div>
                                <div>
                                  <span className="font-medium">Mix:</span> 2017 Stereo Remix
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Edition Details:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Pressing Year:</span> 2017
                                </div>
                                <div>
                                  <span className="font-medium">Original Year:</span> 1967
                                </div>
                                <div>
                                  <span className="font-medium">Country:</span> United Kingdom
                                </div>
                                <div>
                                  <span className="font-medium">Edition:</span> 50th Anniversary
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div className="space-y-4">
                            <h3
                              className="text-gray-900 text-sm border-b border-gray-200 pb-1"
                              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                            >
                              PHYSICAL IDENTIFIERS
                            </h3>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Catalog Numbers:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>0602557455984, PCTC 255</div>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Physical Attributes:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Vinyl Color:</span> Black
                                </div>
                                <div>
                                  <span className="font-medium">Weight:</span> 180g
                                </div>
                                <div>
                                  <span className="font-medium">Discs:</span> 1LP
                                </div>
                                <div>
                                  <span className="font-medium">Format:</span> LP
                                </div>
                                <div>
                                  <span className="font-medium">Sleeve:</span> Single Jacket
                                </div>
                                <div>
                                  <span className="font-medium">Inner:</span> Poly-lined Anti-Static
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Supplementary Details:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Extras:</span> Cut-Out Figures Sheet
                                </div>
                                <div>
                                  <span className="font-medium">Barcode:</span> 0602557455984
                                </div>
                                <div>
                                  <span className="font-medium">Studio:</span> Abbey Road
                                </div>
                                <div>
                                  <span className="font-medium">Speed:</span> 33⅓ RPM
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Column 3 */}
                          <div className="space-y-4">
                            <h3
                              className="text-gray-900 text-sm border-b border-gray-200 pb-1"
                              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                            >
                              CONDITION & PROVENANCE
                            </h3>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Condition Assessment:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Media:</span> Near Mint (NM)
                                </div>
                                <div>
                                  <span className="font-medium">Sleeve:</span> Near Mint (NM)
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="text-gray-800 mb-1 text-xs"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                              >
                                Technical Specifications:
                              </h4>
                              <div className="space-y-0.5 text-gray-700 text-xs">
                                <div>
                                  <span className="font-medium">Rights:</span> PRS, MCPS
                                </div>
                                <div>
                                  <span className="font-medium">Pressing Plant:</span> Optimal Media
                                </div>
                                <div>
                                  <span className="font-medium">Matrix Style:</span> Hand-etched
                                </div>
                                <div>
                                  <span className="font-medium">Label Variant:</span> Parlophone
                                </div>
                              </div>
                            </div>
                            <div>
                              <button
                                onClick={() => setShowStory(true)}
                                className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors group"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                              >
                                <span className="text-xs group-hover:underline decoration-red-500">
                                  Why This Record is Special
                                </span>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="transition-transform group-hover:translate-x-0.5"
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Content - slides in from right */}
                      <div
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out overflow-y-auto ${
                          showStory ? "transform translate-x-0" : "transform translate-x-full"
                        }`}
                      >
                        <div className="h-full" style={{ fontFamily: "Lora, serif" }}>
                          {/* Back to Details and Story Title - positioned at column header level */}
                          <div className="flex items-center justify-between mb-6">
                            <button
                              onClick={() => setShowStory(false)}
                              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "500" }}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="rotate-180"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                              <span className="text-xs">Back to Details</span>
                            </button>
                            <div className="flex-1 text-center">
                              <h2
                                className="text-gray-900 text-sm border-b border-gray-200 pb-1"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }}
                              >
                                WHY THIS RECORD IS SPECIAL
                              </h2>
                            </div>
                            <div className="w-20"></div> {/* Spacer for centering */}
                          </div>

                          {/* Story Content */}
                          <div className="space-y-6 text-xs leading-relaxed px-4 pb-20" style={{ lineHeight: "1.7" }}>
                            <div>
                              <h4
                                className="mb-3 text-gray-900"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                1. The Significance of This Pressing
                              </h4>
                              <p className="text-gray-700">
                                This specific edition of Sgt. Pepper's Lonely Hearts Club Band represents the critically
                                acclaimed 2017 Giles Martin Stereo Remix. Overseen by the son of original producer
                                George Martin, this remix was painstakingly crafted from the original master tapes,
                                offering listeners a fresh, yet faithful, sonic perspective. It's not merely a reissue
                                but a meticulous re-evaluation that brings out new dimensions in a beloved classic,
                                making it an essential acquisition for both new audiophiles and seasoned Beatles
                                collectors seeking the definitive modern stereo experience.
                              </p>
                            </div>

                            <div>
                              <h4
                                className="mb-3 text-gray-900"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                2. Mastering & Sonic Fidelity
                              </h4>
                              <p className="text-gray-700">
                                The "XZAL-40001-A-RE1 RJ STERLING" matrix inscription for Side A confirms a master cut
                                by the revered Sean Magee (identified by 'RJ') at the legendary Sterling Sound studios.
                                Magee's all-analog mastering chain on this pressing ensures unparalleled warmth, depth,
                                and clarity, allowing the intricate layers of Sgt. Pepper's to breathe with remarkable
                                presence. This particular cut is highly sought after for its dynamic range and faithful
                                translation of the original recording's magic, making it a true sonic benchmark.
                              </p>
                            </div>

                            <div>
                              <h4
                                className="mb-3 text-gray-900"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                3. Rarity & Condition Insights
                              </h4>
                              <p className="text-gray-700">
                                While the 2017 remix saw significant distribution, specific pressings with optimal
                                matrix numbers like this "RE1 RJ STERLING" cut are increasingly desirable and harder to
                                find in pristine condition. Our offering features Media: Near Mint (NM) and Sleeve: Near
                                Mint (NM), indicating a record that has been meticulously cared for, showing virtually
                                no signs of play or wear. This combination of exceptional mastering and outstanding
                                preservation positions it as a premier copy for the discerning collector.
                              </p>
                            </div>

                            <div>
                              <h4
                                className="mb-3 text-gray-900"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                4. A Collector's Perspective
                              </h4>
                              <p className="text-gray-700">
                                Sgt. Pepper's remains a cornerstone of popular music, and owning a copy that unlocks its
                                full sonic potential is a profound experience. This pressing allows the listener to hear
                                the album as perhaps never before, with newfound detail and immersive soundstaging. It's
                                more than just a record; it's a meticulously crafted artifact that bridges the past and
                                present, inviting a deeper connection with one of history's most iconic albums. For the
                                collector, it's a testament to the enduring artistry of The Beatles and the pinnacle of
                                modern vinyl production.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back to Details and Close buttons positioned at bottom */}
                    {/* Close button positioned at bottom */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={() => setShowPressingDetails(false)}
                        className="bg-gray-900 text-white px-6 py-2 text-xs hover:bg-gray-700 transition-colors"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        DONE
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Album Title */}
              <div className="mt-6 w-full text-center">
                <h2 className="text-2xl font-bold text-gray-900">Sgt. Pepper's Lonely Heart Club Band</h2>
                <div className="mt-2" style={{ marginTop: "6px" }}>
                  <button
                    onClick={() => setShowPressingDetails(true)}
                    className="text-gray-700 hover:text-red-600 transition-colors text-xs tracking-wide"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "12px" }}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Thumbnails aligned with TOP of album */}
            <div className="flex-shrink-0 relative" style={{ width: "400px" }}>
              {/* Zoom Label - positioned ABOVE the thumbnails */}
              <div className="text-center relative mb-2" style={{ marginTop: "-26px" }}>
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
                      <div className="flex justify-center mb-6">
                        <Image
                          src="/images/hasselblad-x1d-50c.png"
                          alt="Hasselblad X1D-50c Camera"
                          width={224}
                          height={160}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">True-to-Life Imagery</h3>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Every record at Grade A Vinyl is meticulously photographed using a Hasselblad medium format
                          mirrorless camera celebrated for its extraordinary resolution and color accuracy.
                          <br />
                          <br />
                          We invest in this precision to capture every subtle detail - from the intricate textures of
                          the jacket to the actual vinyl itself and the nuanced clarity of its labels. This ensures that
                          what you see online is an exact representation of your chosen record.
                        </p>
                      </div>
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* Thumbnails Grid - aligned with top of large album */}
              <div className="grid grid-cols-2 gap-6">
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

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        @font-face {
          font-family: 'Lora';
          src: url('/fonts/Lora-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}
