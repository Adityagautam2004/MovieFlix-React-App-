import { useState } from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='w-screen h-screen bg-zinc-800'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
     </div>
    </>
  )
}

export default App
