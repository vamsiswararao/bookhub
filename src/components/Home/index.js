import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from '../Footer'
import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.topRatedBooks()
  }

  topRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const api = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    console.log(response)
    if (response.ok === true) {
      const topRatedData = await response.json()
      const updatedData = topRatedData.books.map(top => ({
        authorName: top.author_name,
        coverPic: top.cover_pic,
        id: top.id,
        title: top.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  topRatedBooksPass = () => {
    const {topRatedBooks} = this.state
    const settingsBg = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    const settingsSm = {
      dots: false,
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    }
    return (
      <>
        <div className="bg-slider-container">
          <Slider {...settingsBg} className="top-rated-books-list">
            {topRatedBooks.map(ratedBooks => (
              <TopRatedBooks ratedBooks={ratedBooks} key={ratedBooks.id} />
            ))}
          </Slider>
        </div>
        <div className="sm-slider-container">
          <Slider {...settingsSm} className="top-rated-books-list">
            {topRatedBooks.map(ratedBooks => (
              <TopRatedBooks ratedBooks={ratedBooks} key={ratedBooks.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  onTryAgain = () => {
    this.topRatedBooks()
  }

  topRatedBooksFailure = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dmswymrzt/image/upload/v1643715842/Bookhub/home-page-failure_xk7cxf.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopRatedBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.topRatedBooksPass()
      case apiStatusConstants.failure:
        return this.topRatedBooksFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="response-container">
            <h1>Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <div className="books-container">
              <div className="books_top_container">
                <h1>Top Rated Books</h1>
                <Link to="/shelf">
                  <button type="button" className="find-book-btn">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderTopRatedBooks()}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
