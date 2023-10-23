import './style/CartItem.css'
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'

// display info on each painting in cart

const CartItem = ({data, cartData, setCartData, getCartData, cartTotal, setCartTotal }) => {
  const [cookie, setCookie,removeCookie] = useCookies(null)
  const [paintingData, setPaintingData] = useState([])  
  const email = cookie.email
  
    useEffect(() => {
         
        const fetchData = async () => {
          try {
            const result = await fetch(`${process.env.REACT_APP_SERVER}/paintings/painting/${data.painting_id}`)
            const json = await result.json()  
            setPaintingData(json)            
            setInterval(setCartTotal(prev => prev + json[0].price), 1000)
          } catch (error) {
            console.log(error)
            }          
          }  
 
          fetchData()   
          
        }, [])   

    const handleRemove = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/cartItem/${paintingData[0].id}`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({            
            email: email,
            })
          })
        if (response.status === 200) {        
          getCartData()
          setCartTotal(prev => prev - paintingData[0].price)
        //  console.log('painting removed from cart')
          }
      } catch (error) {
        console.log(error)
      }
    }
        
    
      
    return(
        <div className="cart-item">
            <div className="cart-item-box">      
                {paintingData.length != 0 ? 
                  <div className='cart-item-content'>
                    <img
                        src={require(`./images/${paintingData[0].name}.jpg`)}
                        alt={paintingData[0].name}
                        height="300px" 
                        width="80%"
                        
                    />
                    <div className='name-price'><div>{paintingData[0].name}</div> <div style={{'fontSize': 'small'}}>price: £{paintingData[0].price}</div></div>
                    
                   <button onClick={(e) => handleRemove(e)}>Remove</button></div> : <p>...loading... </p>}
                
            </div>            
        </div>          
    )
}
export default CartItem