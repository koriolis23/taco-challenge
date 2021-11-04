import styles from './MenuItem.module.scss'

const MenuItem = ({ item, setFields = f => f, fields = [] }) => {
    const handleChange = (e, item) => {
        if (e.target.checked) {
            const items = [...fields, item]
            setFields(items)
        } else {
            const filteredArray = fields.filter(el => el.Id !== item.Id)
            setFields(filteredArray)
        }
    }
    return (
        <div className={styles.menuItem}>
            <input
                type='checkbox'
                id={item.Id}
                onChange={e => handleChange(e, item)}
            />
            <label htmlFor={item.Id}>{`${item.Name} - R${item.Price}`}</label>
        </div>
    )
}

export default MenuItem