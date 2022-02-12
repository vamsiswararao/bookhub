import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const Books = props => {
  const {booksDetails} = props
  const {coverPic, title, authorName, readStatus, rating, id} = booksDetails
  return (
    <>
      <li className="books-list-container">
        <Link to={`books/${id}`} className="link-container">
          <img src={coverPic} alt={title} className="book-img" />
          <div className="books-details-container">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <p className="book-author">
              Avg Rating: <BsFillStarFill className="star" /> {rating}
            </p>
            <div className="status-container">
              <p className="book-author">status: </p>
              <p className="status-text">{readStatus}</p>
            </div>
          </div>
        </Link>
      </li>
    </>
  )
}
export default Books
