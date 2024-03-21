
import { useEffect, useState } from 'react'
import './App.css'

function App() {
 const [products, setProducts]= useState([])
 const[productsPerPage,setproductsPerPage] = useState(10);
 const [selectedPage,setselectedPage] = useState(0);
 useEffect(fetchProducts,[])
  function fetchProducts(){
    fetch('https://dummyjson.com/products?limit=100')
.then(res => res.json())
.then(products=>{setProducts(products.products)})
  }
useEffect(()=>{
  if(selectedPage>Math.ceil(products.length/productsPerPage)-1) setselectedPage(Math.ceil(products.length/productsPerPage)-1)
},[productsPerPage])
  return (
    <>
    <h2>Pagination demo</h2>
    <label htmlFor="count" >Number of products per page : </label>
    <select name="count" id="count" value={productsPerPage} onChange={(e)=>{
      setproductsPerPage(parseInt(e.target.value))
    }}>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
      <div className='main'>
        <div className='container'>
        {
          products.slice(selectedPage*productsPerPage,selectedPage*productsPerPage+productsPerPage).map(product =>{
            return (
              <div key={product.id} className="card">
                <img width='250px' height='250px'  src={product.images[0]} alt="" />
                <h4>{product.title}</h4>
                <p>Price: ${product.price}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="pagination">
        <span className='page' onClick={()=>{
          if(selectedPage>0) setselectedPage(selectedPage=>selectedPage-1)
        }}>◀️</span>
        {
          new Array(Math.ceil(products.length/productsPerPage)).fill(1).map((k,i)=>
          <span onClick={()=>setselectedPage(i)} 
          className={i==selectedPage? 'page selected': 'page'} key={i}>{i+1}</span>)
        }
        <span className='page'
        onClick={()=>{
          if(selectedPage<Math.ceil(products.length/productsPerPage)-1) setselectedPage(selectedPage=>selectedPage+1)
        } 
        }
        >▶️</span>
      </div>
    </>
  )
}

export default App
