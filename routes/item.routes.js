const express = require('express');
const router = express.Router();
const { fetchItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/item.controllers')

router.get('/', fetchItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router
