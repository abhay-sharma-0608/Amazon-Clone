import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const discount = Math.round((1 - product.price / product.mrp) * 100)

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      <div className={styles.img}>{product.emoji}</div>
      <div className={styles.brand}>{product.brand}</div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.stars}>
        {'★'.repeat(Math.floor(product.stars))}{'☆'.repeat(5 - Math.floor(product.stars))}
        <span className={styles.reviews}>{product.reviews.toLocaleString()}</span>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.price}>₹{product.price.toLocaleString()}</span>
        <span className={styles.mrp}>₹{product.mrp.toLocaleString()}</span>
        <span className={styles.discount}>{discount}% off</span>
      </div>
      {product.prime && <div className={styles.prime}>✓ Prime | FREE delivery</div>}
      <button
        className={styles.addBtn}
        onClick={e => { e.stopPropagation(); addToCart(product) }}
      >
        Add to Cart
      </button>
    </div>
  )
}
