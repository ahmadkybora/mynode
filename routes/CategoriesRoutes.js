const express = require('express');
const router = express.Router();

const CategoryController = require('app/Controllers/Panel/CategoryController.js');

router.get('/', CategoryController.findAll);
router.post('/', CategoryController.create);
router.get('/:id', CategoryController.findById);
router.patch('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;