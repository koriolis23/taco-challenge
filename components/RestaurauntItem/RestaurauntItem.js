import styles from './RestaurauntItem.module.scss'
import Image from 'next/image'
import MenuItem from '../MenuItem/MenuItem'
import { useState } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const RestaurauntItem = ({ restaurant = {}, fields, setFields }) => {
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
                            return (
                                <div className={styles.menuItemsList} key={index}>
                                    <span className={styles.categoryName}>{category.Name}</span>
                                    {category.MenuItems.map(item => {
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