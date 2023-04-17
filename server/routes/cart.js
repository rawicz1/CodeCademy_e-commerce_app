const express = require('express');
const router = express.Router();
const dbCart = require('../db/cart');
const dbCartItem = require('../db/cartItem')

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - id
 *         - date_created
 *         - customer_id *         
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of cart
 *         date_created:
 *           type: string
 *           description: created at
 *         customer_id:
 *           type: integer
 *           description: customer's id
 *        
 *        
 *       example:
 *         id: 8eke-dyg6-555
 *         date_created: 2023-02-12
 *         customer_id: 42
 *         
 */


router.get('/cartId', dbCart.getCartId);

/**
 * @swagger
 * /cart/{id}:
 *  get:
 *    tags:
 *      - Carts
 *    parameters: 
 *      - name: id
 *        in: path
 *        description: ID of a cart
 *        required: true
 *    description: Returns a customer's cart
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: customer's cart 
 */

router.get('/:id', dbCart.getCartById);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: The cart was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: server error
 */

router.post('/', dbCart.createCart)

router.delete('/', dbCart.deleteCart)


module.exports = router;