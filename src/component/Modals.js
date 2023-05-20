import React, { useEffect, useState } from 'react'
import '../App.css'
import prod3 from '../media/prod3.jpeg'
import sanitizer from '../media/sanitizer.jpg'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'



// 643e7aa0db684bac5851d8f7

//6443847e1d270f0631d34980


const Modals = ({ handleClose, show, data, }) => {

const {cat} = useParams()
const {subcat} = useParams()

// console.log(data)
const [itemprice, setPriceitem] = useState()

const [uniquecolor, setUniqueColor] = useState([])
const [uniquepackaging, setUniquepackaging] = useState([])
const [quantity, setQuantity] = useState('12')
const [text,setText] = useState('')
const [colorselected, setColorSelected] = useState()
const [packageselected, setPackageselected] = useState()
const [amount, setAmount] = useState()

const [finalitem, setFinalItem] = useState(null)
const [productdesc, setProdDesc] = useState('')
const [catlog, setCatlog] = useState('')

const [orderlist, setOrderlist] = useState([])
const [disabled, setDisabled] = useState(false)
const [toast, setToast] = useState(false)

var orderArr=[]



useEffect(()=>{

    const fetchdata = async()=>{

        var key = 'colorCode'
        var arr = [...new Map(data.variants.map(item =>[item[key], item])).values()];
    //    console.log(arr)
        setUniqueColor(arr)
        
        var key ="packingCode"
        var pkg =[...new Map(arr.map(item =>[item[key], item])).values()];
        // console.log(pkg)
        setUniquepackaging(pkg)

        // const existingitems = await GetOrderListAsPerProductId(data.productId)
        // setOrderlist(existingitems)
        var existingitems = (Cookies.get(`${data.productId}`))
        if(existingitems!=undefined)
        {
            // console.log(JSON.parse(existingitems))
            setOrderlist(JSON.parse(existingitems))
        }
    }
    fetchdata()
    
    

},[])

useEffect(()=>{

setColorSelected(uniquecolor[0])
setPackageselected(uniquepackaging[0])

},[uniquecolor, uniquepackaging])


useEffect(()=>{
    if(colorselected && packageselected)
    {
      
        data.variants.map(item=>{
            if(item.colorCode==colorselected.colorCode && item.packingCode == packageselected.packingCode)
            {
                // console.log('found')
                // console.log(item)
                setFinalItem(item)
                // var fee = parseInt(quantity) * parseInt(item.grossPrice)
                setProdDesc(item.saleDescription)
                setCatlog(item.bpCatalogNumber)
                setAmount(parseInt(item.grossPrice))
                
            }           

        })
    }
},[colorselected, packageselected, quantity])


const handleQuantityChange = async(val)=>{
    // console.log(val)
    if(val<parseInt(12)){
        setText('Quantity Should not be less than 12')
        setDisabled(true)
    }
    if(val<=100 && val>=12){
        setText('')
        setDisabled(false)
    }
    if(val>parseInt(100)){
        setText('Quantity Should not be greater than 100')
        setDisabled(true)
    } 
    else{
        setQuantity(val)
    }   
}


const selectColorDescription=async(item)=>{
    //console.log(item)
    setColorSelected(item)
    setProdDesc(item.saleDescription)
    setCatlog(item.bpCatalogNumber)
    setAmount(parseInt(item.grossPrice))
}

const selectPackageDescription=async(item)=>{
    setPackageselected(item)
}


const AddItemToOrderLists = async()=>{
    //console.log(finalitem)
    if(finalitem==null)
    {
        setToast(true)
    }
    else{
        
        orderArr = orderlist
    
        const index = orderArr.findIndex(item => item.variantId === finalitem.variantId);

            if (index === -1) {
                finalitem.qty= quantity
                finalitem.imgUrl = data.productImages.length!=0?data.productImages[0] :sanitizer 
                finalitem.prodname = data.itemDescription
                finalitem.prodid = data.productId
                setOrderlist([...orderArr, finalitem ])
            } else {
                orderArr[index].qty = parseInt(orderArr[index].qty) + parseInt(quantity) ;
                setOrderlist([...orderArr])

            }
       
    }
    
}

const RemoveItemFromOrderList = async(item)=>{

    orderArr = orderlist  
    const idToRemove = item.variantId;

    const order = orderArr.filter((item) => item.variantId !== idToRemove);
    setOrderlist(order)

}

const FinalAdditionToCart = async()=>{
    Cookies.set(`${data.productId}`,JSON.stringify(orderlist) )
    handleClose()
   
}


const JustBeforeAddingToCart=async()=>{

    if(orderlist.length==0)
    {
        Cookies.set(`${data.productId}`,JSON.stringify(orderlist) )  
    }

    setOrderlist([])
    setUniqueColor([])
    setUniquepackaging([])
    setText('')
    setColorSelected()
    setPackageselected()
    setAmount()
    setFinalItem(null)
    setProdDesc('')
    setCatlog('')
    handleClose()
    
}


    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          
          <button className='btn btn-outline-danger float-end rounded-none' style={{width:'20px', height:'20px'}} type="button" onClick={()=>JustBeforeAddingToCart()}><p style={{marginTop:'-10px', marginLeft:'-5px'}}>X</p></button>

          <div className='p-2'>
           {/* toast */}
            <div className={` ${toast?'':'d-none'} text-light bg-danger rounded`} style={{position:'fixed', marginLeft:'20%', width:'60%', height:'60px'}}>
                <p className='text-center mt-3 small'>No Item With Selected Colors and Packaging</p>
            </div>

            <div className='row border-right mx-5' >
                <div className='text'>
                    <p className='fw-bold'>{data.itemDescription}</p>
                </div>

    {/* Left SIde Column */}
                <div className='col-6 ' style={{marginTop:'-40px'}}>
                    <div className='img text-center p-2 bg-light'style={{height:'200px', marginTop:'30px'}}>
                        <i className='bi bi-heart float-end text-danger'></i>
                        <img  src={data.productImages.length!=0?data.productImages[0] :sanitizer} style={{width:'140px', height:'140px', marginTop:'20px'}} />
                    </div>

                    {/* description of product  */}
                    <div className=''>
                        <p className='text-secondary small ' >#{catlog}</p>
                        <div className='d-flex' style={{marginTop:'-16px'}}>
                            <div className='me-auto'> <p className='text-dark fw-bold mt-0'>{data.itemDescription}</p></div>
                            <div className='text-end'> <p className='text-dark fw-bold mt-0'>{data.currency.symbol} {amount}</p></div>
                        </div>

                        <div className='lorem ipsum'>
                            <p style={{marginTop:'-16px'}} className='text-secondary small  fw-normal'>{productdesc}</p>
                        </div>
                    </div>


                    {/* select color desc */}
                    <div style={{marginTop:'-4px'}}>
                        <p className='text-normal fw-bold small'>Please Select Color Description</p>
                        <div className='row' style={{marginTop:'-10px'}}>
                        {
                           colorselected && uniquecolor && uniquecolor.map((item,i)=>{
                                return(
                                    <div key={i} className='col-3' >
                                        <button onClick={()=>selectColorDescription(item)} style={{height:'40px'}} className={` ${colorselected.colorCode == item.colorCode ? 'text-danger border-danger  text-danger':'border'}  btn p-2  rounded mt-1 btn-light w-100`}><p style={{fontSize:'10px'}}>{item.colorDescription.split('Color')[0]}</p></button>
                                    
                                    </div>
                                )
                            })
                        }
                        </div>

                    </div>


                    {/* Select Packaging */}
                    <div>
                    <p className='text-normal fw-bold small mt-3'>Please Select Packaging Description</p>
                    <div className='row' style={{marginTop:'-10px'}}>
                        {
                            packageselected && uniquepackaging && uniquepackaging.map((item,i)=>{
                                return(
                                    <div key={i} className='col-4' >
                                        <button  onClick={()=>selectPackageDescription(item)} style={{height:'40px'}} className={` ${packageselected.colorCode == item.colorCode ? 'text-danger border-danger':''}  btn p-2  rounded mt-1 btn-light w-100 small`}><p className='' style={{fontSize:'10px'}}>{item.packingDescription.split("(")[0]}</p></button>
                                    
                                    </div>
                                )
                            })
                        }
                        </div>

                    </div>

                    {/*select quantity  */}
                    <div>
                        <p className='text-dark fw-bold mt-3 small'>Enter quantity</p>
                        <input value={quantity} type='text' onChange={(e)=>{handleQuantityChange(e.target.value)}} className='form-control' style={{marginTop:'-14px'}} />
                        <p className='text-danger small'>{text}</p>

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label small" for="flexCheckDefault">
                            Need urgent order
                        </label>
                        </div>
                    </div>

                    {/* final add button */}
                    <div>
                        <div className=' mt-3 text-center'>
                            <button disabled={disabled} onClick={()=>AddItemToOrderLists()} className='btn btn-100 btn-outline-warning w-75 mx-auto'>Add</button>
                        </div>

                    </div>



                </div>


    {/*  Right Side  column */}

                <div className='col-6 p-3' style={{marginTop:'-55px', borderLeft:'1px solid grey', height:'100vh'}}>
                    <p className=' fw-bold'>Order Lists</p>
                    
                    
                    {/* headers section */}


                    <div className='row bg-light rounded-none text-center' style={{marginTop:'-10px'}}>
                        
                        <div className='col-2'>

                        </div>
                        <div className='col-4'>
                            <p className='text-secondary '>Products</p>
                        </div>
                        <div className='col-3'>
                            <p className='text-secondary'>Quantity</p>
                        </div>
                        <div className='col-2 '>
                            <p className='text-secondary text-center'>Price</p>
                        </div>
                        <div className='col-1 '>
                            <p  className='text-danger'>X</p>
                        </div>
                    </div>


                    {/* List section */}
                    <div>

                    <div className='text-dark  small mt-2 ' >
                        {
                            orderlist && orderlist.length>0 && orderlist.map((item,i)=>(
                                <div key={i} className='row mt-2 '>
                                    
                                    <div className='col-2 '>
                                        <img className='mx-2' src={data.productImages.length!=0?data.productImages[0] :sanitizer} style={{width:'35px', height:'35px'}} />
                                    </div>

                                    <div className='col-5 ' style={{whiteSpace:'nowrap', overflow:'hidden',  textOverflow:'ellipsis' }}>
                                        <p className='fw-normal text-dark ' style={{fontSize:'16px'}}>{data.itemDescription}</p>
                                        <p className='text-secondary small' style={{fontSize:'11px', marginTop:'-15px'}}>{item.colorDescription.split("Color")[0]} , {item.packingDescription.split('(')[0]}</p>
                                    </div>

                                    <div className='col-1'>
                                        <p>{item.qty}</p>
                                    </div>

                                    <div className='col-2 mx-2'>
                                        <p className='mx-4'>{parseInt(item.grossPrice) * parseInt(item.qty)}</p>
                                    </div>

                                    <div className='col-1 '>
                                        <p style={{cursor:'pointer'}} onClick={()=>RemoveItemFromOrderList(item)} className='text-danger mx-2'>X</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                    <div className={orderlist.length==0?'':'d-none'}>
                        <p className='text-center text-danger' style={{marginTop:'250px'}}>No Item in Order List</p>

                    </div>


                    </div>

                    {/* final add to cart button  */}
                    <div className={orderlist.length!=0?'mx-auto text-center':'d-none'}>
                        <button onClick={()=>FinalAdditionToCart()} className='btn btn-warning w-75 text-center mt-5'>Add Item To Cart</button>
                    </div>


                </div>











            </div>
        </div>


        </section>


       

      </div>
    );
}

export default Modals