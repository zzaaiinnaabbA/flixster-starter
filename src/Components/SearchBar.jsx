import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, currentQuery }) => {
  const [query, setQuery] = useState(currentQuery)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    // If user clears the search, go back to Now Playing
    if (newQuery === '') {
      onSearch('')
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
          className="search-input"
          aria-label="Search for movies"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchBar
