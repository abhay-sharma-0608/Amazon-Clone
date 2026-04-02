import { useParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './Category.module.css'

export default function Category() {
  const { name } = useParams()
  const filtered = products.filter(p =>
    p.category.toLowerCase().includes(name.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <div className={styles.resultsBar}>
        Showing <strong>{filtered.length}</strong> results in <strong>{name}</strong>
      </div>
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>No products found in "{name}"</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
