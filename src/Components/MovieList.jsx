import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = ({ movies, onMovieClick, favorites, watched, onToggleFavorite, onToggleWatched }) => {
    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={onMovieClick}
                    isFavorite={favorites?.includes(movie.id)}
                    isWatched={watched?.includes(movie.id)}
                    onToggleFavorite={onToggleFavorite}
                    onToggleWatched={onToggleWatched}
                />
            ))}
        </div>
    )
}

export default MovieList
