import { useState } from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='w-screen  bg-[#1F1E24] flex '>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending/>} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
      </Routes>
      
     </div>
    </>
  )
}

export default App
