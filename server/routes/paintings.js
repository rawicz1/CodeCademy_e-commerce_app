const express = require('express');
const router = express.Router();
const dbPaintings = require('../db/paintings')

router.get('/', dbPaintings.getPaintings);

router.get('/categories', dbPaintings.getCategories)


/**
 * @swagger
 * /paintings/category/{category}:
 *  get:
 *    tags:
 *      - Paintings
 *    parameters: 
 *      - name: category
 *        in: path
 *        description: all paintings from a category
 *        required: true
 *    description: Returns a list of paintings
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: list of paintings
 */

router.get('/category/:category', dbPaintings.getPaintingsByCategory)


/**
 * @swagger
 * /paintings/{id}:
 *  get:
 *    tags:
 *      - Paintings
 *    parameters: 
 *      - name: id
 *        in: path
 *        description: ID of painting
 *        required: true
 *    description: Returns a single paintnig
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: a single painting 
 *      404:
 *        description: painting not found
 */
router.get('/painting/:id', dbPaintings.getPaintingById);
// router.post('/', dbPaintings.createPainting);

router.put('/painting', dbPaintings.updateInStock);


// router.delete('/painting/:id', dbPaintings.deletePainting)



module.exports = router;