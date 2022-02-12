import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.bookDetails()
  }

  booksDetails = apiBookData => ({
    aboutAuthor: apiBookData.book_details.about_author,
    aboutBook: apiBookData.book_details.about_book,
    authorName: apiBookData.book_details.author_name,
    coverPic: apiBookData.book_details.cover_pic,
    id: apiBookData.book_details.id,
    rating: apiBookData.book_details.rating,
    readStatus: apiBookData.book_details.read_status,
    title: apiBookData.book_details.title,
  })

  bookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const apiBookData = await response.json()
      const updatedBookDetails = this.booksDetails(apiBookData)
      this.setState({
        bookDetails: updatedBookDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  bookDetailsPass = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails
    return (
      <>
        <div className="book-details-response-container">
          <div className="book-details-card-container">
            <div className="book-details-card-head-container">
              <img src={coverPic} alt={title} className="cover-pic-image" />
              <div className="book-top-container">
                <h1 className="book-title">{title}</h1>
                <p className="book-author">{authorName}</p>
                <p className="book-author">
                  Avg Rating:
                  <BsFillStarFill className="star" />
                  {rating}
                </p>
                <div className="status-container">
                  <p className="book-author">status: </p>
                  <p className="status-text">{readStatus}</p>
                </div>
              </div>
            </div>
            <hr />
            <h1 className="book-author-text">About Author</h1>
            <p className="book-author-texts">{aboutAuthor}</p>
            <h1 className="book-author-text">About Book</h1>
            <p className="book-author-texts">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  onTryAgain = () => {
    this.bookDetails()
  }

  renderFailureView = () => (
    <div className="no-found-container">
      <img
        src=" https://res.cloudinary.com/dmswymrzt/image/upload/v1643715842/Bookhub/home-page-failure_xk7cxf.png"
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

  renderBooksDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.bookDetailsPass()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
        <div className="book-details-container">
          {this.renderBooksDetails()}
        </div>
      </>
    )
  }
}

export default BookDetails
