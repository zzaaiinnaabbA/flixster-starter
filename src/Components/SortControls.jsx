import { useState, useRef, useEffect } from 'react'
import './SortControls.css'

const SortControls = ({ sortOption, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const sortOptions = {
    rating: 'Rating',
    title: 'Title',
    release_date: 'Release Date'
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option) => {
    onSortChange(option)
    setIsOpen(false)
  }

  return (
    <div className="sort-controls" ref={dropdownRef}>
      <button
        className="sort-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Sort movies"
      >
        Sort by
        <svg
          className={`sort-arrow ${isOpen ? 'open' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="sort-dropdown" role="menu">
          {Object.entries(sortOptions).map(([key, label]) => (
            <button
              key={key}
              className={`sort-option ${sortOption === key ? 'active' : ''}`}
              onClick={() => handleSelect(key)}
              role="menuitem"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortControls
