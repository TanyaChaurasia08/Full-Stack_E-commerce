import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'
const Addproduct = () => {
    const [image,setImage]=useState(false);
    const[productDetails,setproductdetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler=(e)=>{
     setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setproductdetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product=async()=>{
      console.log(productDetails);
      let responsedData;
      let product=productDetails;

      let formData=new FormData();
      formData.append('product',image);

      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
          Accept:'application/json',
        },
        body: formData,
      }).then((resp)=>resp.json()).then((data)=>{responsedData=data})
      if(responsedData.success){
        product.image=responsedData.image_url;
        console.log(product)
        await fetch('http://localhost:4000/api/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product),

        }).then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Product Added"):alert("Failed")
        })
      }
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfiled">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
      </div>
     <div className="addproduct-price">
  <div className="addproduct-itemfiled">
    <p>Price</p>
    <input value={productDetails.old_price} type="text" name='old_price' placeholder='Type here' onChange={changeHandler}/>
  </div>  
  <div className="addproduct-itemfiled">
    <p>Offer Price</p>
    <input value={productDetails.new_price} type="text" name='new_price' placeholder='Type here' onChange={changeHandler} />
  </div>  
</div>

      <div className='addproduct-itemfiled'>
       <p>Product category</p>
       <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
         <option value="kids">Kid</option>
       </select>
      </div>
      <div className="addproduct-itemfiled">
       <label htmlFor="file-input">
        <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
       </label>
       <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct
