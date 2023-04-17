const express = require('express');
const router = express.Router();
const dbOrderItem = require('../db/orderItem');


router.post('/', dbOrderItem.createOrderItem)

router.get('/:id', dbOrderItem.getItemsByOrderId)

module.exports = router;