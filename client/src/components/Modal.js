import './style/Modal.css'
import { useState } from "react";
import { useCookies } from 'react-cookie'

// handle login / sign up

const Modal = ({isLoggedIn, setIsLoggedIn, setModal, setCartId, setCustomerId}) => {

  const [cookie, setCookie,removeCookie] = useCookies(null)
  const [error, setError] = useState(null)
  const [first_name, setFirst_name] = useState(null)
  const [last_name, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)    
  
  const logIn = (status) => {
    setError(null)    
    status = !status    
    setIsLoggedIn(status)
    }  
  
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLoggedIn && password !== confirmPassword){
      setError('Passwords not matching')
      return
    }

    // const checkIfCart = await fetch(`${process.env.REACT_APP_SERVER}/${endpoint}`)
    const response = await fetch(`${process.env.REACT_APP_SERVER}/${endpoint}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, first_name, last_name})
    })
    const data = await response.json()    
    
    if(data.errors){
      setError(data.errors[0].msg)
      return
    }
    if(data.detail){
      setError(data.detail)
    }else {
      
      setCookie('email', data.email)
      setCookie('AuthToken', data.token)
      setCookie('first_name', data.first_name)
      // setCookie('customer_id', data.customer_id)
      // setCookie('cart_id', data.cartId)
      window.location.reload()
    }    
  }
    
    return (
      <div className='overlay'> 
        <div className="auth-container">
          <div className="auth-container-box">
            <form>  
              <div className='modal-title'>
                <h2>{isLoggedIn ? 'Please log in ' : 'Please sign up '}<span>{error && <span style={{'fontSize': 'small', 'color': 'red','fontWeight': 'normal'}}>{error}</span>} </span></h2> 
              
                <button style={{fontSize: 20}} onClick={() => setModal(false)}>X</button>
              </div>       
              <div style={{'fontSize': 'small'}}>(Log in with test@testuser.com and password 123456)</div>
              <div className='form-input'>
                {!isLoggedIn && <>
                <input type='first_name' placeholder="first name" onChange={(e) => setFirst_name(e.target.value)}/>
                <input type='last_name' placeholder="last name" onChange={(e) => setLastName(e.target.value)}/></>}
                <input type='email' placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                {!isLoggedIn && <input type='password' placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
                <input type='submit' value='Submit'className="create" onClick={(e) => handleSubmit(e, isLoggedIn ? 'login' : 'signup')}/> 
              </div>
                                    
            </form>
            <div className="auth-buttons">
              <div style={{'padding': '5px', 'fontSize': 'small'}}>or</div>
              {isLoggedIn ? <button onClick={() => logIn(true)}>Sign up</button> : <button onClick={() => logIn(false)}>Log in</button>}
            </div>

          </div>
        </div>
      </div>
     
    );
  }
  
  export default Modal;
  