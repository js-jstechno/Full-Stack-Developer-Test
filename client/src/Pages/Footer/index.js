import React from 'react'
import FooterImage from "../../assets/images/Vectors.png"
import "../pages.css" 

const index = () => {
  return (
    <footer className="footer   text-white text-center   ">
        <img src={FooterImage} alt="footerImage"  className='img-fluid FooterImage' />
    </footer>
  )
}

export default index
