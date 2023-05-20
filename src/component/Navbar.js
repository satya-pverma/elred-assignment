import React from 'react'
import { Link } from 'react-router-dom'
import  '../App.css'
import logo3 from '../media/logo3.png'
import profile from '../media/profile.png'

const Navbar = () => {
  return (
    <div>
    <div className="container-fluid ">
    <div className=" bg-white">
        <div className='row'>
            <div className='col d-flex'>
            <img className='mx-2 mt-2' style={{width:'30px', height:'30px'}} src={logo3} />
            <p className='text-dark fw-bold small mt-3 '>AT Link</p>
            </div>

            <div className='col-6'>
                <div className="input-group w-50">
                <input className="form-control border-end-0 border bg-light mt-2 " type="search" placeholder="search..." id="example-search-input" />
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary bg-light border-start-0  border ms-n5 mt-2" type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </span>
                </div>
            </div>

            <div className='col-3'>
                <div className='d-flex'>
                    <div>
                    <img style={{width:'40px', height:'40px', borderRadius:'60%'}} className='circle border mt-2 '  src={logo3} />
                    <i className="bi bi-chevron-down mt-5"></i>
                    </div>
                    <div className='mx-4'>
                    {/* <i className="bi bi-chevron-down"></i> */}
                    </div>
                    <div className=''>
                    <img style={{width:'35px', height:'35px', borderRadius:'60%'}} className='circle border mt-2'  src={profile} />
                    </div>

                    <div className='mx-1 mt-1'>
                        <p className='text small  '>satya prakash verma</p>
                        <p className='text small fw-light' style={{marginTop:'-20px'}}>satyaverma0075@gmail.com</p>
                    </div>
                    <div className='mt-2'>
                    <i className="bi bi-chevron-down mt-0"></i>
                    </div>
                    
                </div>

                
                
            </div>


        </div>
       
    </div>
    </div>
    </div>
  )
}

export default Navbar