import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    isClick: false,
  }

  logClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  menuOptions = () => (
    <ul className="header-list-container">
      <li>
        <Link to="/" className="home-link-container">
          Home
        </Link>
      </li>
      <li>
        <Link to="/shelf" className="home-link-container">
          Bookshelves
        </Link>
      </li>
      <button
        type="button"
        className="logout-btn"
        onClick={this.logClickLogout}
      >
        Logout
      </button>
      <button type="button" className="close-btn" onClick={this.onClickNavbar}>
        <AiFillCloseCircle className="close-logo" />
      </button>
    </ul>
  )

  onClickNavbar = () => {
    this.setState(prevState => ({
      isClick: !prevState.isClick,
    }))
  }

  render() {
    const {isClick} = this.state
    return (
      <nav className="header-container">
        <div className="header">
          <div className="header-sm-container">
            <Link to="/" className="home-link-container">
              <img
                src="https://res.cloudinary.com/dmswymrzt/image/upload/v1643632925/Bookhub/bookhub-logo_y7ptgd.png"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <button type="button" onClick={this.onClickNavbar}>
              <FaBars className="nav-bars" />
            </button>
          </div>
          <div className="scroll-options-container">
            {isClick && this.menuOptions()}
          </div>
        </div>
        <div className="header-lg-container">
          <Link to="/" className="home-link-container">
            <img
              src="https://res.cloudinary.com/dmswymrzt/image/upload/v1643632925/Bookhub/bookhub-logo_y7ptgd.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <ul className="header-list-container">
            <li>
              <Link to="/" className="home-link-container">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shelf" className="home-link-container">
                Bookshelves
              </Link>
            </li>
            <button
              type="button"
              className="logout-btn"
              onClick={this.logClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
