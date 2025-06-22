"use client"
import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    id: "beats",
    title: "SGT PEPPER'S LONELY HEARTS CLUB BAND",
    artist: "THE BEATLES",
    image: "/images/sgt-pepper-600x600.png",
    href: "/",
  },
  {
    id: "jazz",
    title: "ABBEY ROAD",
    artist: "THE BEATLES",
    image: "/images/abbey-road-580x580.png",
    href: "/",
  },
  {
    id: "jazz-blues",
    title: "SGT PEPPER'S LONELY HEARTS CLUB BAND",
    artist: "THE BEATLES",
    image: "/images/sgt-pepper-600x600.png",
    href: "/",
  },
  {
    id: "live-music",
    title: "SGT PEPPER'S LONELY HEARTS CLUB BAND",
    artist: "THE BEATLES",
    image: "/images/sgt-pepper-600x600.png",
    href: "/",
  },
  {
    id: "psychedelic",
    title: "SGT PEPPER'S LONELY HEARTS CLUB BAND",
    artist: "THE BEATLES",
    image: "/images/sgt-pepper-600x600.png",
    href: "/",
  },
  {
    id: "punk",
    title: "SGT PEPPER'S LONELY HEARTS CLUB BAND",
    artist: "THE BEATLES",
    image: "/images/sgt-pepper-600x600.png",
    href: "/",
  },
]

export default function ExplorePage() {
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
        }}
      >
        {/* Header */}
        <header className="w-full py-4 px-4 lg:px-8">
          <div className="max-w-none mx-auto">
            {/* Logo */}
            <div className="text-center mb-4">
              <h1 className="text-4xl font-black text-red-500 tracking-wider">GRADE A VINYL</h1>
            </div>
          </div>
        </header>

        {/* Collections Grid */}
        <main className="px-4 lg:px-8 pb-16">
          {/* Desktop: 3 columns with exactly 580x580 containers */}
          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
            {/* Filter Bar positioned above first row */}
            <div className="w-full flex justify-between items-center mb-1" style={{ maxWidth: "1924px" }}>
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Show filters
              </button>
              <span className="text-sm font-medium text-gray-900">122 RESULTS</span>
            </div>

            {/* Album Grid */}
            {collections.map((collection) => (
              <div key={collection.id} className="group">
                <Link href={collection.href}>
                  <div
                    className="relative overflow-hidden bg-gray-100 mb-3 transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    style={{ width: "580px", height: "580px" }}
                  >
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                      sizes="580px"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                </Link>
                <div className="text-center" style={{ marginTop: "10px" }}>
                  <h3
                    className="text-gray-900 mb-1 font-normal tracking-wide"
                    style={{ fontSize: "13px", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {collection.title}
                  </h3>
                  <Link href={collection.href}>
                    <p
                      className="text-gray-900 underline font-normal hover:text-gray-700 transition-colors"
                      style={{ fontSize: "15px", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {collection.artist}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2 columns with smaller containers */}
          <div className="grid lg:hidden grid-cols-2 gap-4">
            {/* Mobile Filter Bar */}
            <div className="col-span-2 flex justify-between items-center w-full mb-1">
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Filter
              </button>
              <span className="text-sm font-medium text-gray-900">122 RESULTS</span>
            </div>

            {collections.map((collection) => (
              <div key={collection.id} className="group">
                <Link href={collection.href}>
                  <div className="relative overflow-hidden bg-gray-100 aspect-square mb-3 transition-transform duration-300 group-hover:scale-105 w-full cursor-pointer">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                </Link>
                <div className="text-center" style={{ marginTop: "6px" }}>
                  <h3
                    className="text-gray-900 mb-1 font-normal tracking-wide"
                    style={{ fontSize: "11px", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {collection.title}
                  </h3>
                  <Link href={collection.href}>
                    <p
                      className="text-gray-900 underline font-normal hover:text-gray-700 transition-colors"
                      style={{ fontSize: "13px", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {collection.artist}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
