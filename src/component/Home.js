import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Allproducts from './Allproducts'
import AllCategory from './AllCategory'
import MainCart from './MainCart'
import Cookies from 'js-cookie'

const Home = () => {

  const [cartItem, setCartItem]  = useState([])
  const [refresh, setRefresh] = useState(false)

  const [carttotal, setCartTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [gtotal, setGtotal]  = useState(0)

var ctotal=0
var tx=0
var sumall=0 
  

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
    
    },[refresh])

  
  const handleRefresh=()=>{
    setRefresh(!refresh)
  }



  return (
    <div className='container-fluid '>
      <div className='row'>

        <div className='col  p-3' style={{height:'670px'}}>
          <div className='border bg-white rounded' style={{height:'655px'}}>
            <Sidebar />
          </div>
        </div>

        <div className='col-6  p-3'>
          <div className='border bg-white rounded' style={{height:'655px'}}>
            <AllCategory  />
          </div>  

        </div>

        <div className='col  p-3'>
          <div className='border bg-white rounded' style={{height:'655px'}}>
            <MainCart data={cartItem}  carttotal={carttotal} tax={tax} gtotal={gtotal} from ={'home'} handleRefresh={handleRefresh} />
          </div>

        </div>

      </div>
        
    </div>
  )
}

export default Home