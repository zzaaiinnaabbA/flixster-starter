import './Header.css'
import SearchBar from './SearchBar'
import SortControls from './SortControls'

const Header = ({ onSearch, currentQuery, sortOption, onSortChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Flixster</h1>
        <div className="header-controls">
          <SortControls sortOption={sortOption} onSortChange={onSortChange} />
          <SearchBar onSearch={onSearch} currentQuery={currentQuery} />
        </div>
      </div>
    </header>
  )
}

export default Header
