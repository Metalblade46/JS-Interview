import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [cost, setCost] = useState(0);
  const [rate,setRate] = useState(0);
  const [pf,setPf] = useState(1);
  const [down,setDown] =useState(0);
  const [tenure,setTenure] = useState(12);
  const [emi,setEmi] = useState(0);

  const calculateEmi= (downPayment)=>{
      let P = cost - downPayment;
      let R = rate/100;
      let T = tenure/12;
      let Amount = (P * R * (1+R)**T)/((1+R)**T-1);
      if (isNaN(Amount)) return;
      return (Amount/12).toFixed(2);
  }
  const calculateDP =(emi)=>{
    let amount= emi*12;
    let R = rate/100;
    let T = tenure/12;
    let dp = cost- (amount*((1+R)**T-1))/(R * (1+R)**T)
    if (isNaN(dp)) return;
    return dp.toFixed(0);
  } 
  const updateEMI = (e)=>{
    if(!cost||!rate) return;
    let downPayment = +(e.target.value) 
    setDown(downPayment);
    let emi = calculateEmi(downPayment);
    setEmi(emi);
  }

  const updateDP= (e)=>{
    if(!cost||!rate) return;
    console.log(cost,rate)
    let emi = +(e.target.value);
    setEmi(emi);
    let dp = calculateDP(emi);
    setDown(dp);
  }
  const totalDownPayment= ()=>{
    let total= ((+down+(cost-down)*pf/100).toFixed(0))
    return total
  }
  useEffect(()=>{
    if(!rate || !cost) return
    let emi = calculateEmi(down);
    setEmi(emi);
    let dp = calculateDP(emi);
    setDown(dp);
  },[cost,tenure,rate,calculateEmi,calculateDP])
  return (
    <>
     <h1>EMI Calculator</h1>
     <h3>Formula Used <pre>Amount = (P * R * (1+R)**T)/((1+R)**T-1), P is Principal, R is the Rate and T is Tenure</pre></h3>
     <form>

      <label htmlFor="cost">Total Cost of Asset</label>
      <input type="number" id="cost" value={cost} onChange={(e)=>setCost((e.target.value))}/>


      <label htmlFor="rate">Interest rate (in %)</label>
      <input type="number" id="rate" value={rate} onChange={(e)=>{if(e.target.value>=0 && e.target.value<=100)setRate((e.target.value))}}/>


      <label htmlFor="fee">Processing Fee (in %)</label>
      <input type="number" id="fee" value={pf} onChange={(e)=>{if(e.target.value>=0 && e.target.value<=100)setPf((e.target.value))}}/>

      <label htmlFor="downpayment">Down Payment (in %)</label>
      <div className='total'>Total Down Payment - ₹{totalDownPayment()}</div>

      <input type="range" min="0" max={cost} id="downpayment"  value={down} onChange={updateEMI}/>
      
      <div className='slider-data'><p>0%</p> <p>₹{down}</p> <p>100%</p></div>

      <label htmlFor="emi">Loan Per Month</label>

      <div className='total'>Total Loan Amount- ₹{(emi*tenure).toFixed(2)||'0'}</div>

      <input type="range" step={0.1} id="emi" min={calculateEmi(cost)} max={calculateEmi(0)} value={emi} onChange={updateDP}/>

      <div className='slider-data'><p>₹{calculateEmi(cost)}</p>₹{emi}<p>₹{calculateEmi(0)}</p></div>
     </form>
      <div className='tenure'>
        <p>Tenure</p>
        {[12,24,36,48,60].map((t, i) => <button type="button" key={i} disabled={!cost||!rate}
        className={t==tenure? 'selected':''} onClick={()=>setTenure(t)}>{t}</button>)}
      </div>
    </>
  )
}

export default App
