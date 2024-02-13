import React, { useContext, useState,useEffect } from 'react';
import { Firestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import {FirebaseContext} from '../../store/FirebaseContext'
import { postContext } from '../../store/PostContext';
import Heart from '../../assets/Heart';
import { useNavigate } from 'react-router-dom';
import './Post.css';
function Posts() {
const {firebase} = useContext(FirebaseContext)
const [products,setProducts] = useState([])
const {setPostDetails} = useContext(postContext)
const navigate = useNavigate()
useEffect(()=>{
  const productCollection = collection(Firestore,"products")
  getDocs(productCollection).then((snapshot)=>{
    const posts = snapshot.docs.map((product)=>{
      return{
        ...product.data(),
        id:product.id
      }
    })
    setProducts(posts)
  })
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

{products.map((product)=>{
          return(
            <div key={product.id}
            className="card" onClick={()=>{
              setPostDetails(product)
              navigate('/post')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
       
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div>
          )
})}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product)=>{
          return(
            <div key={product.id}
            className="card" onClick={()=>{
              setPostDetails(product)
              navigate('/post')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
       
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div>
          )
})}
        </div>
      </div>
    </div>
  );
}

export default Posts;
