import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import styles from './CartPanel.module.css'

export default function CartPanel({ onClose }) {
  const { cart, changeQty, clearCart, itemCount, total } = useCart()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (cart.length === 0) return
    placeOrder(cart, total)
    clearCart()
    onClose()
    navigate('/orders')
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>🛒 Shopping Cart {itemCount > 0 && `(${itemCount} item${itemCount > 1 ? 's' : ''})`}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptySubtitle}>Add items to get started</p>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemImg}>{item.emoji}</div>
                <div className={styles.cartItemInfo}>
                  <div className={styles.cartItemTitle}>{item.title}</div>
                  <div className={styles.cartItemPrice}>₹{item.price.toLocaleString()}</div>
                  {item.prime && <div className={styles.prime}>✓ Prime FREE delivery</div>}
                  <div className={styles.qtyControls}>
                    <button className={styles.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className={styles.qtyNum}>{item.qty}</span>
                    <button className={styles.qtyBtn} onClick={() => changeQty(item.id, 1)}>+</button>
                    <button className={styles.removeBtn} onClick={() => changeQty(item.id, -item.qty)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.cartTotal}>
              <div className={styles.subtotal}>
                Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''}):
                <span> ₹{total.toLocaleString()}</span>
              </div>
              <div className={styles.secureNote}>🔒 Secure checkout — all taxes included</div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
