import './index.css'

const SelectedBooks = props => {
  const {bookshelvesLists, bookshelfName, changeSelect} = props
  const {value, label, id} = bookshelvesLists
  const onClickSelect = event => {
    changeSelect(event.target.value)
  }

  const isActive = value === bookshelfName
  const selectClassName = isActive
    ? `select-name active-select-name`
    : `select-name`
  return (
    <>
      <li className="selected-list">
        <button
          type="button"
          key={id}
          value={value}
          onClick={onClickSelect}
          className={selectClassName}
        >
          {label}
        </button>
      </li>
    </>
  )
}

export default SelectedBooks
