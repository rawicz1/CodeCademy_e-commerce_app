const PORT = process.env.PORT || 8000

const app = require('./app')
// const express = require('express')
// const { v4: uuidv4 } = require('uuid')
// const app = express()
// const pool = require('./db')
// const cors = require ('cors')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const { validationResult, body, ValidationChain } = require('express-validator');
// const bodyParser = require('body-parser')


// require('dotenv').config();
// app.use(cors())
// app.use(express.json())
// app.use(bodyParser.json())



// app.get('/entries/:userEmail', async (req, res) => {
//     const { userEmail } = req.params 
//     try {         
//         const entries = await pool.query('SELECT * FROM entries WHERE user_email = $1 ORDER BY date DESC', [userEmail])
//         res.json(entries.rows)
//     } catch (error) {
//         console.log(error)
//     }
// })

// //create an entry 
// app.post('/entries', async (req, res) => {
//     const {user_email, title, date, content} = req.body
//     const id = uuidv4()
//     try {
//         const newEntry = await pool.query(`INSERT INTO entries (id, user_email, title, date, content) VALUES ($1, $2, $3, $4, $5)`, [id, user_email, title, date, content])
//         res.json(newEntry)
//     } catch (error) {
//         console.log(error)
//     }
// })

// app.put('/entries/:id', async (req, res) => {
//     const {title, content} = req.body
//     const { id } = req.params
//     try {
//         const updatedEntry = await pool.query(`UPDATE entries SET title = $1, content = $2 WHERE id = $3`, [title, content, id])
//         res.json(updatedEntry)
//     } catch (error) {
//         console.log(error)
//     }
// })

// app.delete('/entries/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedEntry = await pool.query(`DELETE FROM entries WHERE id = $1`, [id])
//         res.json(deletedEntry)
//     } catch (error) {
//         console.log(error)
//     }
// })

// // Sign up, validate and sanitize ---------------------------------
// const validate = validations => {
//     return async (req, res, next) => {
//       for (let validation of validations) {
//         const result = await validation.run(req);
//         if (result.errors.length) break;    
//       }  
//       const errors =  validationResult(req);

//       if (errors.isEmpty()) {
//         return next();
//       }     
      
//        res.status(400).send({ errors: errors.errors, message: errors.errors[0].value });
//     };
//   };

// //sign up
// app.post('/signup', validate([
//     body('email').isEmail().withMessage('Invalid email format'),
//     body('password').isLength({ min: 6 }).withMessage('Password neesds to be longer than 6 characters'),
//     body('first_name').escape()
// ]), 
//     async (req, res) => {
//     const {email, password, first_name} = req.body
//     const salt = bcrypt.genSaltSync(10)
//     const hashedPassword = bcrypt.hashSync(password, salt)
    
//     try {
//        const signUp = await pool.query(`INSERT INTO users (email, hashed_password, first_name) VALUES ($1, $2, $3)`,
//        [email, hashedPassword, first_name])

//        const token = jwt.sign({ email }, 'secret_word', { expiresIn: '1hr' })

//        res.json({ email, token, first_name })

//     } catch (error) {
//         console.log(error)
//         if(error) {
//             res.json({ detail: error.detail })
//         }
//     }
// })

// // log in
// app.post('/login', async (req, res) => {
//     const {email, password, first_name} = req.body
//     try {
//         const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
//         if(!users.rows.length){
//             return res.json({detail: 'User with given email not found'})
//         }
//         const success = await bcrypt.compare(password, users.rows[0].hashed_password)
//         const token = jwt.sign({ email }, 'secret_word', { expiresIn: '1hr' })
//         if (success){
//             res.json({'email': users.rows[0].email, token, 'first_name': users.rows[0].first_name})
//         } else{
//             res.json({detail: 'Email or password wrong, please try again'})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))