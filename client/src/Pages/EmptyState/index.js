import React from 'react'
import "../pages.css" 

const index = () => {
  return (
    <div className=' EmptyStatDiv text-white
    text-center'>

    <div className=''>
      <p className='EmptyDesc'>Your movie list is empty</p>
      <button  className="btn text-white EmptyButton">
      Add a new movie
        </button>
    </div>   
    </div>
  )
}

export default index
