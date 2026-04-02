import { createContext, useContext, useState, useCallback } from 'react'

const OrdersContext = createContext(null)

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])

  const placeOrder = useCallback((cartItems, total) => {
    const orderId = 'OD' + Date.now() + Math.floor(Math.random() * 1000)
    const now = new Date()
    const deliveryDate = new Date(now)
    deliveryDate.setDate(deliveryDate.getDate() + (Math.random() > 0.5 ? 2 : 3))

    const newOrder = {
      id: orderId,
      items: cartItems.map(item => ({ ...item })),
      total,
      status: 'Confirmed',
      placedAt: now.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      returnRequested: false,
      returnStatus: null,
    }

    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }, [])

  const requestReturn = useCallback((orderId, reason) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, returnRequested: true, returnStatus: 'Return Initiated', returnReason: reason }
        : order
    ))
  }, [])

  const cancelReturn = useCallback((orderId) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, returnRequested: false, returnStatus: null, returnReason: null }
        : order
    ))
  }, [])

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, requestReturn, cancelReturn }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrdersContext)
}
