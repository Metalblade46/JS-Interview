import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './contexts/Cart.jsx'
// import { CounterProvider } from './contexts/Counter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <CounterProvider> */}
    <CartProvider>
    <App />
    </CartProvider>
    {/* </CounterProvider> */}
  </React.StrictMode>,
)
