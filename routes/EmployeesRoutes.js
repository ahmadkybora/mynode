const express = require('express');
const router = express.Router();

const EmployeeController = require('app/Controllers/Panel/EmployeeController.js');

router.get('/', EmployeeController.findAll);
router.post('/', EmployeeController.create);
router.get('/:id', EmployeeController.findById);
router.patch('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;