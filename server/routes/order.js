const express = require('express');
const router = express.Router();
const dbOrder = require('../db/order');



// router.get('/check/:email', dbOrder.checkIfOrder)
router.get('/:email', dbOrder.allOrders);
router.post('/', dbOrder.createOrder)
router.post('/new/', dbOrder.createOrder)
router.put('/', dbOrder.sendOrder)
router.put('/total', dbOrder.updateTotal)
// router.put('/', dbOrder....)

module.exports = router;