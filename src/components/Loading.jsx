import React from 'react'
import loader from "/loader.gif"

function Loading() {
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center'>
        <img className="h-[50%] object-cover" src={loader} alt="" />
    </div>
  )
}

export default Loading