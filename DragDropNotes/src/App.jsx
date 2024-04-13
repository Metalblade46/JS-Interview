import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'

function App() {
  const [notes, setNotes] = useState([
    {
      id:1,
      text:'Note 1'
    },
    {
      id:2,
      text:'Note 2'
    }
  ])

  return (
    <>
     <Notes notes={notes} setNotes={setNotes}/>
    </>
  )
}

export default App
