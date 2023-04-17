import './style/Cart.css'
import React, { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import CartItem from './CartItem'

// get ids of all paintings in cart to display / create order

const Cart = ({cartData, getCartData, setCart }) => {    
    
  const [cookie, setCookie,removeCookie] = useCookies(null)
  const [cartTotal, setCartTotal] = useState(0)        
  const email = cookie.email
  const data = cartData

  useEffect(() => {
      setCookie('orderdata', data)
  }, [])
    
  const painting_ids = cartData.map((element) => ({id: element.painting_id, quantity: 1 })) 


  const createOrder = async () => {
      
      await fetch(`${process.env.REACT_APP_SERVER}/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items:               
              painting_ids 
          }),
        })
          .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
          })
          .then(({ url }) => {
            window.location = url
            console.log(url)
            
          })
          .catch(e => {
            console.error(e.error)
          })
  }
      
   
    return(
        <div className="cart-overlay">
            <div className="cart">      
                <div><h4>Your cart: £{cartTotal}</h4> <button className='close-button' onClick={() => setCart(false)}>X</button>
                </div>  
                <div className='cart-items'>
                    <div>
                    {cartData.map((item) => { 
                        return <CartItem key={item.id} data={item} cartData={cartData} getCartData={getCartData} 
                                  cartTotal={cartTotal} setCartTotal={setCartTotal}/>
                        })}
                    </div>
                    {cartData.length> 0 && <button className='cart-items-button' onClick={() => createOrder()}>Order</button>}
                </div>                      
                
            
            </div>   
        </div>
            
       
        
        
    )
}
export default Cart