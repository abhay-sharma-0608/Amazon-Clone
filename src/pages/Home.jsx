import { useNavigate } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const deals = products.filter(p => p.badge)
  const bestSellers = products.filter(p => p.stars >= 4.4)

  return (
    <div>
      <div className={styles.hero}>
        <h1>Millions of products, delivered fast 🚀</h1>
        <p>Free delivery with Prime • Ludhiana & everywhere</p>
        <button className={styles.heroBtn} onClick={() => navigate('/category/Electronics')}>
          Start Shopping
        </button>
      </div>

      <div className={styles.page}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <div
              key={cat.name}
              className={styles.catCard}
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              <div className={styles.catIcon}>{cat.icon}</div>
              <div className={styles.catName}>{cat.name}</div>
              <div className={styles.catLink}>Shop Now →</div>
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>⚡ Today's Deals</h2>
        <div className={styles.productsGrid}>
          {deals.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <h2 className={styles.sectionTitle}>🏆 Best Sellers</h2>
        <div className={styles.productsGrid}>
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <h2 className={styles.sectionTitle}>All Products</h2>
        <div className={styles.productsGrid}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
