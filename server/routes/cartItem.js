const express = require('express');
const router = express.Router();
const dbCartItem = require('../db/cartItem');

// router.get('/', dbCartItem.getCartItems)


router.post('/:email', dbCartItem.createCartItem)

router.delete('/', dbCartItem.deleteAll)

router.delete('/:id', dbCartItem.deleteCartItem)


module.exports = router;