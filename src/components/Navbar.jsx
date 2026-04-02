import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar({ onCartOpen }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navTop}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          amazon<span>.in</span>
        </div>

        <div className={styles.navLocation}>
          <span className={styles.locLabel}>Deliver to</span>
          <span className={styles.locVal}>📍 Ludhiana</span>
        </div>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <select className={styles.searchCategory}>
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Home</option>
          </select>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Amazon.in"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>🔍</button>
        </form>

        <div className={styles.navLinks}>
          <div className={styles.navLink}>
            <span className={styles.small}>Hello, Sign in</span>
            <span className={styles.big}>Account ▾</span>
          </div>
          <div className={styles.navLink} onClick={() => navigate('/orders')}>
            <span className={styles.small}>Returns</span>
            <span className={styles.big}>&amp; Orders</span>
          </div>
          <div className={styles.navLink} onClick={onCartOpen}>
            <span className={styles.cartIcon}>
              🛒
              <span className={styles.cartCount}>{itemCount}</span>
            </span>
            <span className={styles.big}>Cart</span>
          </div>
        </div>
      </div>

      <div className={styles.navBar2}>
        {['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Toys'].map(cat => (
          <span
            key={cat}
            className={styles.nav2Link}
            onClick={() => navigate(cat === 'All' ? '/' : `/category/${cat}`)}
          >
            {cat === 'All' ? '☰ All' : cat}
          </span>
        ))}
        <span className={styles.nav2LinkOrange}>🔥 Today's Deals</span>
        <span className={styles.nav2Link}>Customer Service</span>
      </div>
    </nav>
  )
}
