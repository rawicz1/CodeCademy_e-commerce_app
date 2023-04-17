const router = require("express").Router();
const pool = require('./index');

// check if there is a pending order in customers account

const checkIfOrder = async (req, res) => {

  const {email} = req.params
  const orderData = await pool.query('SELECT o.id, o.customer_id from orders o JOIN customers c ON o.customer_id = c.id WHERE c.email = $1', [email])
  console.log(orderData.rows)
}

// update total amount on sending order

const updateTotal = async (req, res) => {
  const { cart_id, email }  = req.body
  const status = 'pending'
  const date_placed = new Date()
  
  try {
    const customerData = await pool.query('SELECT o.id, o.customer_id from orders o JOIN customers c ON o.customer_id = c.id WHERE c.email = $1 AND o.status = $2', [email, status])

    const customer_id = customerData.rows[0].customer_id
    const order_id = customerData.rows[0].id  
    
    const totalData = await pool.query('SELECT SUM(price) from paintings p JOIN cart_item ci ON p.id = ci.painting_id JOIN cart c on ci.cart_id = c.id WHERE ci.cart_id = $1', [cart_id])
    const total = totalData.rows[0].sum    
    const result = await pool.query('UPDATE orders SET total = $1, date_placed = $2 WHERE customer_id = $3 AND status = $4', [total, date_placed, customer_id, status])
      
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
  }
}

const sendOrder = async (req, res) => {
    console.log('req.body from send order', req.body)
    
    const { cart_id, email }  = req.body
    const date_placed = new Date()
    const status = 'pending'  
    try {     
      
      const customerData = await pool.query('SELECT o.id, o.customer_id from orders o JOIN customers c ON o.customer_id = c.id WHERE c.email = $1 AND o.status = $2', [email, status])
      const customer_id = customerData.rows[0].customer_id
      const order_id = customerData.rows[0].id         
      
      await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['fulfilled', order_id])
      await pool.query(`INSERT INTO orders (customer_id, date)  VALUES ($1, $2) RETURNING *`, [customer_id, date_placed])     
      res.status(200).json(customerData.rows)
  } catch (error) {
      console.log(error)      
  }
}

// get all orders form a customer

const allOrders = async (req, res) => {
    
  const { email } = req.params
  // console.log('from all orders to show in account ', email)
  try {
    const result = await pool.query('SELECT o.id, o.date_placed, o.total FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.email = $1 AND o.status = $2 ORDER BY o.id DESC', [email, "fulfilled"])
    res.json(result.rows)
  } catch (error) {
    console.log(error)
  }
    
  };

  // create pending order for a customer

  const createOrder =  async (req, res) => {

    const{ email } = req.body        
    const date = new Date()

    try {      
      const customerData = await pool.query('SELECT * FROM customers WHERE customers.email = $1 ', [email])
      const customer_id = customerData.rows[0].id      
      const createOrderEntry = await pool.query(
                `INSERT INTO orders (customer_id, date)  VALUES ($1, $2) RETURNING *`, [customer_id, date])
    } catch (e) {
      console.log(e)
    }
  }


  module.exports = {
    allOrders,
    createOrder,
    sendOrder,
    checkIfOrder,
    updateTotal
};
