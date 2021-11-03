import styles from './MenuItem.module.scss'

const MenuItem = ({ item }) => {
    return (
        <div className={styles.menuItem}>
            <input
                type='checkbox'
                id={item.Id}
            />
            <label htmlFor={item.Id}>{item.Name}</label>
        </div>
    )
}

export default MenuItem