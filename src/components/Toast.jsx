import { useCart } from '../context/CartContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return <div className={styles.toast}>{toast}</div>
}
