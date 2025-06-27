"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, User, Menu, ChevronLeft, ChevronRight, Star, Heart, Share2 } from "lucide-react"

export default function GradeAVinylSite() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [showStory, setShowStory] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const images = ["/images/sgt-pepper-600x600.png", "/images/sgt-pepper-cover.png", "/images/vinyl-record.png"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const addToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  if (showStory) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-gray-900">Grade A Vinyl</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    Browse
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    New Arrivals
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    Rare Finds
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    About
                  </a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                  {cartCount > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 text-white"
                      style={{ backgroundColor: "#22c55e" }}
                    >
                      {cartCount}
                    </Badge>
                  )}
                </div>
                <Menu className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900 md:hidden" />
              </div>
            </div>
          </div>
        </header>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="relative mb-8">
            <button
              onClick={() => setShowStory(false)}
              className="absolute left-0 text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
              style={{ top: "-10px" }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Details
            </button>

            {/* Story Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center">WHY THIS RECORD IS SPECIAL</h1>
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                The Beatles - Sgt. Pepper's Lonely Hearts Club Band
              </h2>
              <p className="text-gray-700 mb-4">
                Released on June 1, 1967, "Sgt. Pepper's Lonely Hearts Club Band" is widely regarded as one of the most
                influential albums in the history of popular music. This groundbreaking record marked a pivotal moment
                in The Beatles' career and in the evolution of rock music itself.
              </p>
              <p className="text-gray-700 mb-4">
                The album was revolutionary in its use of studio techniques, orchestration, and conceptual unity. It was
                one of the first albums to be conceived as a complete artistic statement rather than just a collection
                of songs. The Beatles, working with producer George Martin, pushed the boundaries of what was possible
                in the recording studio.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Musical Innovation</h3>
              <p className="text-gray-700 mb-4">
                The album features complex arrangements, innovative use of orchestration, and pioneering studio effects.
                Songs like "A Day in the Life" showcase the band's ability to seamlessly blend different musical
                sections and styles, while "Lucy in the Sky with Diamonds" demonstrates their psychedelic
                experimentation.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Cultural Impact</h3>
              <p className="text-gray-700 mb-4">
                "Sgt. Pepper's" became a cultural phenomenon that extended far beyond music. The album's colorful,
                surreal artwork and themes resonated with the counterculture movement of the 1960s. It influenced
                fashion, art, and popular culture in ways that are still felt today.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">This Pressing</h3>
              <p className="text-gray-700">
                This particular pressing is a first UK pressing from 1967, featuring the original Parlophone label. The
                vinyl is in exceptional condition, having been carefully preserved and stored. The sound quality is
                pristine, allowing you to experience the album as it was meant to be heard - with all the warmth and
                depth that only vinyl can provide.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Grade A Vinyl</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Browse
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  New Arrivals
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Rare Finds
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 text-white"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
              <Menu className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900 md:hidden" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt="Vinyl Record"
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                The Beatles - Sgt. Pepper's Lonely Hearts Club Band
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(127 reviews)</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-4">$89.99</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Condition</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Near Mint (NM)
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Original 1967 UK Pressing</li>
                  <li>• Parlophone Label</li>
                  <li>• Gatefold Sleeve</li>
                  <li>• Includes Original Insert</li>
                  <li>• Matrix: YEX 637-2 / YEX 638-2</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  Photographed with
                  <span className="ml-2">
                    Hasselblad Precision
                    <span
                      className="relative cursor-help ml-1"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      style={{
                        color: "#333333",
                        fontSize: "19px",
                        verticalAlign: "text-bottom",
                        position: "relative",
                        top: "-1px",
                      }}
                    >
                      [?]
                    </span>
                  </span>
                  {showTooltip && (
                    <div className="absolute z-10 bg-black text-white text-xs rounded py-1 px-2 ml-2 whitespace-nowrap">
                      High-resolution medium format camera
                    </div>
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  Every record is photographed using professional Hasselblad medium format cameras to capture the finest
                  details of the vinyl condition, ensuring you know exactly what you're purchasing.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={addToCart} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                ADD TO CART
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowStory(true)}>
              VIEW DETAILS
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
