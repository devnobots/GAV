"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function LpMobile() {
  const [currentPhase, setCurrentPhase] = useState<"landing" | "mainVideo">("landing")
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const handleGetStarted = () => {
    setCurrentPhase("mainVideo")
    // Video is already loaded, just play it immediately
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = false
      mainVideoRef.current.play()
    }
  }

  const handleVideoClick = () => {
    router.push("/lp-mobile-home")
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
        {/* Video - Always present, loading in background */}
        <div
          className={`fixed inset-0 w-full h-full cursor-pointer ${currentPhase === "mainVideo" ? "block" : "hidden"}`}
          onClick={handleVideoClick}
        >
          <video
            ref={mainVideoRef}
            className="w-full h-full object-cover"
            muted
            preload="auto"
            playsInline
            src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/gav_video_mobile-6FcCrJYxafBaLWGdMME7LobSTUrD3G.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Landing Screen - Shows initially */}
        {currentPhase === "landing" && (
          <>
            {/* Content positioned at top third */}
            <div className="flex-1 flex flex-col justify-start pt-[33vh] px-8">
              <div className="text-center space-y-8">
                {/* Main heading */}
                <h1 className="text-2xl md:text-3xl font-light leading-tight max-w-xl mx-auto tracking-wide">
                  Are you ready for a <br />
                  new way to buy vinyl online?
                </h1>

                {/* Two buttons side by side */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleGetStarted}
                    className="group relative border border-white/20 bg-transparent hover:bg-white/5 text-white font-medium py-3 px-8 transition-all duration-300 tracking-wider text-sm uppercase"
                  >
                    <span className="relative z-10">YES</span>
                    <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
                  </button>

                  <button
                    onClick={() => window.open("https://www.discogs.com/", "_blank")}
                    className="group relative border border-white/20 bg-transparent hover:bg-white/5 text-white font-medium py-3 px-8 transition-all duration-300 tracking-wider text-sm uppercase"
                  >
                    <span className="relative z-10">NO</span>
                    <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/30 transition-all duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
