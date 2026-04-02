import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar({ onCartOpen }) {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
    }
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

        <div className={styles.navLinks}>
          {/* 🔍 Search */}
          <div className={styles.navLink} onClick={() => setSearchOpen(!searchOpen)}>
            <span className={styles.big}>🔍</span>
          </div>

          {/* 📦 Orders */}
          <div className={styles.navLink} onClick={() => navigate('/orders')}>
            <span className={styles.small}>Returns</span>
            <span className={styles.big}>&amp; Orders</span>
          </div>

          {/* 🛒 Cart */}
          <div className={styles.navLink} onClick={onCartOpen}>
            <span className={styles.cartIcon}>
              🛒
              <span className={styles.cartCount}>{itemCount}</span>
            </span>
            <span className={styles.big}>Cart</span>
          </div>

          {/* 👤 Sign in */}
          <div className={styles.navLink}>
            <span className={styles.small}>Hello, Sign in</span>
            <span className={styles.big}>Account ▾</span>
          </div>
        </div>
      </div>

      {/* 🔍 Search Overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay}>
          <form onSubmit={handleSearch} className={styles.searchOverlayForm}>
            <input
              autoFocus
              type="text"
              placeholder="Search Amazon.in"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchOverlayInput}
            />
            <button type="submit" className={styles.searchOverlayBtn}>
              Search
            </button>
          </form>
        </div>
      )}

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