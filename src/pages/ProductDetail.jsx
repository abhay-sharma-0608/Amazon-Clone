import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import products from '../data/products'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { placeOrder } = useOrders()
  const product = products.find(p => p.id === Number(id))

  if (!product) return (
    <div className={styles.notFound}>
      <p>Product not found.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )

  const discount = Math.round((1 - product.price / product.mrp) * 100)

  const handleBuyNow = () => {
    placeOrder([{ ...product, qty: 1 }], product.price)
    navigate('/orders')
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back to results</button>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={styles.imgBox}>{product.emoji}</div>
          <div className={styles.thumbRow}>
            {[0, 1, 2].map(i => (
              <div key={i} className={styles.thumb}>{product.emoji}</div>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.brand}>{product.brand}</div>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {'★'.repeat(Math.floor(product.stars))}{'☆'.repeat(5 - Math.floor(product.stars))}
            </span>
            <span className={styles.reviews}>{product.reviews.toLocaleString()} ratings</span>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.mrp}>M.R.P.: <s>₹{product.mrp.toLocaleString()}</s></div>
            <div className={styles.price}>₹{product.price.toLocaleString()}</div>
            <span className={styles.discBadge}>{discount}% off</span>
          </div>

          {product.prime && (
            <div className={styles.primeBox}>
              <div className={styles.primeTitle}>✓ Prime FREE Delivery</div>
              <div className={styles.primeSubtitle}>Get it by Tomorrow</div>
            </div>
          )}

          <p className={styles.desc}>{product.desc}</p>

          <div className={styles.secureNote}>
            🔒 Secure transaction • 10 Days Returns Policy
          </div>

          <button className={styles.addBtn} onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>
          <button className={styles.buyBtn} onClick={handleBuyNow}>
            ⚡ Buy Now
          </button>

          <div className={styles.sellerInfo}>
            <div>✓ Sold by: <span className={styles.sellerLink}>{product.brand} Official Store</span></div>
            <div>✓ 10 Days Returnable</div>
          </div>
        </div>
      </div>
    </div>
  )
}
