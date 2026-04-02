import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'
import styles from './Orders.module.css'

const STATUS_STEPS = ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered']

const RETURN_REASONS = [
  'Item arrived damaged',
  'Wrong item received',
  'Item not as described',
  'No longer needed',
  'Found a better price',
  'Defective / not working',
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  })
}

function OrderStatusTracker({ status }) {
  const stepIndex = STATUS_STEPS.indexOf(status)
  return (
    <div className={styles.tracker}>
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className={styles.trackerStep}>
          <div className={`${styles.stepDot} ${i <= stepIndex ? styles.stepDone : ''}`}>
            {i <= stepIndex ? '✓' : ''}
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`${styles.stepLine} ${i < stepIndex ? styles.stepLineDone : ''}`} />
          )}
          <span className={`${styles.stepLabel} ${i === stepIndex ? styles.stepLabelActive : ''}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

function ReturnModal({ order, onClose, onSubmit }) {
  const [reason, setReason] = useState('')
  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Request a Return</h3>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <p className={styles.modalOrderId}>Order: {order.id}</p>
        <p className={styles.modalLabel}>Select a reason for return:</p>
        <div className={styles.reasonList}>
          {RETURN_REASONS.map(r => (
            <label key={r} className={styles.reasonOption}>
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            className={styles.submitReturnBtn}
            disabled={!reason}
            onClick={() => { onSubmit(reason); onClose() }}
          >
            Submit Return Request
          </button>
        </div>
      </div>
    </div>
  )
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const { requestReturn, cancelReturn } = useOrders()
  const navigate = useNavigate()

  const isDelivered = order.status === 'Delivered'
  const canReturn = isDelivered && !order.returnRequested

  return (
    <div className={styles.orderCard}>
      {/* Order Header */}
      <div className={styles.orderHeader}>
        <div className={styles.orderMeta}>
          <div className={styles.orderMetaGroup}>
            <span className={styles.metaLabel}>ORDER PLACED</span>
            <span className={styles.metaValue}>{formatDate(order.placedAt)}</span>
            <span className={styles.metaTime}>{formatTime(order.placedAt)}</span>
          </div>
          <div className={styles.orderMetaGroup}>
            <span className={styles.metaLabel}>TOTAL</span>
            <span className={styles.metaValue}>₹{order.total.toLocaleString()}</span>
          </div>
          <div className={styles.orderMetaGroup}>
            <span className={styles.metaLabel}>ESTIMATED DELIVERY</span>
            <span className={styles.metaValue}>{formatDate(order.deliveryDate)}</span>
          </div>
        </div>
        <div className={styles.orderIdRow}>
          <span className={styles.metaLabel}>ORDER # {order.id}</span>
          <button className={styles.detailsToggle} onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Hide Details ▲' : 'View Details ▼'}
          </button>
        </div>
      </div>

      {/* Status + Items Preview */}
      <div className={styles.orderBody}>
        <div className={styles.statusRow}>
          <span className={`${styles.statusBadge} ${styles['status_' + order.status.replace(/ /g, '_')]}`}>
            {order.status === 'Confirmed' && '✅ '}
            {order.status === 'Shipped' && '📦 '}
            {order.status === 'Out for Delivery' && '🚚 '}
            {order.status === 'Delivered' && '🎉 '}
            {order.status}
          </span>
          {order.returnRequested && (
            <span className={styles.returnBadge}>↩ {order.returnStatus}</span>
          )}
        </div>

        <div className={styles.itemsPreview}>
          {order.items.slice(0, 3).map((item, i) => (
            <div key={i} className={styles.previewItem}>
              <span className={styles.previewEmoji}>{item.emoji}</span>
              <span className={styles.previewTitle}>{item.title}</span>
              <span className={styles.previewQty}>× {item.qty}</span>
              <span className={styles.previewPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className={styles.moreItems}>+{order.items.length - 3} more item(s)</p>
          )}
        </div>

        <div className={styles.cardActions}>
          {canReturn && (
            <button className={styles.returnBtn} onClick={() => setShowReturnModal(true)}>
              ↩ Request Return
            </button>
          )}
          {order.returnRequested && (
            <button className={styles.cancelReturnBtn} onClick={() => cancelReturn(order.id)}>
              Cancel Return
            </button>
          )}
          <button className={styles.shopAgainBtn} onClick={() => navigate('/')}>
            Buy Again
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className={styles.expandedSection}>
          <h4 className={styles.expandedTitle}>Order Details</h4>
          <OrderStatusTracker status={order.status} />

          <div className={styles.itemsTable}>
            <div className={styles.tableHeader}>
              <span>Item</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Subtotal</span>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className={styles.tableRow}>
                <span className={styles.tableItemName}>
                  <span className={styles.tableEmoji}>{item.emoji}</span>
                  {item.title}
                </span>
                <span className={styles.tableCenter}>{item.qty}</span>
                <span className={styles.tableCenter}>₹{item.price.toLocaleString()}</span>
                <span className={styles.tableRight}>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className={styles.tableTotalRow}>
              <span className={styles.tableTotalLabel}>Order Total</span>
              <span className={styles.tableTotalValue}>₹{order.total.toLocaleString()}</span>
            </div>
          </div>

          {order.returnRequested && (
            <div className={styles.returnInfo}>
              <p className={styles.returnInfoTitle}>↩ Return Information</p>
              <p><strong>Status:</strong> {order.returnStatus}</p>
              <p><strong>Reason:</strong> {order.returnReason}</p>
              <p className={styles.returnNote}>
                Our team will contact you within 24–48 hours to arrange pickup. Refund will be processed within 5–7 business days after pickup.
              </p>
            </div>
          )}

          <div className={styles.deliveryInfo}>
            <p className={styles.deliveryInfoTitle}>📍 Delivery Address</p>
            <p>Ludhiana, Punjab — 141001</p>
            <p style={{ color: '#555', fontSize: '13px', marginTop: 4 }}>Payment: UPI / Online</p>
          </div>
        </div>
      )}

      {showReturnModal && (
        <ReturnModal
          order={order}
          onClose={() => setShowReturnModal(false)}
          onSubmit={(reason) => requestReturn(order.id, reason)}
        />
      )}
    </div>
  )
}

export default function Orders() {
  const { orders } = useOrders()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Your Orders</h1>
          <p className={styles.pageSubtitle}>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
        <button className={styles.continueShoppingBtn} onClick={() => navigate('/')}>
          ← Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <h2 className={styles.emptyTitle}>No orders yet</h2>
          <p className={styles.emptySubtitle}>When you place an order, it will appear here.</p>
          <button className={styles.shopNowBtn} onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
