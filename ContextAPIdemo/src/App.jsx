import { useContext } from 'react'
import './App.css'
import Item from './components/Item'
import Cart from './components/Cart'
// import Counter from './components/Counter'
// import { CounterContext } from './contexts/Counter'

function App() {
  // const {count,setCount} = useContext(CounterContext)
  return (
    <>
     {/* <h1>Count is {count}</h1>
     <Counter/>
     <Counter/>
     <Counter/>
     <Counter/> */}
     <Item name={'Book'} price={10}/>
     <Item name={'Pen Drive'} price={50}/>
     <Item name={'Mobile'} price={500}/>
     <Cart/>
    </>
  )
}

export default App
