const router = require("express").Router();
const pool = require('./index');
const { v4: uuidv4 } = require('uuid');
const dbPaintings = require('../db/paintings')

// const getCartItems = (req, res) => { 
  
//   pool.query('SELECT * FROM cart_item ', (error, results) => {
//       if (error) {
//           throw error
//       }
//       console.log('results from cart item: ', results.rows)
      
//   })
// };

// create cart item

const createCartItem =  async (req, res, next) => {

    const created = new Date()
    const email = req.body.email
    const painting_id = req.body.painting_id
    const id = uuidv4() 

    try {    

      const customerData = await pool.query(`SELECT * FROM customers WHERE email = $1`, [email])
      console.log(customerData.rows)
      const customerId = customerData.rows[0].id
      const cartData = await pool.query(`SELECT cart.id from cart 
        JOIN customers ON cart.customer_id = customers.id WHERE customers.id = $1`, [customerId])          
      const cart_id = cartData.rows[0].id      
      const checkIfInCart = await pool.query(`SELECT * from cart_item JOIN cart ON cart_item.cart_id = cart.id WHERE cart_item.painting_id = $1 
      AND cart.customer_id = $2`, [painting_id, customerId]) 
      console.log('checking if in cart: ', checkIfInCart.rows)
      if (checkIfInCart.rows.length>0) {
        return
      }

      const result = await pool.query(
        "INSERT INTO cart_item (id, created, painting_id, cart_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [id, created, painting_id, cart_id]
      );
      res.json(result)
    } catch (e) {
      console.log(e)      
    }
    
  }

  // delete all items from cart on sending order

  const deleteAll = async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM cart_item')
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  }

  // delete an item from the cart

  const deleteCartItem =  async (req, res, next) => {
    const {email} = req.body
    
    try {
      const cartIdQuery = await pool.query(`SELECT cart.id FROM customers JOIN cart on customers.id = cart.customer_id WHERE customers.email = $1
      `, [email])
      const cartId = cartIdQuery.rows[0].id
      console.log('cart id from query: ', cartId)
      const result = await pool.query('DELETE from cart_item WHERE painting_id = $1 AND cart_id = $2', [req.params.id, cartId]) 
      res.json(result)
    } catch (error) {
      console.log(error)
    }
     

    }

module.exports = {
    createCartItem,
    deleteCartItem,
    // getCartItems,
    deleteAll
};