import './style/Account.css'
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import  useCollapse  from 'react-collapsed'
import AccountTile from './AccountTile'

// get all previous orders from a customer

const Account = ({setAccount}) => {
    
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [cookie, setCookie,removeCookie] = useCookies(null)     
    const [allOrders, setAllOrders] = useState([])
    
    const email = cookie.email
    
    useEffect(() => {

        const getOrders = async () => {
            try {
                const data = await fetch(`${process.env.REACT_APP_SERVER}/order/${email}`) 
                const json = await data.json()

                console.log(json)
                setAllOrders(json) 
            } catch (error) {
                console.log(error)
            }
    }
    getOrders()
    }, [])
    
    // const getOrderDetails = async (id) => {
    //     try {
    //         const data = await fetch(`${process.env.REACT_APP_SERVER}/orderItem/${id}`)
    //         const json = await data.json()
    //         console.log(json)
    //     } catch (error) {
    //         console.log(error  )
    //     }
    // }
 
   
    return(
        <div className="account-overlay">
            <div className="account-box">    
                <h4>Your account</h4>   
                <div className="orders-main">         
                    <div className="header" {...getToggleProps()}>
                    
                            {isExpanded ? <div className='title-box'><span className='expand-title'>Click to hide</span></div> : <div className='title-box'><span className='expand-title'>   Click here for your previous orders</span></div> }
                    </div>

                    <div {...getCollapseProps()}>
                        <div className="order-content">
                            <div >{allOrders.map((order, i) => {
                                        return  <div className='order-items' key={i}> Order no: {order.id}
                                                <div ><AccountTile order={order}/></div> 
                                                </div>                                
                                        })}              
                            </div> 
                        </div>          
                    </div>
                </div>

                                    <div><button className='close-button' onClick={() => setAccount(false)}>X</button></div>  
            </div>   
        </div>
            
       
        
        
    )
}
export default Account