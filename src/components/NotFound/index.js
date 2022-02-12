import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src=" https://res.cloudinary.com/dmswymrzt/image/upload/v1643876467/Bookhub/page-not-found_up3olh.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-home" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
