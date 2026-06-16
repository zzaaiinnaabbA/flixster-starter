import './MovieCard.css'

const MovieCard = ({ movie, onClick, isFavorite, isWatched, onToggleFavorite, onToggleWatched }) => {
  const { id, title, poster_path, vote_average } = movie

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite(id)
  }

  const handleWatchedClick = (e) => {
    e.stopPropagation()
    onToggleWatched(id)
  }
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <div
      className={`movie-card ${isFavorite ? 'favorited' : ''} ${isWatched ? 'watched' : ''}`}
      onClick={() => onClick(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(id)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}, rated ${vote_average.toFixed(1)} out of 10`}
    >
      <img
        src={posterUrl}
        alt={`${title} movie poster`}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-rating" aria-label={`Rating: ${vote_average.toFixed(1)} out of 10`}>
          <span className="rating-star" aria-hidden="true">⭐</span>
          <span className="rating-value">{vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="movie-actions">
        <button
          className={`action-button favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <button
          className={`action-button watched-button ${isWatched ? 'active' : ''}`}
          onClick={handleWatchedClick}
          aria-label={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
          title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWatched ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MovieCard
