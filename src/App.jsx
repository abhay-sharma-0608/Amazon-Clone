import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import Navbar from './components/Navbar'
import CartPanel from './components/CartPanel'
import Toast from './components/Toast'
import Home from './pages/Home'
import Category from './pages/Category'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <OrdersProvider>
      <CartProvider>
        <Navbar onCartOpen={() => setCartOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        {cartOpen && <CartPanel onClose={() => setCartOpen(false)} />}
        <Toast />
      </CartProvider>
    </OrdersProvider>
  )
}
