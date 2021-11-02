import SearchIcon from '@material-ui/icons/Search'
import styles from './SearchField.module.scss'

const SearchField = ({ value, handleChange, onSubmit = f => f }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }
    return (
        <form onSubmit={handleSubmit} className={styles.searchField}>
            <input
                type='text'
                className={styles.searchInput}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />
            <button type='submit' className={styles.btnSearch}>
                <SearchIcon className={styles.searchIcon} />
            </button>
        </form>
    )
}

export default SearchField