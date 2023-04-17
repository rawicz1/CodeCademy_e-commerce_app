import './style/Header.css'
// import Modal from "./Modal";
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import Cart from './Cart'
import Account from './Account'


const Header = ({ authToken, showModal, updateOrder, signOut, googleUser, displayCategory, handleCategoryChange, categories, cartData, setCartData, getCartData}) => {

  const [cookie, setCookie,removeCookie] = useCookies(null)
  const [cart, setCart] = useState(false)
  const [account, setAccount] = useState(false)
  const email = cookie.email
  
  const handleCartButton = () => {
    setCart(true)
  }  

  const handleAccountButton = () => {
    setAccount(true)
  }
 
    return (
        <div className="header">

          {cart && <Cart cartData={cartData} setCartData={setCartData} getCartData={getCartData} setCart={setCart} updateOrder={updateOrder}/>}
          {account && <Account setAccount={setAccount}/>}
          <div className='header-title'>
            <h1>Welcome to AIGAllery</h1> 

            {/* ------------------------------select category------------------------------ */}
            <div className='div-select'>
              <select className='header-select' value={displayCategory} onChange={(e) => {handleCategoryChange(e)}}>
              <option defaultValue="All categories" >{displayCategory ? 'Select category - all': 'test 2'}</option>
              {categories.map((category, i) => {
                        return (<option key={i} value={category.category} >{category.category}</option>)
                        })}        
              </select>
            </div>
                        
          </div>          
          <div className="button-container" >        
            <div className='main-buttons'>
              <div> 
              {/* ------------------------ login / signup buttons ----------------------------- */}
              
                {!authToken ? <div className='login-signout-buttons'>   <button onClick={() => {showModal(false)}}>Log in</button>
                  <button  onClick={() => {showModal(true)}}>Sign up</button></div> : <p>Hello, {cookie.first_name}!</p>} 
              <div className='cart-signout'> {authToken && 
                <div>
                  <button className="basket-button"  onClick={handleCartButton}>Your basket: {cartData.length}</button>
                  <button className='account-button' onClick={handleAccountButton}>Your account</button>
                </div>}
                  {authToken && <button className="signout" onClick={signOut} >Sign out</button>}
              </div>
               
              <div className='google-login-button'>
                {!authToken && <>{Object.keys(googleUser).length === 0 && <div id='signInDiv'></div>}</>}
              </div>
              </div>                           
            </div>            
          </div>          
        </div>
    );
  }
  
  export default Header;
  