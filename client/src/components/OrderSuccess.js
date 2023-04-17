
import React, { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import CartItem from './CartItem'



const OrderSuccess = () => {
    
    
  const [cookie, setCookie,removeCookie] = useCookies(null)


    const [cartTotal, setCartTotal] = useState(0)    
    
    const email = cookie.email
    const cartData = cookie.orderdata
//     const data = cartData

    // console.log('data from ordersuccess', data)

    useEffect( () => {
    
      async function updateDB() {
        


        // insert total to order
        console.log('from ordersuccess before updating total')
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER}/order/total`, { 
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart_id: cartData[0].cart_id,
              email: email,                    
            })
          }) 
        } catch (error) {
          console.log(error)
          }  

        for(let i = 0; i < cartData.length; i++){
           
            try {    
                console.log('from order success trying to run loop')
                // set painting in stock to false -----------------------------------------------------------------------

                const response = await fetch(`${process.env.REACT_APP_SERVER}/paintings/painting/`, { 
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    painting_id: cartData[i].painting_id                    
                        })
                    })             
            } catch (error) {
              console.log(error)
            }  

//add painting price, painting id, order id to order item ----------------------------------------------
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/orderItem/`, { 
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  painting_id: cartData[i].painting_id,
                  email: email,                    
                })
              }) 
        } catch (error) {
            console.log(error)
          }    
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/cartItem/`, {
              method: "DELETE",
              headers: { 'Content-Type': 'application/json'},           
            })
            if (response.status === 200) {        
                // getCartData()
                console.log('from order success')
            }
        } catch (error) {
            console.log(error)
          }
    }     
    // update total price in order
          //set order to fulfilled
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/order/`, { 
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cartData.cart_id,
          email: email,                    
        })
      }) 
    } catch (error) {
      console.log(error)
      }
      setCartTotal(0)
    //   setCart(false)
       window.location = process.env.REACT_APP_BASE_URL

      


        }
      
      
      updateDB()
      
    }, [])


//     }

//   //   const createOrder2 = async () => {   

//   //       for(let i = 0; i < cartData.length; i++){
           
//   //           try {    

//   // // set painting in stock to false -----------------------------------------------------------------------

//   //               const response = await fetch(`${process.env.REACT_APP_SERVER}/paintings/painting/`, { 
//   //                 method: 'PUT',
//   //                 headers: {
//   //                   'Accept': 'application/json',
//   //                   'Content-Type': 'application/json',
//   //                 },
//   //                 body: JSON.stringify({
//   //                   painting_id: cartData[i].painting_id                    
//   //                 })
//   //               })             
//   //             } catch (error) {
//   //                 console.log(error)
//   //             }  

//   // //add painting price, painting id, order id to order item ----------------------------------------------
            
//   //           try {
//   //               const response = await fetch(`${process.env.REACT_APP_SERVER}/orderItem/`, { 
//   //                   method: 'POST',
//   //                   headers: {
//   //                     'Accept': 'application/json',
//   //                     'Content-Type': 'application/json',
//   //                   },
//   //                   body: JSON.stringify({
//   //                     painting_id: cartData[i].painting_id,
//   //                     email: email,                    
//   //                   })
//   //                 }) 
//   //           } catch (error) {
//   //               console.log(error)
//   //             }    
            
//   //           try {
//   //               const response = await fetch(`${process.env.REACT_APP_SERVER}/cartItem/`, {
//   //                 method: "DELETE",
//   //                 headers: { 'Content-Type': 'application/json'},           
//   //               })
//   //               if (response.status === 200) {        
//   //                   getCartData()
//   //               }
//   //           } catch (error) {
//   //               console.log(error)
//   //             }
//   //       }     
//   //       // update total price in order
//   //             //set order to fulfilled
//   //       try {
//   //         const response = await fetch(`${process.env.REACT_APP_SERVER}/order/`, { 
//   //           method: 'PUT',
//   //           headers: {
//   //             'Accept': 'application/json',
//   //             'Content-Type': 'application/json',
//   //           },
//   //           body: JSON.stringify({
//   //             total: cartTotal,
//   //             email: email,                    
//   //           })
//   //         }) 
//   //       } catch (error) {
//   //         console.log(error)
//   //         }
//   //         setCartTotal(0)
//   //         setCart(false)
//   //          window.location.reload()
//   //       // create new order entry
//   //       // try {
//   //       //   const response = await fetch(`${process.env.REACT_APP_SERVER}/order/new`, { 
//   //       //     method: 'POST',
//   //       //     headers: {
//   //       //       'Accept': 'application/json',
//   //       //       'Content-Type': 'application/json',
//   //       //     },
//   //       //     body: JSON.stringify({              
//   //       //       email: email,                    
//   //       //     })
//   //       //   }) 
//   //       // } catch (error) {
//   //       //   console.log(error)
//   //       //   }
        
        
       
            
//             //remove cart or set to inactive
        
    
    
   
    return(
        <div className="cart-overlay">
           Hi from order successsss!!!!!!!!!!!!!!!!!!!!
        </div>
            
       
        
        
    )
}
export default OrderSuccess