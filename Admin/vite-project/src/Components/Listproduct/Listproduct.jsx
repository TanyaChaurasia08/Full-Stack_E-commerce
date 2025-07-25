import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'
const Listproduct = () => {
  const [allproducts,setAllproducts]=useState([]);
 
  const fetchInfo=async()=>{
    await fetch('http://localhost:4000/api/allproducts').
    then((res)=>res.json())
    .then((data)=>{setAllproducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product=async()=>{
    await fetch('http://localhost:400/api/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  return (
    <div className='list-product'>
      <h1>All Products List</h1> 
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproducts.map((product,index)=>{
          return <div key={index} className="listproduct-format-main listproduct-fromat">
           <img src={product.image} alt="" className="listproduct-product-icon" />
           <p>{product.name}</p>
           <p>${product.old_price}</p>
           <p>${product.new_price}</p>
           <p>{product.category}</p>
           <img className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}

export default Listproduct
