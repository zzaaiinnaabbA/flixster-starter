import './Header.css'
import SearchBar from './SearchBar'

const Header = ({ onSearch, currentQuery, onHomeClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title" onClick={onHomeClick}>Flixster</h1>
        <div className="header-controls">
          <SearchBar onSearch={onSearch} currentQuery={currentQuery} />
        </div>
      </div>
    </header>
  )
}

export default Header
