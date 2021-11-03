import { useState } from 'react'
import SearchField from '../../components/SearchField/SearchField'
import RestaurauntItem from '../../components/RestaurauntItem/RestaurauntItem'
import styles from './OrderPage.module.scss'

const OrderPage = ({ restaurants }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([])

    const getSearchResult = (list, query) => {
        return list
    }

    const handleSearchRestaurants = () => {
        setRestaurantsToDisplay(getSearchResult(restaurants, searchTerm))
    }

    return (
        <div className="order-page">
            <SearchField
                value={searchTerm}
                handleChange={setSearchTerm}
                onSubmit={handleSearchRestaurants}
            />
            <div className={styles.restaurantsList}>
                {restaurants.map(restaurant =>
                    <RestaurauntItem restaurant={restaurant} key={restaurant.Id} />
                )}
            </div>
        </div>
    )
}

export default OrderPage