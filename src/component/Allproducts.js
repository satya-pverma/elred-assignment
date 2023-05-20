import React, { useEffect, useState } from 'react'
import leftarrow from '../media/leftarrow.png'
import { useParams } from 'react-router-dom'
import noproduct from '../media/noproduct.png'
import default2 from '../media/default2.jpg'
import prod3 from '../media/prod3.jpeg'
import sanitizer from '../media/sanitizer.jpg'
import Modals from './Modals'

const Allproducts = ({handlecartview}) => {

const {cat} = useParams()
const {subcat} = useParams()

// console.log(cat+'---'+subcat)

const [allproducts, setAllProducts] = useState([])
const [subcategory, setSubcategory] = useState()
const [loading, setLoading] = useState(true)
const [prodselected, setProdSelect] = useState()

const [show, setShow] = useState(false)

useEffect(()=>{

    setLoading(true)
    const fetchsubcategory=async()=>{

        var base = `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${subcat}.json`
        const response = await fetch(base).then((response) => response.json());
        // console.log(response)
        setAllProducts(response.result)
        // setSelectedcat(response.result[0].categoryId)
        setLoading(false)
      }

      fetchsubcategory()
    

},[prodselected])


const showModal = () => {
    setShow(true);
  };

const  hideModal = () => {
    setProdSelect()
    setShow(false)
    handlecartview()
  };

const SelectProduct =async(item)=>{
    setProdSelect(item)
    showModal();

}







if(loading) 
{
  return(
  <div style={{maxWidth:'50px', marginLeft:'auto', marginRight:'auto', marginTop:'150px'}}>
  <div className="spinner-border text-primary "   role="status">
  </div>
  </div>
  )
}


  return (
    <div className='p-3'>
        <div className='row'>
            <div className='col-6  p-1 d-flex'>
                <img className='mx-3' src={leftarrow} style={{width:'15px', height:'23px'}} />
                <h5 className='text fw-bold large'>All Products</h5>
            </div>

            <div className='col-6  p-0 d-flex'>
                <div className='w-75'>
                <div className="input-group">
                <input className="form-control border-end-0 border bg-light" type="search" placeholder="search..." id="example-search-input" />
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary bg-light border-start-0  border ms-n5" type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </span>
                </div>
                </div>
                <div>
                    <div className='border p-2 mx-1 rounded '>
                        <div className='fw-light small mx-1' ><span><i className="bi bi-sliders2 "> Filters </i></span></div>
                    </div>
                </div>

            </div>

        </div>

        <div className=' row mt-2 d-flex scroll' style={{overflowY:'scroll' , height:'60vh'}}>

        {
            allproducts && allproducts.length>0 && allproducts.map((item, i)=>{
              return(
                <div onClick={()=>SelectProduct(item)} key={i} className='col-lg-4 col-sm-6 col-md-4  p-2 b rounded ' style={{height:'250px', cursor:'pointer'}} >

                <div className={`border text-danger text-center p-3 rounded mx-2`} style={{height:'230px'}}>
                <i style={{marginLeft:'80%', marginTop:'-20px'}} className="bi bi-heart"></i>
                    <img  className={`rounded mt-1`} src={item.productImages.length != 0? item.productImages[0] :sanitizer} alt="..." style={{width:'100%', height:'90px'}}  /> 
                    <h6 className='text-dark small text-light fw-bold' style={{marginTop:"5px", }} >{item.itemDescription }</h6>
                    <p className='text-secondary' style={{fontSize:'10px'}}>lorem ipusm some random text for image description will go here default</p>
                </div>
                
               
                </div>
              )
            })
          }
            
    <div className={`${allproducts.length==0?' text-center mt-5':'d-none'}`}>
        <img src={noproduct} style={{width:'320px', height:'250px'}} />
    </div>
            

        </div>


          {/* modals open */}
        {
            prodselected  ?
            <>
             <Modals show={show} handleClose={hideModal} data={prodselected} >
                
            </Modals>
            </>
            :
            <></>

        }
       


    </div>
  )
}

export default Allproducts