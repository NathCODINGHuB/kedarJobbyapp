import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <div className="NotFoundContentContainer">
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1>Page Not Found</h1>
      <p className="notFoundDesc">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
