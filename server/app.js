const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const pool = require('./db')
const cors = require ('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult, body, ValidationChain } = require('express-validator');
const bodyParser = require('body-parser')
const dbCart = require('./db/cart')
const dbOrder = require('./db/order')
const dbCartItem = require('./db/cartItem')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


require('dotenv').config()
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.json())
app.use(bodyParser.json())

app.use('/paintings', require('./routes/paintings'))
app.use('/cartItem', require('./routes/cartItem'))
app.use('/cart', require('./routes/cart'))
app.use('/order', require('./routes/order'))
app.use('/orderItem', require('./routes/orderItem'))

const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;    
      }  
      const errors =  validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
       res.status(400).send({ errors: errors.errors, message: errors.errors[0].value });
    };
  };


// sign up 

app.post('/signup', validate([
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password needs to be longer than 6 characters'),
    body('first_name').escape()
]), 
    async (req, res) => {
    const {email, password, first_name, last_name} = req.body
    const salt = bcrypt.genSaltSync(10)
    const password1 = bcrypt.hashSync(password, salt)
    
    try {
        const checkIfRegistered = await pool.query('SELECT * FROM customers WHERE email = $1', [email])
        if (checkIfRegistered.rows.length > 0){            
            return res.json({message: 'user exists'})           
        }else{
            const signUp = await pool.query(`INSERT INTO customers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [first_name, last_name, email, password1])   
            customer_id = signUp.rows[0].id         
            await dbCart.createCart(customer_id)
            const date = new Date()
            await pool.query('INSERT INTO orders (customer_id, date)  VALUES ($1, $2) RETURNING *', [customer_id, date])
            const getCartId = await pool.query(`SELECT * FROM cart cart WHERE customer_id = $1`, [signUp.rows[0].id])
            const cartId = getCartId.id           
            const token = jwt.sign({ email }, 'secret_word', { expiresIn: '1hr' })
            res.json({ email, token, first_name, cartId })//google user gets this cart id
        }        

    } catch (error) {
        console.log(error)
        if(error) {
            res.json({ detail: error.detail })
        }
    }
})

// log in

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password){
        res.json({ detail: 'Email or password wrong, please try again'})
        return
    }
    try {
        const customers = await pool.query('SELECT * FROM customers WHERE email = $1', [email])
        
        if(customers.rowCount === 0){
            return res.json({detail: 'User with given email not found'})
        }
        const customer_id  = customers.rows[0].id        
        if (await dbCart.checkIfCart(customers.rows[0]) === true){   
            console.log(`from server check if cart - cart exists` )
        }else{            
            await dbCart.createCart(customers.rows[0].id)
            const date = new Date()
            await pool.query('INSERT INTO orders (customer_id, date)  VALUES ($1, $2) RETURNING *', [customer_id, date])  
        }      

        const getCartId = await pool.query(`SELECT * FROM cart WHERE customer_id = $1`, [customer_id])
        const cartId = getCartId.rows[0].id
     
        const success = await bcrypt.compare(password, customers.rows[0].password)
        const token = jwt.sign({ email }, 'secret_word', { expiresIn: '1hr' })
        if (success){
            res.json({'email': customers.rows[0].email, token, 'first_name': customers.rows[0].first_name, 'cartId': cartId, 'customer_id': customer_id})
        } else{
            res.json({detail: 'Email or password wrong, please try again'})
        }
    } catch (error) {
        console.log(error)
        if(error) {
            res.json({ detail: error.detail })
        }
    }
})

// stripe payment 
  
  app.post("/create-checkout-session", async (req, res) => {
    try {
        const storeItemData = await pool.query('SELECT * FROM paintings')
        const storeItems = storeItemData.rows
        const cartItems = new Map(storeItems.map(object => {
            return [object.id, {name: object.name, price: object.price_in_pennies}]
        }))        
        
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {          
          const storeItem = cartItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.price,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/ordersuccess`,
        cancel_url: `${process.env.CLIENT_URL}?cancelled=true`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })


module.exports = app

