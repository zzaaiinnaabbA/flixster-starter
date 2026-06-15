import { useEffect, useState } from 'react'
import './Banner.css'

const Banner = ({ apiKey }) => {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`
        )
        const data = await response.json()
        // Get first 4 movies as featured
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 4))
        }
      } catch (error) {
        console.error('Failed to fetch featured movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (apiKey) {
      fetchFeaturedMovies()
    }
  }, [apiKey])

  const handlePrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 300)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
      setIsTransitioning(false)
    }, 300)
  }

  const handleDotClick = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  if (isLoading || movies.length === 0) {
    return (
      <div className="banner skeleton">
        <div className="banner-content">
          <div className="skeleton-text"></div>
        </div>
      </div>
    )
  }

  const movie = movies[currentIndex]
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null

  const getFandangoLink = () => {
    const searchQuery = encodeURIComponent(movie.title)
    return `https://www.fandango.com/search?q=${searchQuery}`
  }

  return (
    <div className="banner">
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          className={`banner-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
        />
      )}
      <div className="banner-overlay"></div>

      {/* Navigation Arrows */}
      <button
        className="banner-arrow banner-arrow-left"
        onClick={handlePrevious}
        aria-label="Previous movie"
      >
        ‹
      </button>
      <button
        className="banner-arrow banner-arrow-right"
        onClick={handleNext}
        aria-label="Next movie"
      >
        ›
      </button>

      <div className="banner-content">
        <h2 className="banner-title">{movie.title}</h2>
        <p className="banner-description">
          {movie.overview?.substring(0, 200)}
          {movie.overview?.length > 200 ? '...' : ''}
        </p>
        <div className="banner-meta">
          <span className="banner-rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
          {movie.release_date && (
            <span className="banner-year">
              {new Date(movie.release_date).getFullYear()}
            </span>
          )}
        </div>
        <a
          href={getFandangoLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="banner-button"
        >
          Get Tickets
        </a>
      </div>

      {/* Dots Indicator */}
      <div className="banner-dots">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to movie ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
