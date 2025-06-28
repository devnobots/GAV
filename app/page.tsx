"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"

const albumViews = [
  {
    id: "front",
    label: "COVER & DETAILS",
    image: "/images/sgt-pepper-hq.webp",
  },
  {
    id: "back",
    label: "BACK",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "spine",
    label: "SPINE",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "sleeve-front",
    label: "SLEEVE FRONT",
    image: "/images/sleeve-front.jpg",
  },
  {
    id: "sleeve-back",
    label: "SLEEVE BACK",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "inner-sleeve",
    label: "INNER SLEEVE",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "side-a",
    label: "SIDE A",
    image: "/images/vinyl-side-a.jpg",
  },
  {
    id: "side-b",
    label: "SIDE B",
    image: "/images/vinyl-record.png",
  },
  {
    id: "label-detail",
    label: "LABEL DETAIL",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function GradeAVinylSite() {
  const [selectedView, setSelectedView] = useState("front")
  const [showDialog, setShowDialog] = useState(false)
  const [showPressingDetails, setShowPressingDetails] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  const viewerRef = useRef<HTMLDivElement>(null)
  const openseadragonViewer = useRef<any>(null)

  const currentImage = albumViews.find((view) => view.id === selectedView)?.image || albumViews[0].image

  // Initialize OpenSeadragon
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/openseadragon@4.1.0/build/openseadragon/openseadragon.min.js"
    script.onload = () => {
      if (viewerRef.current && (window as any).OpenSeadragon) {
        openseadragonViewer.current = (window as any).OpenSeadragon({
          element: viewerRef.current,
          tileSources: {
            type: "image",
            url: currentImage,
          },
          showNavigationControl: false,
          showZoomControl: false,
          showHomeControl: false,
          showFullPageControl: false,
          showRotationControl: false,
          showSequenceControl: false,
          mouseNavEnabled: true,
          maxZoomLevel: 6,
          minZoomLevel: 1,
          gestureSettingsMouse: {
            clickToZoom: false,
            dblClickToZoom: false,
            pinchToZoom: false,
            flickEnabled: false,
            flickMinSpeed: 120,
            flickMomentum: 0.25,
            pinchRotate: false,
          },
          gestureSettingsTouch: {
            clickToZoom: false,
            dblClickToZoom: false,
            pinchToZoom: true,
            flickEnabled: false,
            pinchRotate: false,
          },
          navImages: {
            zoomIn: {
              REST: "",
              GROUP: "",
              HOVER: "",
              DOWN: "",
            },
            zoomOut: {
              REST: "",
              GROUP: "",
              HOVER: "",
              DOWN: "",
            },
            home: {
              REST: "",
              GROUP: "",
              HOVER: "",
              DOWN: "",
            },
            fullpage: {
              REST: "",
              GROUP: "",
              HOVER: "",
              DOWN: "",
            },
          },
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (openseadragonViewer.current) {
        openseadragonViewer.current.destroy()
      }
      document.head.removeChild(script)
    }
  }, [])

  // Update OpenSeadragon image when selectedView changes
  useEffect(() => {
    if (openseadragonViewer.current) {
      openseadragonViewer.current.open({
        type: "image",
        url: currentImage,
      })
    }
  }, [currentImage])

  const handleThumbnailClick = useCallback((viewId: string) => {
    setSelectedView(viewId)
  }, [])

  const handleAddToCart = useCallback(() => {
    setIsAdding(true)
    setCartCount((prev) => prev + 1)

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }, [])

  return (
    <div className="min-h-screen bg-white font-['Montserrat']" style={{ paddingTop: "3px" }}>
      {/* Main Content Container - Everything aligned */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <header className="w-full pt-2 pb-1">
          <div className="flex justify-center relative">
            <div className="w-full max-w-2xl text-center">
              {/* Logo */}
              <h1 className="text-4xl font-black text-red-500 tracking-wider mb-2">GRADE A VINYL</h1>
            </div>

            {/* Cart Summary - positioned in upper right */}
            <div className="absolute right-0 top-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group">
                  <div className="relative">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:scale-105 transition-transform"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="m16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {cartCount > 0 && (
                      <div
                        className="absolute -top-2 -right-2 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse"
                        style={{
                          fontSize: "9px",
                          backgroundColor: "#1E5C41",
                        }}
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="mb-1">
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
          <div className="flex gap-12 items-start">
            {/* Left Column - Large Album Display */}
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
                  {/* Front Side - OpenSeadragon Viewer */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden bg-gray-100 shadow-lg ${
                      selectedView === "front" ? "cursor-pointer" : "cursor-zoom-in"
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                    onClick={() => {
                      if (selectedView === "front") {
                        setShowPressingDetails(true)
                      }
                    }}
                  >
                    <div ref={viewerRef} className="w-full h-full" style={{ background: "#f5f5f5" }} />
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
                        className="font-medium text-gray-900 tracking-wide"
                        style={{ fontFamily: "Franklin Gothic Medium, Arial Black, sans-serif", fontSize: "20px" }}
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
                                className="flex items-center gap-2 transition-colors group"
                                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600", color: "#ef4444" }}
                              >
                                <span className="text-xs group-hover:underline decoration-black">
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
                        {/* Fixed Back to Details button - guaranteed to be visible */}
                        {showStory && (
                          <div className="relative pt-6">
                            <button
                              onClick={() => setShowStory(false)}
                              className="absolute left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-3 py-2 rounded shadow-lg border"
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "500",
                                zIndex: 10000,
                                top: "0px",
                              }}
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
                          </div>
                        )}

                        <div className="h-full px-6 pt-6" style={{ fontFamily: "Lora, serif" }}>
                          {/* Story Title */}
                          <h2
                            className="text-center text-gray-900 text-base font-semibold tracking-wide mb-8"
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: "600",
                            }}
                          >
                            WHY THIS RECORD IS SPECIAL
                          </h2>

                          {/* Story Content */}
                          <div className="space-y-6 text-xs leading-relaxed pb-20" style={{ lineHeight: "1.7" }}>
                            <div>
                              <h4
                                className="mb-3 text-gray-900"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                The Significance of This Pressing
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
                                Mastering & Sonic Fidelity
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
                                Rarity & Condition Insights
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
                                A Collector's Perspective
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

                    {/* Close button positioned at bottom - only show when NOT in story mode */}
                    {!showStory && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <button
                          onClick={() => setShowPressingDetails(false)}
                          className="bg-gray-900 text-white px-6 py-2 text-xs hover:bg-gray-700 transition-colors"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          DONE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Album Title and Shopping Cart Section */}
              <div className="mt-1 w-full text-center">
                <h2 className="text-xl font-bold text-gray-900">Sgt. Pepper's Lonely Heart Club Band</h2>
                {/* Price - moved up to be directly after title */}
                <div className="mt-1 text-center">
                  <span className="text-2xl font-bold text-gray-900">$450</span>
                </div>

                {/* Add to Cart Button - moved to be directly after VIEW DETAILS */}
                {/* Add to Cart Button - Premium Grade A Vinyl Styling */}
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="premium-add-to-cart-btn flex items-center font-bold text-sm tracking-wide"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      backgroundColor: isAdding ? "#1E5C41" : "#1E5C41",
                      color: "#FFFFFF",
                      borderRadius: "3px",
                      paddingTop: "14px",
                      paddingBottom: "14px",
                      paddingLeft: "28px",
                      paddingRight: "28px",
                      border: "none",
                      cursor: isAdding ? "default" : "pointer",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      if (!isAdding) {
                        e.currentTarget.style.backgroundColor = "#154430"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAdding) {
                        e.currentTarget.style.backgroundColor = "#1E5C41"
                      }
                    }}
                  >
                    {isAdding ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "8px" }}
                        >
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        ADDED!
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "8px" }}
                        >
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="m16 10a4 4 0 0 1-8 0" />
                        </svg>
                        ADD TO CART
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Detail Container */}
            <div
              className="flex-shrink-0 h-full flex flex-col"
              style={{
                width: "440px",
                height: "670px",
                backgroundColor: "#FBFBFB",
                border: "1px solid #E0E0E0",
                borderRadius: "3px",
                padding: "20px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Section Title - Hasselblad Precision Zoom */}
              <div className="text-center relative" style={{ marginBottom: "16px" }}>
                <h2
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#333333",
                  }}
                >
                  Photography Details
                  <span
                    className="hover:text-red-700 cursor-pointer relative inline-block ml-0.5"
                    style={{
                      color: "#ef4444",
                      fontSize: "19px",
                      verticalAlign: "text-bottom",
                      position: "relative",
                      top: "-1px",
                    }}
                    onMouseEnter={() => setShowDialog(true)}
                    onMouseLeave={() => setShowDialog(false)}
                  >
                    ⓘ
                  </span>
                </h2>

                {/* Floating Dialog */}
                {showDialog && (
                  <div className="absolute top-[37px] left-1/2 transform -translate-x-1/2 w-[400px] h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 p-6">
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
                      <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">See What You're Buying</h3>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Tired of receiving an item that doesn't match its description? We eliminate that uncertainty!
                          <br />
                          <br />
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
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-[75px] w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* Thumbnails Grid - flex-1 to fill remaining space */}
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-4 flex-1">
                  {albumViews.map((view) => (
                    <div
                      key={view.id}
                      className="cursor-pointer flex flex-col"
                      onClick={() => handleThumbnailClick(view.id)}
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
                            selectedView === view.id ? "text-red-500 font-bold" : "text-gray-500"
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
