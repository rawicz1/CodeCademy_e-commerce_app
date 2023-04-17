import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import OrderSuccess from './components/OrderSuccess';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>

<Router>
  {/* <App /> */}
 <Routes>
    
      
  
      <Route path="/" element={<App />} />
      <Route path='/ordersuccess' element={<OrderSuccess />}/>
      
    
  </Routes>
      
 
</Router>



);
