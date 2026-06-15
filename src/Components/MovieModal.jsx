import { useEffect, useState } from 'react'
import './MovieModal.css'

const MovieModal = ({ isOpen, movieDetails, trailerKey, isLoading, error, onClose }) => {
  // All state hooks must be at the top
  const [aiInsight, setaiInsight] = useState(null)
  const [loadingInsight, setLoadingInsight] = useState(false)

  // All useEffect hooks before early returns
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Fetch AI insight when movie details load
  useEffect(() => {
    if (!isOpen || !movieDetails || isLoading) {
      setaiInsight(null)
      setLoadingInsight(false)
      return
    }

    const fetchAiInsight = async () => {
      setLoadingInsight(true)

      const genresString = movieDetails.genres?.map(g => g.name).join(', ') || 'Unknown'
      const rating = movieDetails.vote_average || 0

      const insight = await getMovieInsight(
        movieDetails.title,
        genresString,
        movieDetails.overview || 'No overview available',
        rating
      )

      setaiInsight(insight)
      setLoadingInsight(false)
    }

    fetchAiInsight()
  }, [isOpen, movieDetails, isLoading])

  // Early return AFTER all hooks
  if (!isOpen) return null

  // Debug logging
  console.log('Modal Debug:', { isOpen, isLoading, error, hasMovieDetails: !!movieDetails })

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const backdropUrl = movieDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
    : null

  const posterUrl = movieDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFandangoLink = (title) => {
    const searchQuery = encodeURIComponent(title)
    return `https://www.fandango.com/search?q=${searchQuery}`
  }

  const getMovieInsight = async (title, genres, overview, rating) => {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
    if (!API_KEY) {
      console.error("OpenRouter API key is not set")
      return "Recommendation unavailable"
    }
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are a knowledgeable movie critic and entertainment advisor who helps viewers make informed decisions about what to watch. Provide balanced, honest recommendations that appeal to different audiences. Be conversational and direct. Must reference at least one genre. Keep it to 2-3 sentences max. No spoilers, no emojis, no phrases like 'I recommend' - speak directly to the viewer."
             },
            {
              role: "user",
              content: `Generate a personalized 2-3 sentence watch recommendation for "${title}". Genres: ${genres}. Rating: ${rating}/10. Plot: ${overview}`
            }
          ]
        })
      })

      if (!response.ok) throw new Error(`OpenRouter error: ${response.status}`)

      const data = await response.json()
      return data.choices[0].message.content

    } catch (error) {
      console.error("AI insight failed:", error)
      return "Recommendation unavailable"
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        {isLoading && (
          <div className="modal-loading">
            <p>Loading movie details...</p>
          </div>
        )}

        {error && (
          <div className="modal-error">
            <p>Failed to load movie details</p>
            <p className="error-message">{error}</p>
            <button onClick={onClose} className="error-close-button">Close</button>
          </div>
        )}

        {!isLoading && !error && movieDetails && (
          <>
            {backdropUrl && (
              <div className="modal-backdrop-image">
                <img src={backdropUrl} alt={`${movieDetails.title} backdrop scene`} />
                <div className="backdrop-overlay"></div>
              </div>
            )}

            <div className="modal-body">
              <div className="modal-poster">
                <img src={posterUrl} alt={`${movieDetails.title} movie poster`} />
                <a
                  href={getFandangoLink(movieDetails.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-button"
                >
                  Get Tickets
                </a>
              </div>

              <div className="modal-info">
                <h2 className="modal-title" id="modal-title">{movieDetails.title}</h2>

                <div className="modal-meta">
                  <span className="modal-rating">
                    ⭐ {movieDetails.vote_average?.toFixed(1)}
                  </span>
                  <span className="modal-runtime">{formatRuntime(movieDetails.runtime)}</span>
                  <span className="modal-release-date">{formatDate(movieDetails.release_date)}</span>
                </div>

                {movieDetails.genres && movieDetails.genres.length > 0 && (
                  <div className="modal-genres">
                    {movieDetails.genres.map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="modal-overview">
                  <h3>Overview</h3>
                  <p>{movieDetails.overview || 'No overview available.'}</p>
                </div>

                <div className="modal-ai-insight">
                  <h3>✨ Watch Recommendation</h3>

                  {loadingInsight && (
                    <p className="insight-loading">Getting recommendation...</p>
                  )}

                  {!loadingInsight && aiInsight && (
                    <p className="insight-text">{aiInsight}</p>
                  )}

                  {!loadingInsight && !aiInsight && (
                    <p className="insight-error">Recommendation unavailable</p>
                  )}
                </div>

                {trailerKey && (
                  <div className="modal-trailer">
                    <h3>Trailer</h3>
                    <div className="trailer-container">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title={`${movieDetails.title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="trailer-iframe"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieModal
