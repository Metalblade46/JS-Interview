/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { CartContext } from '../contexts/Cart'

const Cart = () => {
    const {items,setItems} = useContext(CartContext)
  return (
    <div>
        <h1>Cart</h1>
        <ul>
        {
            items.map((item,index) =><li key={index}>{item.name}- ${item.price}</li>)
        }
        </ul>
        <h5>Total Bill - ${items.reduce((acc,curr)=>acc+curr.price,0)}</h5>
    </div>
  )
}

export default Cart