import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './Search.module.css'

const FILTERS = ['All', 'Electronics', 'Fashion', 'Books', 'Home', 'Toys']

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [activeFilter, setActiveFilter] = useState('All')

  const matched = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  const filtered = activeFilter === 'All'
    ? matched
    : matched.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div className={styles.page}>
      <div className={styles.resultsBar}>
        {matched.length} results for "<strong>{query}</strong>"
      </div>

      <div className={styles.filterBar}>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.chip} ${activeFilter === f ? styles.active : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <p className={styles.emptyTitle}>No results found</p>
          <p className={styles.emptySubtitle}>Try a different search term or category</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
