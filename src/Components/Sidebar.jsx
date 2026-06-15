import { useEffect } from 'react'
import './Sidebar.css'

const Sidebar = ({ filterOption, onFilterChange, favoritesCount, watchedCount, isOpen, onToggle }) => {
  // Prevent body scroll on mobile when sidebar is open
  useEffect(() => {
    if (window.innerWidth <= 768) {
      if (isOpen) {
        document.body.classList.add('sidebar-open')
      } else {
        document.body.classList.remove('sidebar-open')
      }
    }

    return () => {
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen])

  // Handle filter change and close sidebar on mobile
  const handleFilterClick = (filter) => {
    onFilterChange(filter)
    // Close sidebar on mobile after selecting
    if (window.innerWidth <= 768) {
      onToggle()
    }
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
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
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">Filter Movies</h2>

        <div className="sidebar-filters">
          <button
            className={`filter-button ${filterOption === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            <span className="filter-label">All Movies</span>
          </button>

          <button
            className={`filter-button ${filterOption === 'favorites' ? 'active' : ''}`}
            onClick={() => handleFilterClick('favorites')}
          >
            <span className="filter-label">Favorites</span>
            <span className="filter-count">{favoritesCount}</span>
          </button>

          <button
            className={`filter-button ${filterOption === 'watched' ? 'active' : ''}`}
            onClick={() => handleFilterClick('watched')}
          >
            <span className="filter-label">Watched</span>
            <span className="filter-count">{watchedCount}</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}

export default Sidebar
