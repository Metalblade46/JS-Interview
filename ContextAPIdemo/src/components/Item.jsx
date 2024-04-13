/* eslint-disable react/prop-types */

import { useContext } from "react"
import { CartContext } from "../contexts/Cart"

const Item = ({name,price}) => {
    const {setItems} = useContext(CartContext) 
  return (
    <div className='item-card'>
        <h4>{name}</h4>
        <p>Price: ${price}</p>
        <button onClick={()=>setItems(items=>[...items,{name,price}])}>Add to Cart</button>
        <button onClick={()=>setItems(items=>{
            const newItems = items.filter(item=>item.name!==name)
            return newItems;
        })}>Remove</button>
    </div>
  )
}

export default Item