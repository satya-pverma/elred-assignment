import React from 'react'
import '../App.css'

const CartListModal = ({handleClose, show, data,}) => {

    // console.log(data)

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main scroll" style={{overflowY:'scroll'}}>
          
          <button className='btn btn-outline-danger float-end rounded-none' style={{width:'20px', height:'20px'}} type="button" onClick={handleClose}><p style={{marginTop:'-10px', marginLeft:'-5px'}}>X</p></button>

          <div className='row bg-light  p-0'>
            <div className='col-6 text-center'>
                <p className='text-secondary '>Products</p>

            </div>

            <div className='col-2 text-center '>
                <p className='text-secondary '>quantity</p>

            </div>

            <div className='col-3 text-center '>
                <p className='text-secondary '>Price</p>
               
            </div>
            <div className='col-1 text-center '>
                <p className='text-danger '><i className="bi bi-pen"></i></p>
               
            </div>

        </div>

        {
            data && data.length>0 ?
            <>
            <div className='text-dark  small mt-2 '>
            {
                data && data.length>0 && data.map((item,i)=>(
                    <div key={i} className={`row  p-2`}>
                        <div className='col-6 '>
                            <div className='row '>
                                <div className='col-4  text-center'><img src={item.imgUrl} style={{height:'50px', width:'50px'}} /></div>
                                <div className='col-8  fw-bold' >
                                    <p>{item.prodname}</p>
                                    <p  style={{ fontSize:'13px', marginTop:'-16px' }} className='text-secondary '>{item.colorDescription.split("Color")[0]} , {item.packingDescription.split('(')[0]}</p> 
                                    <p style={{ fontSize:'10px', marginTop:'-16px' }} className='text-secondary'>₹ {item.grossPrice}</p>
                                </div>    
                            </div>
                        </div>

                        <div className='col-2 '>
                            <p className=' mx-5'>{item.qty}</p>
                        </div>

                        <div className='col-3  text-center'>
                            <p style={{fontSize:'14px'}}>₹ {parseInt(item.grossPrice) * parseInt(item.qty)}</p>
                        </div>

                        <div className='col-1  text-center'>
                            {/* <p>{item.price}</p> */}
                        </div>
                    </div>
                ))
            }
            </div>
            </>
            :
            <></>
        }


        </section>


       

      </div>
    );
}

export default CartListModal