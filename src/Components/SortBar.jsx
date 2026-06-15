import './SortBar.css'

const SortBar = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-bar">
      <span className="sort-bar-label">Sort by:</span>
      <div className="sort-bar-buttons">
        <button
          className={`sort-bar-button ${sortOption === 'rating' ? 'active' : ''}`}
          onClick={() => onSortChange('rating')}
        >
          Rating
        </button>
        <button
          className={`sort-bar-button ${sortOption === 'title' ? 'active' : ''}`}
          onClick={() => onSortChange('title')}
        >
          Title
        </button>
        <button
          className={`sort-bar-button ${sortOption === 'release_date' ? 'active' : ''}`}
          onClick={() => onSortChange('release_date')}
        >
          Release Date
        </button>
      </div>
    </div>
  )
}

export default SortBar
