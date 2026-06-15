import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © {currentYear} Flixster. All rights reserved.
        </p>
        <div className="footer-links">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Powered by TMDb
          </a>
          <span className="footer-separator">•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </div>
        <p className="footer-attribution">
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </footer>
  )
}

export default Footer
