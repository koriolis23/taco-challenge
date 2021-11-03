import styles from './RestaurauntItem.module.scss'
import Image from 'next/image'
import MenuItem from '../MenuItem/MenuItem'

const RestaurauntItem = ({ restaurant = {} }) => {
    return (
        <>
            {Object.entries(restaurant).length &&
                <div className={styles.restaurantItem}>
                    {restaurant?.LogoPath &&
                        <Image
                            src={restaurant.LogoPath}
                            alt={`${restaurant?.Name}`}
                            width={100}
                            height={100}
                        />
                    }
                    <div className={styles.infoBlock}>
                        <span className={styles.restaurantInfo}>
                            {`${restaurant.Name} - ${restaurant.Suburb} - rated #${restaurant.Rank} overall`}
                        </span>
                        <div className={styles.categorieItems}>
                            {restaurant.Categories.map((category, index) => {
                                return (
                                    <div className={styles.menuItemsList} key={index}>
                                        <span className={styles.categoryName}>{category.Name}</span>
                                        {category.MenuItems.map(item => {
                                            return (
                                                <MenuItem item={item} key={item.Id}/>
                                            )
                                        })}
                                    </div>
                                )
                            })

                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RestaurauntItem