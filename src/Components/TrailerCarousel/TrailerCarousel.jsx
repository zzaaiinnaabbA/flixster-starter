import { useEffect, useState, useRef } from 'react'
import './TrailerCarousel.css'

const TrailerCarousel = ({ apiKey }) => {
  const [trailers, setTrailers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        // Fetch popular movies
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
        )
        const moviesData = await moviesResponse.json()

        // Get trailers for first 10 movies
        const trailerPromises = moviesData.results.slice(0, 10).map(async (movie) => {
          const videosResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
          )
          const videosData = await videosResponse.json()

          // Find the first YouTube trailer
          const trailer = videosData.results?.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          )

          return trailer ? {
            key: trailer.key,
            name: trailer.name,
            movieTitle: movie.title,
            movieId: movie.id
          } : null
        })

        const trailersData = await Promise.all(trailerPromises)
        // Filter out null values (movies without trailers)
        setTrailers(trailersData.filter(Boolean))
      } catch (error) {
        console.error('Failed to fetch trailers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (apiKey) {
      fetchTrailers()
    }
  }, [apiKey])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  if (isLoading) {
    return (
      <div className="trailer-carousel">
        <div className="trailer-carousel-loading">Loading trailers...</div>
      </div>
    )
  }

  if (trailers.length === 0) {
    return null
  }

  return (
    <div className="trailer-carousel">
      <div className="trailer-carousel-container">
        <button
          className="trailer-arrow trailer-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="trailer-scroll" ref={scrollContainerRef}>
          {trailers.map((trailer) => (
            <div key={trailer.key} className="trailer-item">
              <div className="trailer-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.movieTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        <button
          className="trailer-arrow trailer-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default TrailerCarousel
