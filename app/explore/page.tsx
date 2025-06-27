"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

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

const artistSuggestions = [
  "The Beatles",
  "Pink Floyd",
  "Led Zeppelin",
  "The Rolling Stones",
  "Bob Dylan",
  "David Bowie",
  "Queen",
  "The Who",
  "Fleetwood Mac",
  "Eagles",
]

const albumSuggestions = [
  "Abbey Road",
  "Dark Side of the Moon",
  "Led Zeppelin IV",
  "Rumours",
  "The Wall",
  "Sgt. Pepper's Lonely Hearts Club Band",
  "Hotel California",
  "Thriller",
  "Back in Black",
  "The Joshua Tree",
]

const labelSuggestions = [
  "Capitol Records",
  "Columbia Records",
  "Atlantic Records",
  "EMI",
  "Warner Bros",
  "Motown",
  "Blue Note",
  "Verve",
  "Decca",
  "RCA Victor",
]

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    artist: "",
    albumTitle: "",
    genre: "",
    format: "",
    mediaCondition: "",
    availabilityInStock: false,
    priceRange: "",
    releaseYear: "",
    label: "",
    countryOfOrigin: "",
    colorOfVinyl: "",
  })

  const [artistOpen, setArtistOpen] = useState(false)
  const [albumOpen, setAlbumOpen] = useState(false)
  const [labelOpen, setLabelOpen] = useState(false)

  const [artistOpenMobile, setArtistOpenMobile] = useState(false)
  const [albumOpenMobile, setAlbumOpenMobile] = useState(false)
  const [labelOpenMobile, setLabelOpenMobile] = useState(false)

  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false)

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
              <p
                className="text-center tracking-wider"
                style={{
                  marginTop: "18px",
                  fontSize: "18px",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                  color: "#333333",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                EVERY DETAIL MATTERS
              </p>
            </div>
          </div>
        </header>

        {/* Collections Grid */}
        <main className="px-4 lg:px-8 pb-16 -mt-1">
          {/* Desktop: 3 columns with exactly 580x580 containers */}
          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
            {/* Filter Bar positioned above first row */}
            <div className="w-full flex justify-between items-center mb-1" style={{ maxWidth: "1924px" }}>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setDialogOpen(true)}
                  >
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
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white text-gray-900 border-gray-200">
                  <DialogHeader>
                    <div className="text-center pb-4">
                      <h2
                        className="text-2xl font-bold text-gray-900 tracking-wide"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        FILTERS
                      </h2>
                    </div>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
                    {/* Essential Browse & Searching */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Explore</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="artist" className="text-sm font-medium text-gray-700 mb-2 block">
                            Artist
                          </Label>
                          <div className="relative">
                            <Input
                              placeholder="Search by artist name..."
                              value={filters.artist}
                              onChange={(e) => {
                                setFilters({ ...filters, artist: e.target.value })
                                setArtistOpen(e.target.value.length > 0)
                              }}
                              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            />
                            {artistOpen && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No artists found.</CommandEmpty>
                                    <CommandGroup>
                                      {artistSuggestions
                                        .filter((artist) => artist.toLowerCase().includes(filters.artist.toLowerCase()))
                                        .map((artist) => (
                                          <CommandItem
                                            key={artist}
                                            onSelect={() => {
                                              setFilters({ ...filters, artist })
                                              setArtistOpen(false)
                                            }}
                                          >
                                            {artist}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="albumTitle" className="text-sm font-medium text-gray-700 mb-2 block">
                            Album Title
                          </Label>
                          <div className="relative">
                            <Input
                              placeholder="Search by album title..."
                              value={filters.albumTitle}
                              onChange={(e) => {
                                setFilters({ ...filters, albumTitle: e.target.value })
                                setAlbumOpen(e.target.value.length > 0)
                              }}
                              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            />
                            {albumOpen && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No albums found.</CommandEmpty>
                                    <CommandGroup>
                                      {albumSuggestions
                                        .filter((album) =>
                                          album.toLowerCase().includes(filters.albumTitle.toLowerCase()),
                                        )
                                        .map((album) => (
                                          <CommandItem
                                            key={album}
                                            onSelect={() => {
                                              setFilters({ ...filters, albumTitle: album })
                                              setAlbumOpen(false)
                                            }}
                                          >
                                            {album}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="genre" className="text-sm font-medium text-gray-700 mb-2 block">
                            Genre
                          </Label>
                          <Select
                            value={filters.genre}
                            onValueChange={(value) => setFilters({ ...filters, genre: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select genre..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="rock">Rock</SelectItem>
                              <SelectItem value="jazz">Jazz</SelectItem>
                              <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                              <SelectItem value="classical">Classical</SelectItem>
                              <SelectItem value="electronic">Electronic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Product Specifics & Availability */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vinyl Specifics</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="format" className="text-sm font-medium text-gray-700 mb-2 block">
                            Format
                          </Label>
                          <Select
                            value={filters.format}
                            onValueChange={(value) => setFilters({ ...filters, format: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select format..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="lp">LP EP, 7-inch</SelectItem>
                              <SelectItem value="10-inch">10-inch</SelectItem>
                              <SelectItem value="12-inch">12-inch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="mediaCondition" className="text-sm font-medium text-gray-700 mb-2 block">
                            Media Condition
                          </Label>
                          <Select
                            value={filters.mediaCondition}
                            onValueChange={(value) => setFilters({ ...filters, mediaCondition: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select condition..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="mint">Mint</SelectItem>
                              <SelectItem value="near-mint">Near Mint</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="availabilityInStock"
                            checked={filters.availabilityInStock}
                            onCheckedChange={(checked) =>
                              setFilters({ ...filters, availabilityInStock: checked as boolean })
                            }
                            className="border-gray-300"
                          />
                          <Label htmlFor="availabilityInStock" className="text-sm font-medium text-gray-700">
                            Availability in Stock
                          </Label>
                        </div>

                        <div>
                          <Label htmlFor="priceRange" className="text-sm font-medium text-gray-700 mb-2 block">
                            Price Range
                          </Label>
                          <Select
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select price range..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="200-499">$200 - $499</SelectItem>
                              <SelectItem value="500-999">$500 - $999</SelectItem>
                              <SelectItem value="1000-2499">$1,000 - $2,499</SelectItem>
                              <SelectItem value="2500-plus">$2,500+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Collector & Niche Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Collector's Choice</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="releaseYear" className="text-sm font-medium text-gray-700 mb-2 block">
                            Release Year/Decade
                          </Label>
                          <Select
                            value={filters.releaseYear}
                            onValueChange={(value) => setFilters({ ...filters, releaseYear: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select decade..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="2020s">2020s</SelectItem>
                              <SelectItem value="2010s">2010s</SelectItem>
                              <SelectItem value="2000s">2000s</SelectItem>
                              <SelectItem value="1990s">1990s</SelectItem>
                              <SelectItem value="1980s">1980s</SelectItem>
                              <SelectItem value="1970s">1970s</SelectItem>
                              <SelectItem value="1960s">1960s</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="label" className="text-sm font-medium text-gray-700 mb-2 block">
                            Label
                          </Label>
                          <div className="relative">
                            <Input
                              placeholder="Search by record label..."
                              value={filters.label}
                              onChange={(e) => {
                                setFilters({ ...filters, label: e.target.value })
                                setLabelOpen(e.target.value.length > 0)
                              }}
                              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            />
                            {labelOpen && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No labels found.</CommandEmpty>
                                    <CommandGroup>
                                      {labelSuggestions
                                        .filter((label) => label.toLowerCase().includes(filters.label.toLowerCase()))
                                        .map((label) => (
                                          <CommandItem
                                            key={label}
                                            onSelect={() => {
                                              setFilters({ ...filters, label })
                                              setLabelOpen(false)
                                            }}
                                          >
                                            {label}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="countryOfOrigin" className="text-sm font-medium text-gray-700 mb-2 block">
                            Country of Origin
                          </Label>
                          <Select
                            value={filters.countryOfOrigin}
                            onValueChange={(value) => setFilters({ ...filters, countryOfOrigin: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select country..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="usa">USA</SelectItem>
                              <SelectItem value="uk">UK</SelectItem>
                              <SelectItem value="germany">Germany</SelectItem>
                              <SelectItem value="japan">Japan</SelectItem>
                              <SelectItem value="canada">Canada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="colorOfVinyl" className="text-sm font-medium text-gray-700 mb-2 block">
                            Color (of vinyl)
                          </Label>
                          <Select
                            value={filters.colorOfVinyl}
                            onValueChange={(value) => setFilters({ ...filters, colorOfVinyl: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select vinyl color..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="black">Black</SelectItem>
                              <SelectItem value="clear">Clear</SelectItem>
                              <SelectItem value="colored">Colored</SelectItem>
                              <SelectItem value="picture-disc">Picture Disc</SelectItem>
                              <SelectItem value="splatter">Splatter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  <div className="flex justify-between items-center pt-4">
                    <div></div>
                    <div className="text-sm text-gray-600">Current Filter Results: 21</div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                    >
                      Clear All
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
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
              <Dialog open={mobileDialogOpen} onOpenChange={setMobileDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileDialogOpen(true)}
                  >
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
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto bg-white text-gray-900 border-gray-200">
                  <DialogHeader>
                    <div className="text-center pb-4">
                      <h2
                        className="text-2xl font-bold text-gray-900 tracking-wide"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        FILTERS
                      </h2>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6 py-6">
                    {/* Essential Browse & Searching - Always visible on mobile */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Explore</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="artist-mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                            Artist
                          </Label>
                          <div className="relative">
                            <Input
                              id="artist-mobile"
                              placeholder="Search by artist name..."
                              value={filters.artist}
                              onChange={(e) => {
                                setFilters({ ...filters, artist: e.target.value })
                                setArtistOpenMobile(e.target.value.length > 0)
                              }}
                              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            />
                            {artistOpenMobile && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No artists found.</CommandEmpty>
                                    <CommandGroup>
                                      {artistSuggestions
                                        .filter((artist) => artist.toLowerCase().includes(filters.artist.toLowerCase()))
                                        .map((artist) => (
                                          <CommandItem
                                            key={artist}
                                            onSelect={() => {
                                              setFilters({ ...filters, artist })
                                              setArtistOpenMobile(false)
                                            }}
                                          >
                                            {artist}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="albumTitle-mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                            Album Title
                          </Label>
                          <div className="relative">
                            <Input
                              id="albumTitle-mobile"
                              placeholder="Search by album title..."
                              value={filters.albumTitle}
                              onChange={(e) => {
                                setFilters({ ...filters, albumTitle: e.target.value })
                                setAlbumOpenMobile(e.target.value.length > 0)
                              }}
                              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            />
                            {albumOpenMobile && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No albums found.</CommandEmpty>
                                    <CommandGroup>
                                      {albumSuggestions
                                        .filter((album) =>
                                          album.toLowerCase().includes(filters.albumTitle.toLowerCase()),
                                        )
                                        .map((album) => (
                                          <CommandItem
                                            key={album}
                                            onSelect={() => {
                                              setFilters({ ...filters, albumTitle: album })
                                              setAlbumOpenMobile(false)
                                            }}
                                          >
                                            {album}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="genre-mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                            Genre
                          </Label>
                          <Select
                            value={filters.genre}
                            onValueChange={(value) => setFilters({ ...filters, genre: value })}
                          >
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                              <SelectValue placeholder="Select genre..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-300">
                              <SelectItem value="rock">Rock</SelectItem>
                              <SelectItem value="jazz">Jazz</SelectItem>
                              <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                              <SelectItem value="classical">Classical</SelectItem>
                              <SelectItem value="electronic">Electronic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* See More Button - Mobile Only */}
                    <div className="flex justify-center">
                      <Button
                        onClick={() => setShowMoreFilters(!showMoreFilters)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
                      >
                        {showMoreFilters ? "See Less" : "See More"}
                      </Button>
                    </div>

                    {/* Collapsible Additional Filters */}
                    {showMoreFilters && (
                      <>
                        <Separator className="bg-gray-200" />

                        {/* Product Specifics & Availability */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifics & Availability</h3>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="format-mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                                Format
                              </Label>
                              <Select
                                value={filters.format}
                                onValueChange={(value) => setFilters({ ...filters, format: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select format..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="lp">LP EP, 7-inch</SelectItem>
                                  <SelectItem value="10-inch">10-inch</SelectItem>
                                  <SelectItem value="12-inch">12-inch</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label
                                htmlFor="mediaCondition-mobile"
                                className="text-sm font-medium text-gray-700 mb-2 block"
                              >
                                Media Condition
                              </Label>
                              <Select
                                value={filters.mediaCondition}
                                onValueChange={(value) => setFilters({ ...filters, mediaCondition: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select condition..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="mint">Mint</SelectItem>
                                  <SelectItem value="near-mint">Near Mint</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="availabilityInStock-mobile"
                                checked={filters.availabilityInStock}
                                onCheckedChange={(checked) =>
                                  setFilters({ ...filters, availabilityInStock: checked as boolean })
                                }
                                className="border-gray-300"
                              />
                              <Label htmlFor="availabilityInStock-mobile" className="text-sm font-medium text-gray-700">
                                Availability in Stock
                              </Label>
                            </div>

                            <div>
                              <Label
                                htmlFor="priceRange-mobile"
                                className="text-sm font-medium text-gray-700 mb-2 block"
                              >
                                Price Range
                              </Label>
                              <Select
                                value={filters.priceRange}
                                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select price range..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="200-499">$200 - $499</SelectItem>
                                  <SelectItem value="500-999">$500 - $999</SelectItem>
                                  <SelectItem value="1000-2499">$1,000 - $2,499</SelectItem>
                                  <SelectItem value="2500-plus">$2,500+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-gray-200" />

                        {/* Collector & Niche Details */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collector's Choice</h3>

                          <div className="space-y-4">
                            <div>
                              <Label
                                htmlFor="releaseYear-mobile"
                                className="text-sm font-medium text-gray-700 mb-2 block"
                              >
                                Release Year/Decade
                              </Label>
                              <Select
                                value={filters.releaseYear}
                                onValueChange={(value) => setFilters({ ...filters, releaseYear: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select decade..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="2020s">2020s</SelectItem>
                                  <SelectItem value="2010s">2010s</SelectItem>
                                  <SelectItem value="2000s">2000s</SelectItem>
                                  <SelectItem value="1990s">1990s</SelectItem>
                                  <SelectItem value="1980s">1980s</SelectItem>
                                  <SelectItem value="1970s">1970s</SelectItem>
                                  <SelectItem value="1960s">1960s</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="label-mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                                Label
                              </Label>
                              <div className="relative">
                                <Input
                                  id="label-mobile"
                                  placeholder="Search by record label..."
                                  value={filters.label}
                                  onChange={(e) => {
                                    setFilters({ ...filters, label: e.target.value })
                                    setLabelOpenMobile(e.target.value.length > 0)
                                  }}
                                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                />
                                {labelOpenMobile && (
                                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <Command>
                                      <CommandList>
                                        <CommandEmpty>No labels found.</CommandEmpty>
                                        <CommandGroup>
                                          {labelSuggestions
                                            .filter((label) =>
                                              label.toLowerCase().includes(filters.label.toLowerCase()),
                                            )
                                            .map((label) => (
                                              <CommandItem
                                                key={label}
                                                onSelect={() => {
                                                  setFilters({ ...filters, label })
                                                  setLabelOpenMobile(false)
                                                }}
                                              >
                                                {label}
                                              </CommandItem>
                                            ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <Label
                                htmlFor="countryOfOrigin-mobile"
                                className="text-sm font-medium text-gray-700 mb-2 block"
                              >
                                Country of Origin
                              </Label>
                              <Select
                                value={filters.countryOfOrigin}
                                onValueChange={(value) => setFilters({ ...filters, countryOfOrigin: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select country..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="usa">USA</SelectItem>
                                  <SelectItem value="uk">UK</SelectItem>
                                  <SelectItem value="germany">Germany</SelectItem>
                                  <SelectItem value="japan">Japan</SelectItem>
                                  <SelectItem value="canada">Canada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label
                                htmlFor="colorOfVinyl-mobile"
                                className="text-sm font-medium text-gray-700 mb-2 block"
                              >
                                Color (of vinyl)
                              </Label>
                              <Select
                                value={filters.colorOfVinyl}
                                onValueChange={(value) => setFilters({ ...filters, colorOfVinyl: value })}
                              >
                                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                  <SelectValue placeholder="Select vinyl color..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                  <SelectItem value="black">Black</SelectItem>
                                  <SelectItem value="clear">Clear</SelectItem>
                                  <SelectItem value="colored">Colored</SelectItem>
                                  <SelectItem value="picture-disc">Picture Disc</SelectItem>
                                  <SelectItem value="splatter">Splatter</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Separator className="bg-gray-200" />

                  <div className="flex justify-between items-center pt-4">
                    <div></div>
                    <div className="text-sm text-gray-600">Current Filter Results: 21</div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                    >
                      Clear All
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
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
