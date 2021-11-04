import { useState } from 'react'
import SearchField from '../../components/SearchField/SearchField'
import RestaurauntItem from '../../components/RestaurauntItem/RestaurauntItem'
import styles from './OrderPage.module.scss'

const OrderPage = ({ restaurants }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([])
    const [fields, setFields] = useState([])

    const check = (obj, str) => {
        const stack = []
        stack.push(obj)
        while (stack.length > 0) {
            const currentObj = stack.shift()
            const searchedQuery = str.toLowerCase()

            if (typeof currentObj == 'string' && currentObj.toLowerCase().includes(searchedQuery)) {
                return true;
            }

            const keys = currentObj instanceof Object ? Object.keys(currentObj) : []

            for (const key of keys) {
                const objVal = currentObj[key]
                stack.unshift(objVal)
            }
        }
        return false
    }

    const getSearchResult = (list = [], query = '') => {
        let filteredRestaurants = [];
        list.forEach(item => {
            if (check(item, query) === true) {
                filteredRestaurants.push(item)
            }
        })
        return filteredRestaurants;
    }

    const handleSearchRestaurants = () => {
        setRestaurantsToDisplay(getSearchResult(restaurants, searchTerm))
    }

    const handleSubmitOrder = async () => {
        const response = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify({ orders: fields }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const totalPrice = fields.reduce((a, b) => a + (b['Price'] || 0), 0)
    const btnOrderLabel = totalPrice > 0 ? 'Order' + ` - R${totalPrice}`: 'Order'
    return (
        <div className={styles.orderPage}>
            <SearchField
                value={searchTerm}
                handleChange={setSearchTerm}
                onSubmit={handleSearchRestaurants}
            />
            <div className={styles.restaurantsList}>
                {restaurantsToDisplay.map(restaurant =>
                    <RestaurauntItem
                        restaurant={restaurant}
                        key={restaurant.Id}
                        fields={fields}
                        setFields={setFields}
                    />
                )}
            </div>
            <button className={styles.btnOrder} disabled={!fields.length} onClick={handleSubmitOrder}>
                {btnOrderLabel}
            </button>
        </div>
    )
}

export default OrderPage