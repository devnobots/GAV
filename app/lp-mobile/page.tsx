"use client"

import { useState, useRef } from "react"

export default function LpMobile() {
  const [currentPhase, setCurrentPhase] = useState<"loader" | "landing" | "mainVideo">("loader")
  const loaderVideoRef = useRef<HTMLVideoElement>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)

  const handleLoaderVideoEnd = () => {
    setCurrentPhase("landing")
  }

  const handleGetStarted = () => {
    setCurrentPhase("mainVideo")
    // Small delay to ensure video element is rendered
    setTimeout(() => {
      if (mainVideoRef.current) {
        mainVideoRef.current.muted = false
        mainVideoRef.current.play()
      }
    }, 100)
  }

  return (
    <>
      {/* Google Fonts import for reliable cross-browser loading */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-black flex flex-col text-white"
        style={{ fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        {/* Loader Video - Shows first */}
        {currentPhase === "loader" && (
          <div className="fixed inset-0 w-full h-full">
            <video
              ref={loaderVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleLoaderVideoEnd}
              src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/loader-GAI8ipLqJIf7H9Aq6hjq948qvqwh5L.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Main Video - Shows after Get Started is clicked */}
        {currentPhase === "mainVideo" && (
          <div className="fixed inset-0 w-full h-full">
            <video
              ref={mainVideoRef}
              className="w-full h-full object-cover"
              muted
              preload="auto"
              playsInline
              src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/GAV_MOBILE_1-vsfPN3EnHQUCPbRlwR4sovaoRgKAVi.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Landing Screen - Shows after loader video ends */}
        {currentPhase === "landing" && (
          <>
            {/* Content positioned at top third */}
            <div className="flex-1 flex flex-col justify-start pt-[33vh] px-8">
              <div className="text-center space-y-8">
                {/* Main heading - using non-breaking space to keep "Online Vinyl Standard." together */}
                <h1 className="text-3xl md:text-4xl font-light leading-tight max-w-xl mx-auto tracking-wide">
                  Welcome to the new
                  <br />
                  <span style={{ whiteSpace: "nowrap" }}>Online Vinyl Standard.</span>
                </h1>

                {/* Get Started button - redesigned */}
                <button
                  onClick={handleGetStarted}
                  className="group relative border border-white/20 bg-transparent hover:bg-white/5 text-white font-medium py-3 px-8 transition-all duration-300 tracking-wider text-sm uppercase"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/30 transition-all duration-300"></div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
