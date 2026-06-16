import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Sidebar from './Components/SideBar/Sidebar'
import Banner from './Components/Banner/Banner'
import TrailerCarousel from './Components/TrailerCarousel/TrailerCarousel'
import SortBar from './Components/SortBar/SortBar'
import Footer from './Components/Footer/Footer'
import MovieList from './Components/MovieList/MovieList'
import MovieModal from './Components/MovieModal/MovieModal'

const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('rating')
  const [filterOption, setFilterOption] = useState('all') // 'all', 'favorites', 'watched'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('flixster-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem('flixster-watched')
    return saved ? JSON.parse(saved) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState(null)

  // Fetch Now Playing movies on mount
  useEffect(() => {
    fetchNowPlaying()
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('flixster-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Save watched to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('flixster-watched', JSON.stringify(watched))
  }, [watched])

  // Fetch movie details and trailer when a movie is selected
  useEffect(() => {
    if (!selectedMovieId) {
      setMovieDetails(null)
      setTrailerKey(null)
      setDetailsError(null)
      return
    }

    const fetchMovieDetails = async () => {
      setIsLoadingDetails(true)
      setDetailsError(null)

      try {
        // Fetch movie details
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${API_KEY}`
        )

        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch movie details')
        }

        const detailsData = await detailsResponse.json()
        setMovieDetails(detailsData)

        // Fetch movie videos (trailers)
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?api_key=${API_KEY}`
        )

        if (videosResponse.ok) {
          const videosData = await videosResponse.json()
          // Find the first YouTube trailer
          const trailer = videosData.results?.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          )
          setTrailerKey(trailer?.key || null)
        }
      } catch (err) {
        setDetailsError(err.message)
      } finally {
        setIsLoadingDetails(false)
      }
    }

    fetchMovieDetails()
  }, [selectedMovieId])

  const fetchNowPlaying = async (page = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()

      if (page === 1) {
        setMovies(data.results)
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.results])
      }

      setCurrentPage(data.page)
      setTotalPages(data.total_pages)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId)
  }

  const handleCloseModal = () => {
    setSelectedMovieId(null)
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      if (searchQuery) {
        searchMovies(searchQuery, currentPage + 1)
      } else {
        fetchNowPlaying(currentPage + 1)
      }
    }
  }

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      setSearchQuery('')
      setCurrentPage(1)
      fetchNowPlaying(1)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      )

      if (!response.ok) {
        throw new Error('Failed to search movies')
      }

      const data = await response.json()

      if (page === 1) {
        setMovies(data.results)
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.results])
      }

      setCurrentPage(data.page)
      setTotalPages(data.total_pages)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
    searchMovies(query, 1)
  }

  const toggleFavorite = (movieId) => {
    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    )
  }

  const toggleWatched = (movieId) => {
    setWatched(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    )
  }

  const handleHomeClick = () => {
    setSearchQuery('')
    setFilterOption('all')
    setCurrentPage(1)
    setIsSidebarOpen(false)
    fetchNowPlaying(1)
  }

  const getFilteredAndSortedMovies = () => {
    let filteredMovies = [...movies]

    // Apply filter
    switch (filterOption) {
      case 'favorites':
        filteredMovies = filteredMovies.filter(movie => favorites.includes(movie.id))
        break
      case 'watched':
        filteredMovies = filteredMovies.filter(movie => watched.includes(movie.id))
        break
      case 'all':
      default:
        break
    }

    // Apply sort
    switch (sortOption) {
      case 'title':
        return filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
      case 'release_date':
        return filteredMovies.sort((a, b) => {
          const dateA = new Date(a.release_date)
          const dateB = new Date(b.release_date)
          return dateB - dateA
        })
      case 'rating':
      default:
        return filteredMovies.sort((a, b) => b.vote_average - a.vote_average)
    }
  }

  return (
    <div className="App">
      <Header
        onSearch={handleSearch}
        currentQuery={searchQuery}
        onHomeClick={handleHomeClick}
      />

      <Sidebar
        filterOption={filterOption}
        onFilterChange={setFilterOption}
        favoritesCount={favorites.length}
        watchedCount={watched.length}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {!searchQuery && filterOption === 'all' && <Banner apiKey={API_KEY} />}

        {!searchQuery && filterOption === 'all' && <TrailerCarousel apiKey={API_KEY} />}

        <SortBar sortOption={sortOption} onSortChange={setSortOption} />

        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="clear-search-button"
            aria-label="Clear search and return to now playing movies"
          >
            ← Back to Now Playing
          </button>
        )}

        {error && (
          <div className="error" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <MovieList
          movies={getFilteredAndSortedMovies()}
          onMovieClick={handleMovieClick}
          favorites={favorites}
          watched={watched}
          onToggleFavorite={toggleFavorite}
          onToggleWatched={toggleWatched}
        />

        {isLoading && (
          <p aria-live="polite" aria-busy="true">Loading...</p>
        )}

        {!isLoading && currentPage < totalPages && (
          <button
            onClick={handleLoadMore}
            className="load-more-button"
            aria-label={`Load more movies, page ${currentPage + 1} of ${totalPages}`}
          >
            Load More
          </button>
        )}
      </main>

      <MovieModal
        isOpen={selectedMovieId !== null}
        movieDetails={movieDetails}
        trailerKey={trailerKey}
        isLoading={isLoadingDetails}
        error={detailsError}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  )
}

export default App
