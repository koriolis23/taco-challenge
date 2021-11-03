import { useState } from 'react'
import SearchField from '../../components/SearchField/SearchField'

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
            Order Page
        </div>
    )
}

export default OrderPage