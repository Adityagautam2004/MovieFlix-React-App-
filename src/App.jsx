import { useState } from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import Trending from './components/Trending'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='w-screen  bg-[#1F1E24] flex '>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending/>} />

      </Routes>
      
     </div>
    </>
  )
}

export default App
