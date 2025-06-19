"use client"

import { useState, useRef } from "react"

export default function LpMobile() {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleGetStarted = () => {
    setShowVideo(true)
    // Small delay to ensure video element is rendered
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.play()
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-['Montserrat'] text-white">
      {/* Video preloading in background - always present but hidden until needed */}
      <div className={`fixed inset-0 w-full h-full ${showVideo ? "block" : "hidden"}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          preload="auto"
          playsInline
          src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/GAV_MOBILE_Intro-pFMpmqmAcjb910pz6OgiRPs3t063fc.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {!showVideo && (
        <>
          {/* Content positioned at top third */}
          <div className="flex-1 flex flex-col justify-start pt-[33vh] px-8">
            <div className="text-center space-y-8">
              {/* Main heading - refined */}
              <h1 className="text-3xl md:text-4xl font-light leading-tight max-w-md mx-auto tracking-wide">
                Welcome to the new
                <br /> Online Vinyl Standard.
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
  )
}
