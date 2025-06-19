"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const vinylCollection = [
  {
    id: "sgt-pepper",
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    year: "1967",
    image: "/images/sgt-pepper-cover.png",
    condition: "Near Mint",
    href: "/lp-mobile-home",
    size: "large",
    position: { top: "0px", left: "750px" }, // Top right within container
  },
  {
    id: "abbey-road",
    title: "Abbey Road",
    artist: "The Beatles",
    year: "1969",
    image: "https://picsum.photos/400/400?random=1",
    condition: "Very Good+",
    href: "#",
    size: "medium",
    position: { top: "40px", left: "250px" }, // Mid left within container
  },
  {
    id: "dark-side",
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: "1973",
    image: "https://picsum.photos/400/400?random=2",
    condition: "Mint",
    href: "#",
    size: "medium",
    position: { top: "0px", left: "500px" }, // Top center within container
  },
  {
    id: "led-zeppelin-iv",
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    year: "1971",
    image: "https://picsum.photos/400/400?random=3",
    condition: "Near Mint",
    href: "#",
    size: "large",
    position: { top: "0px", left: "20px" }, // Top left within container
  },
  {
    id: "rumours",
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: "1977",
    image: "https://picsum.photos/400/400?random=4",
    condition: "Mint",
    href: "#",
    size: "medium",
    position: { top: "180px", left: "600px" }, // Lower center-right within container
  },
  {
    id: "thriller",
    title: "Thriller",
    artist: "Michael Jackson",
    year: "1982",
    image: "https://picsum.photos/400/400?random=5",
    condition: "Near Mint",
    href: "#",
    size: "small",
    position: { top: "220px", left: "400px" }, // Lower center within container
  },
  {
    id: "nevermind",
    title: "Nevermind",
    artist: "Nirvana",
    year: "1991",
    image: "https://picsum.photos/400/400?random=6",
    condition: "Very Good+",
    href: "#",
    size: "medium",
    position: { top: "350px", left: "450px" }, // Bottom center within container
  },
  {
    id: "back-in-black",
    title: "Back in Black",
    artist: "AC/DC",
    year: "1980",
    image: "https://picsum.photos/400/400?random=7",
    condition: "Near Mint",
    href: "#",
    size: "medium",
    position: { top: "280px", left: "750px" }, // Lower right within container
  },
  {
    id: "hotel-california",
    title: "Hotel California",
    artist: "Eagles",
    year: "1976",
    image: "https://picsum.photos/400/400?random=8",
    condition: "Very Good+",
    href: "#",
    size: "small",
    position: { top: "250px", left: "120px" }, // Lower left within container
  },
  {
    id: "purple-rain",
    title: "Purple Rain",
    artist: "Prince",
    year: "1984",
    image: "https://picsum.photos/400/400?random=9",
    condition: "Near Mint",
    href: "#",
    size: "large",
    position: { top: "320px", left: "50px" }, // Bottom left within container
  },
]

const getSizeClasses = (size: string) => {
  switch (size) {
    case "large":
      return "w-72 h-72 md:w-80 md:h-80"
    case "medium":
      return "w-56 h-56 md:w-64 md:h-64"
    case "small":
      return "w-48 h-48 md:w-52 md:h-52"
    default:
      return "w-64 h-64"
  }
}

export default function ExplorePage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
        {/* Header - Reduced padding */}
        <header className="w-full py-4 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Logo */}
            <div className="text-center mb-4">
              <h1 className="text-4xl font-black text-red-500 tracking-wider">GRADE A VINYL</h1>
            </div>

            {/* Navigation */}
            <nav className="flex justify-center space-x-12 text-sm font-medium text-gray-600">
              <span className="hover:text-gray-900 transition-colors">HOME</span>
              <span className="text-red-500 font-semibold">COLLECTION</span>
              <span className="hover:text-gray-900 transition-colors">OUR MISSION</span>
              <span className="hover:text-gray-900 transition-colors">CONTACT US</span>
            </nav>
          </div>
        </header>

        {/* Invisible Container for Clustered Albums - Properly Centered */}
        <div className="w-full flex justify-center items-start" style={{ marginTop: "50px" }}>
          <div
            className="relative mx-auto"
            style={{
              width: "1024px",
              height: "650px",
            }}
          >
            {vinylCollection.map((album, index) => (
              <Link
                key={album.id}
                href={album.href}
                className="absolute group cursor-pointer transition-all duration-700 hover:z-30"
                style={{
                  top: album.position.top,
                  left: album.position.left,
                  animation: `float-${index % 3} ${8 + (index % 4)}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
                onMouseEnter={() => setHoveredId(album.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`${getSizeClasses(album.size)} relative`}>
                  {/* Album Cover */}
                  <div className="w-full h-full relative overflow-hidden bg-white shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105">
                    <Image
                      src={album.image || "/placeholder.svg"}
                      alt={`${album.title} by ${album.artist}`}
                      fill
                      className="object-cover transition-all duration-700"
                      sizes="(max-width: 768px) 200px, 320px"
                    />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                        hoveredId === album.id ? "bg-opacity-10" : "bg-opacity-0"
                      }`}
                    />

                    {/* Year Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-bold text-gray-800 shadow-lg">
                      {album.year}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CSS Animations for Floating */}
        <style jsx>{`
          @keyframes float-0 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(2px, -3px) rotate(0.5deg); }
            66% { transform: translate(-1px, 2px) rotate(-0.3deg); }
          }
          
          @keyframes float-1 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(-2px, 1px) rotate(-0.4deg); }
            66% { transform: translate(3px, -2px) rotate(0.6deg); }
          }
          
          @keyframes float-2 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(1px, 3px) rotate(0.3deg); }
            66% { transform: translate(-3px, -1px) rotate(-0.5deg); }
          }
        `}</style>
      </div>
    </>
  )
}
