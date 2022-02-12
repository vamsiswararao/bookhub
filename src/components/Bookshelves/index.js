import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Books from '../Books'
import SelectedBooks from '../SelectedBook'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    booksLists: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const apiData = await response.json()
      const updatedBooksList = apiData.books.map(eachItems => ({
        authorName: eachItems.author_name,
        coverPic: eachItems.cover_pic,
        id: eachItems.id,
        rating: eachItems.rating,
        readStatus: eachItems.read_status,
        title: eachItems.title,
      }))
      this.setState({
        booksLists: updatedBooksList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  changeSelect = bookshelfName => {
    this.setState({bookshelfName}, this.getBooks)
  }

  selectedBooks = () => {
    const {bookshelfName} = this.state
    return (
      <div className="book-select-container">
        <h1 className="book-shelves-head">Bookshelves</h1>
        <ul className="book-select-ul-container">
          {bookshelvesList.map(eachItem => (
            <SelectedBooks
              key={eachItem.id}
              bookshelvesLists={eachItem}
              changeSelect={this.changeSelect}
              bookshelfName={bookshelfName}
            />
          ))}
        </ul>
      </div>
    )
  }

  BooksView = () => {
    const {booksLists, searchText} = this.state
    return (
      <>
        {booksLists.length === 0 ? (
          <div className="no-found-container">
            <img
              src="https://res.cloudinary.com/dmswymrzt/image/upload/v1643875998/Bookhub/not-find_kjexhy.png"
              alt="no books"
            />
            <p>Your search for {searchText} did not find any matches.</p>
          </div>
        ) : (
          this.booksPassView()
        )}
      </>
    )
  }

  onTryAgain = () => {
    this.getBooks()
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

  booksPassView = () => {
    const {booksLists} = this.state
    return (
      <>
        <ul className="books-pass-view-container">
          {booksLists.map(eachItem => (
            <Books booksDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getBooks()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBooks()
    }
  }

  renderBooksDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.BooksView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchText, bookshelfName} = this.state
    console.log(searchText)

    const labelName = bookshelvesList.filter(
      everySuggestion => everySuggestion.value === bookshelfName,
    )[0].label

    return (
      <>
        <Header />
        <div className="books-shelves-container">
          <div className="books-shelves-responsive">
            <div className="search-sm-container">
              <input
                className="search-input"
                type="search"
                value={searchText}
                placeholder="Search"
                onKeyDown={this.onEnterSearchInput}
                onChange={this.onChangeSearch}
              />
              <button
                testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="books-shelves-left-container">
              {this.selectedBooks()}
            </div>
            <div className="book-shelves-right">
              <div className="book-shelves-container">
                <h1 className="home-label">{labelName} Books</h1>
                <div className="search-bg-container">
                  <input
                    className="search-input"
                    type="search"
                    value={searchText}
                    placeholder="Search"
                    onKeyDown={this.onEnterSearchInput}
                    onChange={this.onChangeSearch}
                  />
                  <button
                    testid="searchButton"
                    type="button"
                    className="search-button"
                    onClick={this.onSubmitSearchInput}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              {this.renderBooksDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
