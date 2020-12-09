const express = require('express');
const router = express.Router();

const UserController = require('app/Controllers/Panel/UserController.js');

router.get('/', UserController,findAll);
router.post('/', UserController,create);
router.get('/:id', UserController,findById);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;