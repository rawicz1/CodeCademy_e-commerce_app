/* global google */

import './App.css'
// import ListHeader from "./components/ListHeader";
import React, { useEffect, useState, useRef, createRef } from "react"
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/Header";
import Modal from './components/Modal'
import ImagesList from "./components/ImagesList";
import jwt_decode from "jwt-decode"
// import Cart from './components/Cart';

const google = window.google = window.google ? window.google : {}

const App = () => {  
  
  const [categories, setCategories] = useState([{}])
  const [paintingsData, setPaintingsData] = useState([{}])  
  const [displayCategory, setDisplayCategory] = useState({})
  const [modal, setModal] = useState(false)
  const [cartId, setCartId] = useState(null)
  const [cartData, setCartData] = useState([])
  const [customerId, setCustomerId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)  
  const [cookie, setCookie,removeCookie] = useCookies(null)
  const [googleUser, setGoogleUser] = useState({})
  const [updateOrder, setUpdateOrder] = useState(0)
  
  const authToken = cookie.AuthToken || Object.keys(googleUser).length != 0  

  //check if redirected from the checkout

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
      setUpdateOrder((updateOrder) => updateOrder +1)
      
      window.location.replace(process.env.REACT_APP_BASE_URL)
    }

  }, []);

  const showModal = (value) => {    
    setModal(true)
    setIsLoggedIn(!value)
      }

  const handleCustomerId = (value) => {   
    setCustomerId(value)    
      }

// get paintings in user's cart ------------------------------------------------------
  const getCartData = async () => {
    const email = cookie.email 
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER}/cart/${email}`) // need to get the amount of items in the cart
      const json = await data.json()  
      setCartData(json)
    } catch (error) {
      console.log(error)
    }   
  }
    
  // display paintings in chosen category

  const handleCategoryChange = (category) => {    
    category.preventDefault()
    const fetchData = async () => {
      const data = await fetch(`${process.env.REACT_APP_SERVER}/paintings/category/${category.target.value}`)
      const json = await data.json()
      setPaintingsData(json)
      if (json[0]) {
        setDisplayCategory(json[0].category)
      }
      else{        
        window.location.reload()
      }     
    }
    fetchData()  
    setDisplayCategory(category)   
  }

  // get all paintings 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${process.env.REACT_APP_SERVER}/paintings`)
        const json = await data.json()       
          setPaintingsData(json) 
      } catch (error) {
        console.log(error)
    }          
  }  
    fetchData()        
    }, []) 

  // get available paintings categories 

  useEffect(() => {
    const fetchData = async () => {
      setCustomerId(customerId)
      const data = await fetch(`${process.env.REACT_APP_SERVER}/paintings/categories`)
      const json = await data.json()
      setCategories(json)
      // console.log(json)
    }
    fetchData()        
    }, [])
 

  const signOut = () => {      
      setGoogleUser({})
      removeCookie('email')
      removeCookie('AuthToken')
      removeCookie('first_name')
      window.location.reload()
  }  

  function handleCallbackResponse (response){
    
    const userObject = jwt_decode(response.credential)    
    setGoogleUser(userObject)
    setCookie('email', userObject.email)
    setCookie('first_name', userObject.given_name)    
    setCookie('AuthToken', response.credential)

    document.getElementById("signInDiv").hidden = true
    const first_name = userObject.given_name
    const last_name = userObject.family_name
    const email = userObject.email   
    const password = uuidv4()       
    const send = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({first_name, last_name, email, password })      
    })    
    }
    send()
     
  }

  useEffect(() => {
    
    /* global google */ 
      if(authToken){
        return
      }
      const getGoogle = setTimeout(initializeAccounts, 500);
      
      function initializeAccounts() {
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_CLIENT_ID,
          callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {theme: "outline", size:"large"})          
      }  
  }, [])
  useEffect(() => {    
     setTimeout(() => {getCartData()}, 500 )   
    }, [googleUser] )
  
  return (
    <div>
      
        <div className='app-main'>          
          <Header authToken={authToken} showModal={showModal} cookie={cookie} signOut={signOut} googleUser={googleUser}
                  displayCategory={displayCategory} handleCategoryChange={handleCategoryChange} categories={categories} 
                  cartData={cartData} setCartData={setCartData} getCartData={getCartData} updateOrder={updateOrder} />        
          <div className='select-box'>          
          </div>                   
          <div className='app-main-image-box'> 
            {modal && <Modal setModal={setModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
            cartId={cartId} setCartId={setCartId} handleCustomerId={handleCustomerId} setCustomerId={setCustomerId}  />}
            {paintingsData && <ImagesList  key={Math.random()} paintingsData={paintingsData} 
            authToken={authToken} setCartData={setCartData} getCartData={getCartData}/>}   
          </div>

        </div>
      
    </div>
  )
}

export default App;
