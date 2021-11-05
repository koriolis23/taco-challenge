import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import OrderPage from '../containers/OrderPage/OrderPage'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('/api/restaurants')
      const data = await response.json()
      setRestaurants(data)
    }
    fetchRestaurants()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>taco challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <OrderPage restaurants={restaurants} />
      </main>
      <div id="modal-root"></div>
    </div>
  )
}
