import './App.css'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [field, setField] = useLocalStorage('name',()=>'')

  return (
    <>
    <input type="text" value={field} onChange={(e)=>setField(e.target.value)} />
       
    </>
  )
}

export default App
