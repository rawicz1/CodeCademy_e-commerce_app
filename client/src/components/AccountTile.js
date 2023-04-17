import './style/Account.css'
import { useState, useEffect } from "react"
import  useCollapse  from 'react-collapsed'

// get each order's details

const AccountTile = ({ order }) => {
    
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [orderDetails, setOrderDetails] = useState([])
    const [orderDate, setOrderDate] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          
            const data = await fetch(`${process.env.REACT_APP_SERVER}/orderItem/${order.id}`)
            const json = await data.json()
            setOrderDetails(json)
            
        }
        fetchData()        
        }, [])

    console.log("from order details: ", orderDetails)
   
    return (
        <div className='account-item'>       
          <div className='info-container'>          
            <div className="collapsible">
              <div className="header1" {...getToggleProps()}>
                  
                  {isExpanded ? <div className='item-title-box'> <span className='expand-title'><button>Click to collapse</button></span></div>
                   : <div className='item-title-box'><span className='expand-title'><button>Click to expand</button></span></div> }
              </div>
              <div {...getCollapseProps()}>
                  <div className="content">{orderDetails.length>0 && orderDetails[0].date_placed.substring(0, 10)}<hr></hr>
                      <div>{orderDetails.map((order, i) => {
                        return <div key={i} className='painting-details1'> <span>Painting: {order.name}</span><span>Price: {order.price}</span></div>
                        })}
                      </div>
                      <p className='total'>Total: {orderDetails.length>0 && orderDetails[0].total}</p>
                  </div>
                  
              </div>
            </div>
                      
          
  
          </div>
            
          
        </div> 
      );
}
export default AccountTile