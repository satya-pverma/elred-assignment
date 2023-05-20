import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import cartitm from '../media/cartitm.png'
import CartListModal from './CartListModal'
import ordpl from '../media/ordpl2.gif'


const MainCart = ({data,carttotal, tax, gtotal, from , handleRefresh}) => {

const [datac,setDatac] = useState()
const [refresh, setRefresh] = useState(false)
const [oid, setOid] = useState('123456789876')
const [show, setShow] = useState(false)

// console.log(carttotal,tax,gtotal,from)

if(from == 'home')
{
    carttotal= carttotal/2
    tax=tax/2
    gtotal=gtotal/2
}

const  hideModal = () => {
    setShow(false)
  };

const showModal = () => {
    setShow(true);
};

//console.log(data)
// var ctotal=0
// var tx=0
// var sumall=0 

// useState(()=>{
//     setLoading(true)
//     console.log('inside useeffect')
//     data.map(item=>{
//         var total = parseInt(item.grossPrice) * parseInt(item.qty)
//         console.log(total)
//         ctotal = ctotal + total
//         // setCartTotal(carttotal+total)
//     })
    
//      tx = (9/ 100) * ctotal
//      sumall = ctotal + tx*3 +1000
//     setDatac(cartdata)
//     setCartTotal(ctotal)
//     setTax(tx)
//     setGtotal(sumall)
//     setLoading(false)
   
// },[cartdata])


const ClearCart = async()=>{
   // console.log('cart clear')

    
    for(var i=0;i<data.length;i++)
    {
        Cookies.remove(`${data[i].prodid}`)
    }
    handleRefresh()

}



  return (
    
    <div className='container-fluid'>
        <div className='row bg-light rounded p-1'>
            <div className='col-6 '>
                <p className='text-secondary text-center'>Products</p>

            </div>

            <div className='col-2 '>
                <p className='text-secondary'>Qty</p>

            </div>

            <div className='col-3  '>
                <p className='text-secondary text-center'>Price</p>
               
            </div>
            <div className='col-1 '>
                <p className='text-danger'><i className="bi bi-pen"></i></p>
               
            </div>
           

        </div>
        

        {
            data && data.length>0 ?
            <>
            <div className='text-dark  small mt-2 ' style={{height:'150px'}}>
            {
                data && data.length>0 && data.map((item,i)=>(
                    <div key={i} className={`row  ${i>=3?'d-none':''}  `}>
                        <div className='col-6'>
                            <div className='d-flex '>
                                <div><img src={item.imgUrl} style={{height:'40px', width:'40px'}} /></div>
                                <div className='mx-2' style={{whiteSpace:'nowrap', overflow:'hidden',  textOverflow:'ellipsis' }}>{item.prodname} </div>    
                            </div>
                            <p style={{marginTop:'-20px', fontSize:'10px', marginLeft:'50px', whiteSpace:'nowrap', overflow:'hidden',  textOverflow:'ellipsis'}} className='text-secondary'>{item.colorDescription.split("Color")[0]} , {item.packingDescription.split('(')[0]}</p>
                        </div>

                        <div className='col-2'>
                            <p>{item.qty}</p>
                        </div>

                        <div className='col-3'>
                            <p style={{fontSize:'14px'}}>₹ {parseInt(item.grossPrice) * parseInt(item.qty)}</p>
                        </div>

                        <div className='col-1'>
                            {/* <p>{item.price}</p> */}
                        </div>
                    </div>
                ))
            }

        </div>
        <div className='' style={{marginTop:'10px'}}>
                <p style={{cursor:'pointer',}} onClick={()=>showModal()} className={`text-center small text-danger fw-bold ${data.length<4?'d-none':''}`}> See All ({data.length}) > </p>
        </div>

        <div className='d-flex p-1 ' style={{height:'30px', marginTop:'10px', marginLeft:'-20px', width:'110%', backgroundColor:'#EAEBEB'}}>
            <div className='me-auto'><p className='small text-dark mx-2'>Other Instruction</p></div>
            <div className='text-end'><p className=' text-danger small'>Add ></p></div>
        </div>

        <div className=''>
            <label className='text-secondary small p-2 fw-bold'>Purchase Order</label>
            <input onChange={(e)=>setOid(e.target.value)} className='form-control' value={ oid} />
        </div>
        
        <div className=''>
            <div className='d-flex mt-2'>
                <div className='me-auto'><p className='text-dark fw-bold small  mx-2'>Address</p></div>
                <div className='text-end'><p className='text-danger small'>view ></p></div>

            </div>
            <p className='text-dark fw-light small  mx-2' style={{marginTop:'-5px'}}>House No-21/212, New Boaring Cannal Road,Patna..</p>
        </div>

        <div><hr style={{marginTop:"-8px"}}/></div>

        <div>
            <div className='d-flex p-1' style={{marginTop:'-13px'}}>
                <div className='me-auto text-secondary small'>Item Total</div>
                <div className='text-end text-secondary small '>₹ {carttotal}</div>
            </div>
            <div className='d-flex p-1'>
                <div className='me-auto text-secondary small'>SGST (9%)</div>
                <div className='text-end text-secondary small '>₹ {tax}</div>
            </div>
            <div className='d-flex p-1'>
                <div className='me-auto text-secondary small'>CGST (9%)</div>
                <div className='text-end text-secondary small '>₹ {tax}</div>
            </div>
            <div className='d-flex p-1'>
                <div className='me-auto text-secondary small'>IGST (9%)</div>
                <div className='text-end text-secondary small '>₹ {tax}</div>
            </div>
            <div className='d-flex p-1'>
                <div className='me-auto text-secondary small'>Taxable Amount</div>
                <div className='text-end text-secondary small '>₹ 1000</div>
            </div>
            <hr style={{marginTop:'-5px'}}/>
            <div className='d-flex p-1' style={{marginTop:'-13px'}}>
                <div className='me-auto text-dark fw-bold small'>Order Total</div>
                <div className='text-end text-dark fw-bold small '>₹ {gtotal}</div>
            </div>

            <div className='d-flex p-1' style={{marginTop:'-5px'}}>
                <div onClick={()=>ClearCart()} className='me-auto text-secondary small w-50'><button className='btn btn-light border w-100'>clear cart</button></div>
                <div  onClick={()=>ClearCart()} data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className='text-end text-secondary small w-50 mx-2'><button className='btn btn-danger border w-100'>place order</button></div>
            </div>

        </div>

            {/*see all cart modal open */}
            <CartListModal show={show} handleClose={hideModal} data={data} >
                
            </CartListModal>

            {/* OPen Order Place Modal */}

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title  text-success text-center" style={{fontSize:'15px'}} id="exampleModalLabel">Order Successfully Placed</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5">
                        <div className='text-center'>
                            <img src={ordpl} style={{width:'220px', height:'220px'}} />

                        </div>
                        <div className='d-flex  small'>
                            <div className='me-auto'>
                                <p>Order Id</p>
                            </div>
                            <div className='text-end'>
                                <p>{oid}</p>
                            </div>
                        </div>

                        <div className='d-flex  small'>
                            <div className='me-auto'>
                                <p>Total Items</p>
                            </div>
                            <div className='text-end'>
                                <p>{data.length}</p>
                            </div>
                        </div>

                        <div className='d-flex  small'>
                            <div className='me-auto'>
                                <p>Total Cost</p>
                            </div>
                            <div className='text-end'>
                                <p>₹ {gtotal}</p>
                            </div>
                        </div>

                        <div className='d-flex  small'>
                            <div className='me-auto'>
                                <p>Time</p>
                            </div>
                            <div className='text-end'>
                                <p> {new Date().toDateString()} , {new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>


            </>
            :
            <>
            <div className='text-center' style={{marginTop:'150px'}}>
                <img src ={cartitm} style={{width:'190px', height:'120px'}} />
                <p className='text-dark fw-bold small '>Items Not Added Yet</p>
            </div>
            </>
        }
        

    </div>
  )
}

export default MainCart