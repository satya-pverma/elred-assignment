import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Allproducts from './Allproducts'
import AllCategory from './AllCategory'
import MainCart from './MainCart'
import home2 from '../media/home2.png'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

const Product = () => {

const {cat} = useParams()
const {subcat} = useParams()

const history =  useNavigate()

const [subcategory, setSubcategory] = useState([])
const [refreshtoken, setRefreshToken] = useState(false)
const [cartItem, setCartItem] = useState([])

const [carttotal, setCartTotal] = useState(0)
const [tax, setTax] = useState(0)
const [gtotal, setGtotal]  = useState(0)
// console.log('refresh hit')

var ctotal=0
var tx=0
var sumall=0 
  

useEffect(()=>{

        const fetchsubcategory=async()=>{
    
            var base = `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${cat}.json`
            const response = await fetch(base).then((response) => response.json());
            setSubcategory(response.result)
            setRefreshToken(!refreshtoken)

            const cookiedata = (Cookies.get())
              var finalCartItem = []
              Object.entries(cookiedata).map(item=>{
                  var itemlist = JSON.parse(item[1])
                  if(itemlist.length>0)
                  {
                    for(var i=0; i<itemlist.length;i++)
                    {
                      finalCartItem.push(itemlist[i])
                      var total = parseInt(itemlist[i].grossPrice) * parseInt(itemlist[i].qty)
                      ctotal = ctotal + total
                    }
                  }
              })

              tx = (9/ 100) * ctotal
              sumall = ctotal + tx*3 +1000
              setCartTotal(ctotal)
              setTax(tx)
              setGtotal(sumall)
              setCartItem(finalCartItem)

          }
    
          fetchsubcategory()
        
    
},[])

useEffect(()=>{
  const cookiedata = (Cookies.get())
  var finalCartItem = []
  Object.entries(cookiedata).map(item=>{
      var itemlist = JSON.parse(item[1])
      if(itemlist.length>0)
      {
        for(var i=0; i<itemlist.length;i++)
        {
          finalCartItem.push(itemlist[i])
          var total = parseInt(itemlist[i].grossPrice) * parseInt(itemlist[i].qty)
          ctotal = ctotal + total

        }
      }
  })
  tx = (9/ 100) * ctotal
  sumall = ctotal + tx*3 +1000
  setCartTotal(ctotal)
  setTax(tx)
  setGtotal(sumall)
  setCartItem(finalCartItem)

  
  },[refreshtoken])

const handleRefresh = ()=>{
  setRefreshToken(!refreshtoken)
}


//console.log(subcategory)


  return (
    <div className='container-fluid '>
      <div className='row'>

        <div className='col  p-3' style={{height:'560px'}}>
          <div className='border bg-white rounded' style={{height:'545px'}}>
            <Sidebar />
          </div>
        </div>

        <div className='col-6  p-3'>
          <div className='border bg-white rounded' style={{height:'545px'}}>
            <Allproducts handlecartview={handleRefresh} />
          </div>  

        </div>

        <div className='col  p-3'>
          <div className='border bg-white rounded' style={{height:'655px'}}>
            <MainCart data = {cartItem} carttotal={carttotal} tax={tax} gtotal={gtotal} from={'product'} handleRefresh={handleRefresh} />
          </div>

        </div>

      </div>

      <div className='w-75 bg-white border rounded p-3 scroll' style={{marginTop:'-110px', height:'110px', overflowY:'scroll'}}>
        <div className='d-flex'>
            <div style={{cursor:'pointer'}} onClick={()=>history('/')} className='border rounded p-3 mx-5'>
                <img src={home2} style={{width:'40px', height:'40px'}} />
            </div>
            {
                subcategory && subcategory.length>0 && subcategory.map((item,i)=>(
                    <div key={i} onClick={()=>history(`/${item.categoryId}/${item.subCategoryId}`)} style={{cursor:'pointer'}} className={` ${item.subCategoryId==subcat?'p-0 border-danger':''} border rounded mx-5`}>
                        <img src={item.subCategoryImageURL} style={{width:'150px', height:'72px'}} />
                    </div>
                ))
                
            }

        </div>

      </div>
     
        
    </div>
  )
}

export default Product