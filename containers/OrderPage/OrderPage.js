import { useState } from 'react'
import SearchField from '../../components/SearchField/SearchField'
import RestaurauntItem from '../../components/RestaurauntItem/RestaurauntItem'
import styles from './OrderPage.module.scss'

const OrderPage = ({ restaurants }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([])

    const check = (obj, str) => {
        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                return check(obj[i], str);    
            } else if (typeof obj[i] =='string' && obj[i].toLowerCase().includes(str)) {
                return true
            }
        }
    }
    const getSearchResult = (list=[], query='') => {
        let filteredRestaurants = [];
        list.forEach(item => {
            if(check(item, query) === true) {
                filteredRestaurants.push(item)
            }
        })
        return filteredRestaurants;
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
                {restaurantsToDisplay.map(restaurant =>
                    <RestaurauntItem restaurant={restaurant} key={restaurant.Id} />
                )}
            </div>
        </div>
    )
}

export default OrderPage