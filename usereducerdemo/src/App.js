import{ useReducer, useState } from 'react'
import './App.css';

function App() {
  const initialState ={money:100}
  const reducer = (state, action)=>{
    switch(action.type){
      case 'decrease':
        return {money:state.money-10}
      case 'increase':
        return {money:state.money+10}
      default:
        return state
    }
  }
  const [state,dispatch]=useReducer(reducer, initialState)
  return (
    <div className="App">
      <h1>Wallet Money: {state.money} </h1>
      <div>
        <button onClick={()=>dispatch({type:'decrease'})}>Shopping for Veggies!</button>
        <button onClick={()=>dispatch({type:'increase'})}>Serve a meal!</button>
      </div>
    </div>
  );
}

export default App;
