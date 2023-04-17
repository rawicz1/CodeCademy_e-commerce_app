import { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useCookies } from "react-cookie";
import './style/ImageBox.css'



const ImageBox = ({ painting, setShowImage, authToken, getCartData  }) => {   

    const [cookie, setCookie,removeCookie] = useCookies(null)
    const email = cookie.email
    const link = `./images/${painting.name}.jpg`    
    
    const imageBoxOff = () => {        
        setShowImage(false)         
        setTimeout(() => {
            getCartData()
        }, 500 )
            
    }
  
    const addToCart = async () => {  
        imageBoxOff()
        
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER}/cartItem/${email}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              painting_id: painting.id,
              email: email,
            })
          })
         
          
            
        } catch (error) {
            console.log(error)
        }  
        
        // getCartData()       
      }   
   
   
   
    return(
        <div className='image-box'>
            <div className='image-box-display'>
                <img
                    src={require(`${link}`)}
                    alt={painting.name}
                    // height="300px"
                /> 
                <div className='image-description'>
                    <div className='close-button'>
                        <button className='close' onClick={() => imageBoxOff()}>X</button>
                    </div>
                    <div> 
                        <p>Painting: </p>
                        <p>{painting.name}</p>
                    </div>                       
                    <p>£{painting.price}</p>

                    {authToken && <button onClick={() => addToCart()}>Add to cart</button>}
                    
                    
                </div>
                
       
            </div>
          
        </div>
    )
}
export default ImageBox