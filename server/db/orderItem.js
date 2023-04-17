// const router = require("express").Router();
const pool = require('./index');
// const { v4: uuidv4 } = require('uuid');
// const dbPaintings = require('../db/paintings')

const createOrderItem =  async (req, res, next) => {

    const created = new Date()
    const { email, painting_id } = req.body    

    try {
        const paintingsData = await pool.query(`SELECT * from paintings WHERE paintings.id = $1`, [painting_id])
        const price= paintingsData.rows[0].price
        const orderData = await pool.query('SELECT  o.id FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.email = $1 AND o.status = $2', [email, 'pending']) // this allows to control columns 
        const order_id = orderData.rows[0].id        
        const result = await pool.query(
            "INSERT INTO order_item ( created, price, painting_id, order_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [created, price, painting_id, order_id]
          );
          res.json(result)

    } catch (error) {
        console.log(error)
    }   
  }

  const getItemsByOrderId = async (req, res) => {
      const order_id = req.params.id
      const status = 'fulfilled'      
    try {
      const result = await pool.query('SELECT * FROM order_item oI JOIN orders o ON oI.order_id = o.id JOIN paintings p ON oI.painting_id = p.id WHERE o.id = $1 AND o.status = $2', [order_id, status])
      res.json(result.rows)
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {
    createOrderItem,
    getItemsByOrderId
  }