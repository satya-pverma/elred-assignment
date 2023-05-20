import React from 'react'
import logo3 from '../media/logo3.png'
const Sidebar = () => {
  return (
    <div>
        <div  className='text mx-5 mt-2 d-flex'>
            <img src={logo3} style={{width:'50px', height:'50px'}} />
            <p className='mt-3 mx-2 fw-bold'>AT Link</p>
        </div>

        <div className='d-flex mx-5 mt-5  '>
            <i className="bi bi-columns-gap p-2"></i>
            <p className='mx-4 small fw-light mt-2'>Dashboard</p>
        </div>

        <div className='d-flex mx-5  border rounded' style={{backgroundColor:'#FFEAE9'}}>
            <i className="bi bi-boxes p-2"></i>
            <p className='mx-4 small fw-bold text-danger mt-2'>All Products</p>
        </div>

        <div className='d-flex mx-5 '>
            <i className="bi bi-box-fill p-2"></i>
            <p className='mx-4 small fw-light mt-2'>Orders</p>
        </div>

        <div className='d-flex mx-5 '>
            <i className="bi bi-heart-fill p-2"></i>
            <p className='mx-4 small fw-light mt-2'>Favorite</p>
        </div>

        <div className='d-flex mx-5 '>
            <i className="bi bi-gear-wide p-2"></i>
            <p className='mx-4 small fw-light mt-2'>New Arrival</p>
        </div>

    </div>
  )
}

export default Sidebar