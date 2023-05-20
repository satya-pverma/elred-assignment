import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import default2 from '../media/default2.jpg'

const AllCategory = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const [scale, setScale] = useState(false)
  const [selectedcat, setSelectedcat] = useState('')

  const [subcategory, setSubcategory] = useState()
  const [subloading,setSubloading] = useState(true)


  const history = useNavigate()


  useEffect(()=>{

    setLoading(true)
    const fetchdata=async()=>{

      var base = "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
      const response = await fetch(base).then((response) => response.json());
      // console.log(response)
      setData(response.result)
      setSelectedcat(response.result[0].categoryId)
      setLoading(false)
    }

    fetchdata()

  },[])


useEffect(()=>{
 
  if(selectedcat!='')
  {
  setSubloading(true)
  const fetchsubcategory=async()=>{

    var base = `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${selectedcat}.json`
    const response = await fetch(base).then((response) => response.json());
    // console.log(response)
    setSubcategory(response.result)
    // setSelectedcat(response.result[0].categoryId)
    setSubloading(false)
  }

  fetchsubcategory()
}

},[selectedcat])



  const handleClickOnPicture = (item) => {
    
    // console.log(item)
    setSelectedcat(item.categoryId)
  }

  const SelectSubCategory=async(item)=>{
    history(`/${item.categoryId}/${item.subCategoryId}`)

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
    <div className='container'>
    <div className='p-3'>
        <div className='row'>
            <div className='col-6  p-1 d-flex'>
                <h5 className='text-secondary fw-bold large mx-3'>Categories</h5>
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

        <div className='d-flex mt-3 scroll' style={{overflowX: "scroll",overflowY: "hidden",height: "170px", whiteSpace:'nowrap'}}>    
          {
            data && data.length>0 && data.map((item, i)=>{
              return(
                <div key={i} className='imagelist' onClick={()=>handleClickOnPicture( item)}>
                <div className={`${selectedcat== item.categoryId? 'border border-danger text-danger p-2 ':''} rounded mx-2`}>
                    <img  className={`rounded`} src={item.categoryImageURL != ''? item.categoryImageURL  :default2} alt="..." style={{width:'220px', height:'150px'}}  /> 
                    <h6 className='text-center text-light fw-light' style={{marginTop:"-30px"}} >{item.categoryName }</h6>
                </div>
                </div>
              )
            })
          }
          
        </div>
        
        <div className='container p-3'>
        <h6 className={'text-secondary fw-bold '}>subcategory</h6>
        <div className='row '>
          <div className='d-flex col-lg-4 col-sm-6 col-lg-3 mt-3 '>    
            {
              subcategory && subcategory.length>0 && !subloading ?
              <>
               {subcategory.map((item,i)=>{
                return(
                  <div key={i} className='mx-2' onClick={()=>SelectSubCategory(item)} style={{cursor:'pointer'}} >
                  <div>
                      <img  className={`rounded`} src={item.subCategoryImageURL != ''? item.subCategoryImageURL  :'./default.jpg'} alt="..." style={{width:'190px', height:'130px'}}  /> 
                      <h6 className='text-center text-dark fw-normal' style={{marginTop:"-30px"}} >{item.subCategoryName }</h6>
                  </div>
                  </div>
                )
              })
              } 
              </>
              :
              <div className=''>
                  <div style={{maxWidth:'350px', marginLeft:'auto', marginRight:'auto', marginTop:'50px'}}>
                    <p className='text text-danger'> No Sub category found </p>                    
                  </div>
                  
              </div>
            }
            
            
          </div>
        </div>
        </div>

    </div>
    </div>
  )
}

export default AllCategory