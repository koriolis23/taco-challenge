import { useState } from 'react'
import SearchField from '../../components/SearchField/SearchField'
import RestaurauntItem from '../../components/RestaurauntItem/RestaurauntItem'
import styles from './OrderPage.module.scss'
import Modal from '../../components/Modal/Modal'

const OrderPage = ({ restaurants }) => {
    const [values, setValues] = useState({ searchTerm: '', location: '' })
    const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([])
    const [fields, setFields] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

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

    const getSearchResult = (list = [], query) => {
        let filteredRestaurants = [];
        list.forEach(item => {
            if (item.City.includes(query.location) || item.Suburb.includes(query.location)) {
                if (check(item, query.searchTerm) === true) {
                    filteredRestaurants.push(item)
                }
            }
        })
        return filteredRestaurants;
    }

    const handleSearchRestaurants = () => {
        setRestaurantsToDisplay(getSearchResult(restaurants, values))
    }

    const handleSubmitOrder = async () => {
        const response = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify({ orders: fields }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 201) {
            setShowModal(true)
        }
    }

    const totalPrice = fields.reduce((a, b) => a + (b['Price'] || 0), 0)
    const btnOrderLabel = totalPrice > 0 ? 'Order' + ` - R${totalPrice}` : 'Order'
    return (
        <div className={styles.orderPage}>
            <SearchField
                values={values}
                handleChange={handleChange}
                onSubmit={handleSearchRestaurants}
            />
            <div className={styles.restaurantsList}>
                {restaurantsToDisplay.map(restaurant =>
                    <RestaurauntItem
                        restaurant={restaurant}
                        key={restaurant.Id}
                        fields={fields}
                        setFields={setFields}
                        searchedQuery={values.searchTerm}
                    />
                )}
            </div>
            <button className={styles.btnOrder} disabled={!fields.length} onClick={handleSubmitOrder}>
                {btnOrderLabel}
            </button>
            <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
            />
        </div>
    )
}

export default OrderPage