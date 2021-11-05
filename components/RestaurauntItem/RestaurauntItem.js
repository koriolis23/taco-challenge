import styles from './RestaurauntItem.module.scss'
import Image from 'next/image'
import MenuItem from '../MenuItem/MenuItem'
import { useState } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const RestaurauntItem = ({ restaurant = {}, fields, setFields, searchedQuery = '' }) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            {Object.entries(restaurant).length &&
                <div className={styles.restaurantItem}>
                    {restaurant?.LogoPath &&
                        <div className={styles.cardHeader}>
                            <Image
                                src={restaurant.LogoPath}
                                alt={`${restaurant?.Name}`}
                                width={100}
                                height={100}
                            />
                            <span className={styles.restaurantInfo}>
                                {`${restaurant.Name} - ${restaurant.Suburb} - rated #${restaurant.Rank} overall`}
                            </span>
                        </div>
                    }
                    <div className={styles.categorieItems}>
                        <button className={styles.btnMenu} onClick={() => setIsActive(!isActive)}>
                            {'Menu'}
                            {isActive ?
                                <ArrowDownIcon className={styles.materialIcons} /> :
                                <ArrowForwardIcon className={styles.materialIcons} />
                            }
                        </button>
                        {isActive && restaurant.Categories.map((category, index) => {
                            const menuItems = category.MenuItems.filter(menuItem => {
                                const menuItemName = menuItem.Name.toLowerCase()
                                const categoryName = category.Name.toLowerCase()
                                const query = searchedQuery.toLowerCase()
                                return (
                                    menuItemName.includes(query) ||
                                    categoryName.includes(query)
                                )
                            })
                            return (
                                <div className={styles.menuItemsList} key={index}>
                                    {menuItems.length > 0 && <span className={styles.categoryName}>{category.Name}</span>}
                                    {menuItems.map(item => {
                                        return (
                                            <MenuItem
                                                item={item}
                                                key={item.Id}
                                                fields={fields}
                                                setFields={setFields}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
            }
        </>
    )
}

export default RestaurauntItem