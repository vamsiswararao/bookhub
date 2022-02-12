import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBooks = props => {
  const {ratedBooks} = props
  const {title, coverPic, authorName, id} = ratedBooks
  return (
    <li className="book-list">
      <Link to={`books/${id}`} className="book-list-link-container">
        <img src={coverPic} alt={title} className="cover-pic" />
        <h1 className="home-title-text">{title}</h1>
        <p className="home-author-name">{authorName}</p>
      </Link>
    </li>
  )
}
export default TopRatedBooks
