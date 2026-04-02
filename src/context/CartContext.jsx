import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2600)
  }, [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(x => x.id === product.id)
      if (existing) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`"${product.title.slice(0, 35)}..." added to cart`)
  }, [showToast])

  const changeQty = useCallback((id, delta) => {
    setCart(prev => {
      const updated = prev.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x)
      return updated.filter(x => x.qty > 0)
    })
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const itemCount = cart.reduce((s, x) => s + x.qty, 0)
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, clearCart, itemCount, total, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
