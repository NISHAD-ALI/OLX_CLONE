import React, { useContext, useEffect, useState } from 'react';
import { postContext } from '../../store/PostContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore } from '../../firebase/config';

import './View.css';

function View() {

  const {postDetails} = useContext(postContext)
  const [seller,setSeller] = useState('')

  useEffect(()=>{

    const {userId} = postDetails
    const userCollection = collection(Firestore,'users')

    getDocs(query(userCollection,where('id','==',userId))).then((res)=>{
      res.forEach((doc)=>{
        setSeller(doc.data())
      })
    }).catch((err)=>{
      alert(err.message)
    })
  })
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        {seller &&
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{seller.name}</p>
            <p>{seller.phone}</p>
          </div>
        }
      </div>
    </div>
  );
}
export default View;