const router = require("express").Router()
const pool = require('../db')

// display paintings by selected category

const getPaintingsByCategory = async (req, res) => {

  try {
    const category = req.params.category
    const result = await pool.query('SELECT * FROM paintings WHERE category = $1', [category]) 
    console.log(result.rows)
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
  }    
}

// get all categories from paintings

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM paintings')
    res.status(200).json(result.rows)    
    } 
  catch (error) {
    console.log(error)
    }      
  }

// set in stock to 'false' after sending order

const updateInStock = async (req, res) => {
  console.log('from paintings db update in stock: ', req.body)
  const id = req.body.painting_id
  try {
    const result = await pool.query('UPDATE paintings SET in_stock = $1 WHERE paintings.id = $2', ['false', id])
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
  } 
};
 
// display all paintings which are in stock

const getPaintings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM paintings WHERE paintings.in_stock = $1 ORDER BY id ASC', ['true'])
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
  }
};


const getPaintingById = (request, response) => {
  
    const id = parseInt(request.params.id)  
    pool.query('SELECT * FROM paintings WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      
      response.status(200).json(results.rows)
    })
  }
  
  // const createPainting = (request, response) => {
  //   const { name, category } = request.body
  
  //   pool.query('INSERT INTO paintings (name, category) VALUES ($1, $2)', [name, category], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`Painting added with ID: ${results.insertId}`)
  //   })
  // };
  
  // const updatePainting = (request, response) => {
  //   const id = parseInt(request.params.id)
  //   const { name, category } = request.body
  //   console.log(request.body, id)
  //   // response.send('test response')
  //   pool.query('UPDATE paintings SET name = $1, category = $2 WHERE id = $3',[name, category, id],

  //     (error, results) => {
  //       if (error) {
  //         throw error
  //       }
  //       response.status(200).send(`Painting modified with ID: ${id}`)
  //     }
  //   )
  // }
  
  // const deletePainting = (request, response) => {
  //   const id = parseInt(request.params.id)
  
  //   pool.query('DELETE FROM paintings WHERE id = $1', [id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).send(`Deleted painting with ID: ${id}`)
  //   })
  // }


module.exports = {
    getPaintings,
    getCategories,
    getPaintingsByCategory,
    getPaintingById,
    // createPainting,
    // updatePainting,
    // deletePainting,
    updateInStock
};



