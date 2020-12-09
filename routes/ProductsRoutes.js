const express = require('express');
const router = express.Router();

const ProductController = require('app/Controllers/Panel/ProductController.js');

router.get('/', ProductController.findAll);
router.get('/', ProductController.create);
router.post('/:id', ProductController.findById);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;