import './SortBar.css'

const SortBar = ({ sortOption, onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value)
  }

  return (
    <div className="sort-bar">
      <label htmlFor="sort-select" className="sort-bar-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleChange}
        className="sort-bar-select"
        aria-label="Sort movies by"
      >
        <option value="rating">Rating (Highest to Lowest)</option>
        <option value="title">Title (A-Z)</option>
        <option value="release_date">Release Date (Newest to Oldest)</option>
      </select>
    </div>
  )
}

export default SortBar
