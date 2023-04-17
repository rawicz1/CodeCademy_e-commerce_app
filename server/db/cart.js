const router = require("express").Router();
const pool = require('./index');
const dbCart = require('../db/cart');
const { v4: uuidv4 } = require('uuid');

const checkIfCart = async (user) =>{
 
  const isCart =  await pool.query('SELECT * FROM cart WHERE "customer_id" = $1', [user.id])
    if(isCart.rows.length > 0){
    console.log('cart exists')
    return true
  } else{
    console.log('no cart found from cart db')
    return false
  }    
}

const getCartById = async (req, res) => {
    
    const email = req.params.id

    try {
      const cartData = await pool.query(`SELECT cart_item.id, painting_id, cart_item.cart_id FROM cart_item JOIN CART ON cart_item.cart_id = cart.id
      JOIN customers ON cart.customer_id = customers.id WHERE customers.email = $1`, [email])
      res.status(200).json(cartData.rows)
      
    } catch (error) {
      console.log(error)
    } 

}

const getCartId = async (req, res) => {
  
  try {
    console.log(req)
    const isCart =  await pool.query('SELECT * FROM cart ')
    res.json(isCart)
  } catch (error) {
    console.log(error)
  }
  // const result = await pool.query('SELECT * FROM cart ORDER BY date_created ASC', (error, results) => {
  //     if (error) {
  //         throw error
  //         }
  //     res.status(200).json(results.rows)
  // })
};

const createCart =  async (customer_id) => {
  // const customer_id = req.body.id
  const id = uuidv4()  
  const date_created = new Date()
  try {
    
    console.log('creating cart', customer_id)
    
    const result = await pool.query(
      "INSERT INTO cart (id, date_created, customer_id) VALUES ($1, $2, $3) RETURNING *",
      [id, date_created, customer_id]
    );
    
  } catch (e) {
    console.log(e)
    // return next(e);
  }
};

const deleteCart = async (req, res) => {
  const { email } = req.body
  console.log('deleting cart--------------------------')
  try {
    const customerData = await pool.query('SELECT * from orders JOIN customers ON orders.customer_id = customers.id WHERE customers.email = $1', [email])
    const customer_id = customerData.rows[0].id  
    const result = await pool.query('DELETE from cart WHERE customer_id = $1', [customer_id])
  } catch (error) {
    
  }
  
}

module.exports = {
    getCartId,
    createCart,
    checkIfCart,
    getCartById,
    deleteCart
};
