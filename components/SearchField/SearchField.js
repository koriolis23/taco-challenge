import SearchIcon from '@material-ui/icons/Search'
import styles from './SearchField.module.scss'

const SearchField = ({ handleChange, onSubmit = f => f }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }
    return (
        <form onSubmit={handleSubmit} className={styles.searchField}>
            <div className={styles.searchInputGroup}>
                <input
                    type='text'
                    name='searchTerm'
                    className={styles.searchInput}
                    placeholder='What is you looking for'
                    onChange={handleChange}
                />
                in
                <input
                    type='text'
                    name='location'
                    className={styles.searchInput}
                    placeholder='Location'
                    onChange={handleChange}
                />
            </div>
            <button type='submit' className={styles.btnSearch}>
                <SearchIcon className={styles.searchIcon} />
            </button>
        </form>
    )
}

export default SearchField