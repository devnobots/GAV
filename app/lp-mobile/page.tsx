"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LpMobile() {
  const [currentPhase, setCurrentPhase] = useState<"landing" | "mainVideo">("landing")
  const [videoLoadProgress, setVideoLoadProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoState, setVideoState] = useState("loading")
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const loopVideoRef = useRef<HTMLVideoElement>(null)
  const [isLoopVideo, setIsLoopVideo] = useState(false)
  const [isLoopVideoReady, setIsLoopVideoReady] = useState(false)
  const router = useRouter()

  // Start fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle loop video loading
  useEffect(() => {
    const loopVideo = loopVideoRef.current
    if (!loopVideo) return

    const handleLoopVideoReady = () => {
      setIsLoopVideoReady(true)
    }

    loopVideo.addEventListener("canplaythrough", handleLoopVideoReady)
    loopVideo.addEventListener("loadeddata", handleLoopVideoReady)

    return () => {
      loopVideo.removeEventListener("canplaythrough", handleLoopVideoReady)
      loopVideo.removeEventListener("loadeddata", handleLoopVideoReady)
    }
  }, [])

  // Handle video loading progress and events
  useEffect(() => {
    const video = mainVideoRef.current
    if (!video) return

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          const progress = (bufferedEnd / duration) * 100
          setVideoLoadProgress(Math.round(progress))
        }
      }
    }

    const handleCanPlayThrough = () => {
      setIsVideoReady(true)
      setVideoLoadProgress(100)
      setVideoState("ready")

      // Start preloading loop video once main video is ready
      if (loopVideoRef.current && !isLoopVideoReady) {
        loopVideoRef.current.load()
      }
    }

    const handleLoadedData = () => {
      setVideoState("data loaded")
      handleProgress()
    }

    const handleLoadStart = () => {
      setVideoState("started loading")
    }

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement
      setVideoError(`Error: ${target.error?.code} - ${target.error?.message}`)
      setVideoState("error")
    }

    const handleLoadedMetadata = () => {
      setVideoState("metadata loaded")
    }

    const handleVideoEnded = () => {
      // Only switch if loop video is ready
      if (isLoopVideoReady && loopVideoRef.current) {
        setIsLoopVideo(true)
        loopVideoRef.current.muted = false
        loopVideoRef.current.play().catch((err) => {
          console.error("Loop video play error:", err)
        })
      } else {
        // If loop video isn't ready, wait a bit and try again
        setTimeout(() => {
          if (loopVideoRef.current) {
            setIsLoopVideo(true)
            loopVideoRef.current.muted = false
            loopVideoRef.current.play().catch((err) => {
              console.error("Loop video play error:", err)
            })
          }
        }, 100)
      }
    }

    // Force load attempt
    const forceLoad = () => {
      try {
        video.load()
        setVideoState("force loading...")
      } catch (err) {
        setVideoError(`Load error: ${err}`)
      }
    }

    video.addEventListener("progress", handleProgress)
    video.addEventListener("canplaythrough", handleCanPlayThrough)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("error", handleError)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleVideoEnded)

    // Try to force load after a short delay
    setTimeout(forceLoad, 500)

    return () => {
      video.removeEventListener("progress", handleProgress)
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleVideoEnded)
    }
  }, [isLoopVideoReady])

  const handleGetStarted = () => {
    setCurrentPhase("mainVideo")
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = false
      mainVideoRef.current.play().catch((err) => {
        console.error("Play error:", err)
      })
    }
  }

  const handleVideoClick = () => {
    router.push("/lp-mobile-home")
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-black flex flex-col text-white relative"
        style={{ fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        {/* Enhanced Debug Info - Hidden but preserved */}
        <div className="absolute top-4 left-4 text-xs text-white/70 font-mono z-50 bg-black/50 p-2 rounded hidden">
          <div>Video Load: {videoLoadProgress}%</div>
          <div>Ready: {isVideoReady ? "Yes" : "No"}</div>
          <div>Loop Ready: {isLoopVideoReady ? "Yes" : "No"}</div>
          <div>State: {videoState}</div>
          {videoError && <div className="text-red-400">Error: {videoError}</div>}
        </div>

        {/* Video - Always present, loading in background */}
        <div
          className={`fixed inset-0 w-full h-full cursor-pointer ${currentPhase === "mainVideo" ? "block" : "hidden"}`}
          onClick={handleVideoClick}
        >
          <video
            ref={mainVideoRef}
            className={`w-full h-full object-cover ${isLoopVideo ? "hidden" : "block"}`}
            muted
            preload="auto"
            playsInline
            crossOrigin="anonymous"
            src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/gav_mobile_b-EQuz1dNLDRFz5fqsJCEcxmIEcb6A5f.mp4"
          >
            Your browser does not support the video tag.
          </video>

          <video
            ref={loopVideoRef}
            className={`w-full h-full object-cover ${isLoopVideo ? "block" : "hidden"}`}
            muted
            preload="auto"
            playsInline
            loop
            crossOrigin="anonymous"
            src="https://dg9gcoxo6erv82nw.public.blob.vercel-storage.com/GAV_MOBILE_loop-QREB62sBVcKjv6kVAqbvwtE3fXPJ9E.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Landing Screen */}
        {currentPhase === "landing" && (
          <div
            className={`flex-1 flex flex-col justify-start pt-[33vh] px-8 transition-opacity duration-[4000ms] ease-out ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center space-y-8">
              <h1 className="text-2xl md:text-3xl font-light leading-tight max-w-xl mx-auto tracking-wide">
                Are you ready for a<br />
                new way to buy
                <br />
                vinyl online?
              </h1>

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
        )}
      </div>
    </>
  )
}
