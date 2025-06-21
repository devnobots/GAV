"use client"
import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    id: "beats",
    title: "BEATS",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=10",
    href: "#",
  },
  {
    id: "jazz",
    title: "JAZZ",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=11",
    href: "#",
  },
  {
    id: "jazz-blues",
    title: "JAZZ & BLUES",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=12",
    href: "#",
  },
  {
    id: "live-music",
    title: "LIVE MUSIC",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=13",
    href: "#",
  },
  {
    id: "psychedelic",
    title: "PSYCHEDELIC",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=14",
    href: "#",
  },
  {
    id: "punk",
    title: "PUNK",
    products: "10 products",
    image: "https://picsum.photos/400/400?random=15",
    href: "#",
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
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Collections</span>
          </div>
        </nav>

        {/* Collections Grid */}
        <main className="max-w-7xl mx-auto px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={collection.href} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-1 tracking-wide">
                    {collection.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 underline">{collection.products}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
